import { Model } from "mongoose";
import { medicineCategories } from "./medicine.constant";

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
  category: typeof medicineCategories[number];
};

export interface IMedicine extends Model<TMedicine> {
  // eslint-disable-next-line no-unused-vars
  isMedicineExists(id: string): Promise<TMedicine>;
}