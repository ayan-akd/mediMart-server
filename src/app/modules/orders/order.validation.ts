import { z } from 'zod';

export const orderValidationSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User ID is required',
      invalid_type_error: 'user must be a valid mongoose id',
    }),

    medicines: z.array(
      z.object({
        medicine: z.string({
          required_error: 'Medicine ID is required',
          invalid_type_error: 'Medicine ID must be a valid mongoose id',
        }),
        quantity: z.number({
          required_error: 'Quantity is required',
          invalid_type_error: 'Quantity must be a number',
        }).positive('Quantity must be a positive number'),
      })
    ),

    totalPrice: z
      .number({
        required_error: 'Total Price is required',
        invalid_type_error: 'Total Price must be a positive number',
      })
      .positive('Total Price must be a positive number'),

    address: z.string({
      required_error: 'Address is required',
      invalid_type_error: 'Address must be a string',
    }),
    city: z.string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    }),
  }),
});

export const orderStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([
      'Pending',
      'Paid',
      'Failed',
      'Processing',
      'Shipped',
      'Cancelled',
      'Delivered',
    ]),
  }),
});
