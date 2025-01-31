export const QueryKeys = {
  // Patients query keys
  patients: () => ['patients'] as const,
  patient: (id: string) => ['patient', id] as const,
};
