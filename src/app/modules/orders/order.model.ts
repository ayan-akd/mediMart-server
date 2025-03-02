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
    medicine: {
      type: Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Pending',
        'Processing',
        'Shipped',
        'Cancelled',
        'Delivered',
      ],
      default: 'pending',
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
