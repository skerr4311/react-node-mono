import { z } from 'zod';

export const PatientSchema = z.object({
  id: z.string().optional(),
  fullName: z.string({ required_error: 'Patient name is required' }),
  dateOfBirth: z.date(),
  contactInfo: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
    phone: z.string({ required_error: 'Phone is required' }).min(5, 'Phone number is required'),
  }),
  adhdDiagnosis: z.enum(['Mild', 'Moderate', 'Severe'], {
    errorMap: () => ({ message: 'Select a valid diagnosis' }),
  }),
  additionalNotes: z.string().optional().nullable(),
});

export type PatientInput = z.infer<typeof PatientSchema>;
