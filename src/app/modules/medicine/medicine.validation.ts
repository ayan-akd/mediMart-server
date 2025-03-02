import { z } from "zod";

const createMedicineValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    description: z.string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    }),
    details: z.string({
      required_error: "Details is required",
      invalid_type_error: "Details must be a string",
    }),
    price: z.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    }),
    quantity: z.number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    }),
    image: z.string({
      required_error: "Image is required",
      invalid_type_error: "Image must be a string",
    }),
    prescriptionRequired: z.boolean({
      required_error: "Prescription Required is required",
      invalid_type_error: "Prescription Required must be a boolean",
    }),
    expiryDate: z.date({
      required_error: "Expiry Date is required",
      invalid_type_error: "Expiry Date must be a date",
    })
  }),
});

const updateMedicineValidation = createMedicineValidation.partial();

export const MedicineValidation = {
  createMedicineValidation,
  updateMedicineValidation,
};