import { Schema, model } from "mongoose";
import { IMedicine, TMedicine } from "./medicine.interface";
import { medicineCategories } from "./medicine.constant";

const medicineSchema = new Schema<TMedicine, IMedicine>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },
    image: { type: String, required: true },
    prescriptionRequired: { type: Boolean, required: true },
    expiryDate: { type: Date, required: true },
    isDeleted: { type: Boolean, required: true, default: false },
    category: { type: String, required: true, enum: medicineCategories },
  },
  {
    timestamps: true,
  }
);

medicineSchema.statics.isMedicineExists = async function (id: string): Promise<TMedicine | null> {
  return await MedicineModel.findOne({ _id: id });
};

const MedicineModel = model<TMedicine, IMedicine>("Medicines", medicineSchema);

export default MedicineModel;