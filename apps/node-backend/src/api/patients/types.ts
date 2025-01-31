import { z } from 'zod';

export const PatientInputSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  contactInfo: z.object({
    email: z.string().email('Invalid email'),
    phone: z.string().min(1, 'Phone number is required'),
  }),
  adhdDiagnosis: z.string().min(1, 'Diagnosis is required'),
});

export type PatientInput = z.infer<typeof PatientInputSchema>;
