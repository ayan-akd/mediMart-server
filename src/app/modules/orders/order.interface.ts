import { Types } from 'mongoose';

export type TOrder = {
  orderId: string;
  user: Types.ObjectId;
  medicines: {medicine:Types.ObjectId,quantity:number,}[];
  totalPrice: number;
  city: string;
  address: string;
  status?: 'Pending' | 'Processing' | 'Shipped' | 'Cancelled' | 'Delivered';
  transaction?: {
    paymentId?: string;
    transactionStatus?: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  }
};
