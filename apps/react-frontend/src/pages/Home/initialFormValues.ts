import { Patient } from '@mono-repo/api-clients/patient-api';

export const initialValues: Patient = {
  id: '',
  fullName: '',
  dateOfBirth: new Date(),
  contactInfo: {
    email: '',
    phone: '',
  },
  adhdDiagnosis: '',
  additionalNotes: '',
};
