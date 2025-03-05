import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    orderId: {
      type: String,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    medicines: [
      {
        medicine: {
          type: Schema.Types.ObjectId,
          ref: 'Medicines',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    prescription: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Failed', 'Paid', 'Processing', 'Shipped', 'Cancelled', 'Delivered'],
      default: 'Pending',
    },
    transaction: {
      paymentId: {
        type: String,
      },
      transactionStatus: {
        type: String,
      },
      bank_status: {
        type: String,
      },
      sp_code: {
        type: String,
      },
      sp_message: {
        type: String,
      },
      method: {
        type: String,
      },
      date_time: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<TOrder>('Order', orderSchema);
