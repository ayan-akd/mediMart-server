import { Model } from "mongoose";

export type TMedicine = {
  name: string;
  description: string;
  details: string;
  price: number;
  quantity: number;
  inStock?: boolean;
  image: string;
  prescriptionRequired?: boolean;
  expiryDate?: Date;
  isDeleted?: boolean;
};

export interface IMedicine extends Model<TMedicine> {
  // eslint-disable-next-line no-unused-vars
  isMedicineExists(id: string): Promise<TMedicine>;
}