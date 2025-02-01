import { PatientAdhdDiagnosis } from '@mono-repo/api-clients/patient-api';

const diagnosisColors: Record<PatientAdhdDiagnosis, string> = {
  [PatientAdhdDiagnosis.Mild]: '#7AC74F', // Soft Green
  [PatientAdhdDiagnosis.Moderate]: '#F4C430', // Warm Yellow
  [PatientAdhdDiagnosis.Severe]: '#D32F2F', // Alert Red
};

export const getDiagnosisColor = (diagnosis: string): string => {
  const matchedDiagnosis = PatientAdhdDiagnosis[diagnosis as keyof typeof PatientAdhdDiagnosis];
  return matchedDiagnosis ? diagnosisColors[matchedDiagnosis] : '#ffff';
};
