import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';
import { generateOrderId } from '../../utils/generateID';
import { UserModel } from '../user/user.model';
import { orderUtils } from './order.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import MedicineModel from '../medicine/medicine.model';
import mongoose from 'mongoose';

const createOrderIntoDB = async (order: TOrder, client_ip: string) => {
  try {
    // generate order id
    order.orderId = await generateOrderId();

    const newOrder = await OrderModel.create(order);

    if (!newOrder) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
    }

    const user = await UserModel.findById(order.user);

    const shurjopayPayload = {
      amount: order.totalPrice,
      order_id: order.orderId,
      currency: 'BDT',
      customer_name: user?.name,
      customer_address: order.address,
      customer_email: user?.email,
      customer_phone: 'N/A',
      customer_city: order.city,
      client_ip,
    };

    const payment = await orderUtils.makePayment(shurjopayPayload);

    let updatedOrder: TOrder | null = null;

    if (payment?.transactionStatus) {
      updatedOrder = await OrderModel.findOneAndUpdate(
        { orderId: order.orderId },
        {
          $set: {
            transaction: {
              paymentId: payment.sp_order_id,
              transactionStatus: payment.transactionStatus,
            },
          },
        },
        { new: true },
      );
    }

    if (!updatedOrder) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update order');
    }

    return {
      order: updatedOrder,
      payment,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error(err);
  }
};

const verifyPayment = async (paymentId: string) => {
  const payment = await orderUtils.verifyPayment(paymentId);

  if (!payment || !payment.length) {
    throw new Error("Invalid payment response or empty payment array");
  }

  await OrderModel.findOneAndUpdate(
    {
      'transaction.paymentId': paymentId,
    },
    {
      'transaction.bank_status': payment[0].bank_status,
      'transaction.sp_code': payment[0].sp_code,
      'transaction.sp_message': payment[0].sp_message,
      'transaction.method': payment[0].method,
      'transaction.date_time': payment[0].date_time,
      'transaction.transactionStatus': payment[0].transaction_status,
      status:
        payment[0].bank_status === 'Success'
          ? 'Paid'
          : payment[0].bank_status === 'Failed'
          ? 'Failed'
          : payment[0].bank_status === 'Cancel'
          ? 'Cancelled'
          : '',
    }
  );

  if (payment[0].bank_status === 'Success') {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Ensure order exists
      const orderExists = await OrderModel.findOne({
        'transaction.paymentId': paymentId,
      });

      if (!orderExists) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          'Order was not placed correctly'
        );
      }

      // Update order status (first transaction)
      const updatedOrder = await OrderModel.findOneAndUpdate(
        { 'transaction.paymentId': paymentId },
        { $set: { status: 'Paid' } },
        { new: true, session }
      );

      if (!updatedOrder) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update order');
      }

      // Update medicine quantity (second transaction) and handle errors properly
      await Promise.all(
        updatedOrder.medicines.map(async (medicine) => {
          const medicineData = await MedicineModel.findById(medicine.medicine);
          if (!medicineData) {
            throw new AppError(httpStatus.NOT_FOUND, 'Medicine not found');
          }

          const remainingQuantity = medicineData.quantity - medicine.quantity;
          const result = await MedicineModel.findOneAndUpdate(
            { _id: medicine.medicine },
            {
              quantity: remainingQuantity,
              inStock: remainingQuantity > 0,
            },
            { new: true, session }
          );

          if (!result) {
            throw new AppError(
              httpStatus.BAD_REQUEST,
              'Failed to update medicine'
            );
          }
        })
      );

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err; // Re-throw for proper error handling
    } finally {
      await session.endSession();
    }
  }

  return payment;
};


const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(OrderModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await orderQuery.modelQuery.populate('user').populate('medicines.medicine');
  const meta = await orderQuery.countTotal();
  return {
    data,
    meta,
  };
};

const getMyOrdersFromDB = async (userId: string) => {
  const result = await OrderModel.find({ user: userId })
    .populate('user')
    .populate('medicines.medicine');
  return result;
};
const changeOrderStatus = async (id: string, payload: { status: string }) => {
  const orderExists = await OrderModel.findById(id);
  if (!orderExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
  }

  if (orderExists.status === 'Delivered' || orderExists.status == 'Shipped') {
    if (payload.status === 'Pending' || payload.status === 'Cancelled') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Order already ${orderExists.status}`,
      );
    }
  }

  if (orderExists.status === 'Shipped') {
    if (payload.status !== 'Delivered') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Order already ${orderExists.status}`,
      );
    }
  }

  if (orderExists.status === 'Delivered') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Order already ${orderExists.status}`,
    );
  }

  const result = await OrderModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getMyOrdersFromDB,
  changeOrderStatus,
  verifyPayment,
};
