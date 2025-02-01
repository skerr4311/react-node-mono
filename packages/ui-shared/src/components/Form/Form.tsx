import { FC } from 'react';
import { TextField, Button, MenuItem, Grid, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form as FormikForm } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import dayjs from 'dayjs';
import { PatientInput, PatientSchema } from './types';
import { FormWrapper } from './styles';

type Action = 'update' | 'delete' | 'new' | 'clear';

interface FormProps {
  patient: PatientInput;
  onSubmit: (action: Action, values: PatientInput, resetForm: () => void) => void;
}

export const Form: FC<FormProps> = ({ patient, onSubmit }) => {
  return (
    <Formik
      initialValues={{ ...patient, action: patient.id ? 'update' : 'new' }}
      enableReinitialize
      validationSchema={toFormikValidationSchema(PatientSchema)}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values.action as Action, values, resetForm);
      }}
    >
      {({ values, errors, touched, handleChange, setFieldValue, resetForm }) => (
        <FormikForm>
          <FormWrapper>
            <Grid container spacing={2} maxWidth={600} padding={3} boxShadow={3} borderRadius={2} bgcolor="white">
              <Grid item xs={12}>
                <Typography align="center" variant="h4">
                  {`${patient.id ? 'Existing ' : ''}Patient Form`}
                </Typography>
              </Grid>
              {/* Full Name */}
              <Grid item xs={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  value={values.fullName}
                  onChange={handleChange}
                  error={touched.fullName && !!errors.fullName}
                  helperText={touched.fullName && errors.fullName}
                  fullWidth
                />
              </Grid>

              {/* Date of Birth */}
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-GB">
                  <DatePicker
                    label="Date of Birth"
                    value={dayjs(values.dateOfBirth)}
                    onChange={(date) => setFieldValue('dateOfBirth', date?.toDate() || new Date())}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: touched.dateOfBirth && !!errors.dateOfBirth,
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Email */}
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  name="contactInfo.email"
                  value={values.contactInfo.email}
                  onChange={handleChange}
                  error={touched.contactInfo?.email && !!errors.contactInfo?.email}
                  helperText={touched.contactInfo?.email && errors.contactInfo?.email}
                  fullWidth
                />
              </Grid>

              {/* Phone */}
              <Grid item xs={6}>
                <TextField
                  label="Phone"
                  name="contactInfo.phone"
                  value={values.contactInfo.phone}
                  onChange={handleChange}
                  error={touched.contactInfo?.phone && !!errors.contactInfo?.phone}
                  helperText={touched.contactInfo?.phone && errors.contactInfo?.phone}
                  fullWidth
                />
              </Grid>

              {/* ADHD Diagnosis Dropdown */}
              <Grid item xs={6}>
                <TextField
                  select
                  label="ADHD Diagnosis"
                  name="adhdDiagnosis"
                  value={values.adhdDiagnosis}
                  onChange={handleChange}
                  error={touched.adhdDiagnosis && !!errors.adhdDiagnosis}
                  helperText={touched.adhdDiagnosis && errors.adhdDiagnosis}
                  fullWidth
                >
                  {['Mild', 'Moderate', 'Severe'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Additional Notes (Full Width) */}
              <Grid item xs={12}>
                <TextField
                  label="Additional Notes"
                  name="additionalNotes"
                  value={values.additionalNotes}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                />
              </Grid>

              {/* Hidden Action Field */}
              <input type="hidden" name="action" />

              {/* Submit Button (Centered) */}
              {!patient.id ? (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => setFieldValue('action', 'new')}
                  >
                    Add New Patient
                  </Button>
                </Grid>
              ) : (
                <>
                  <Grid item xs={4} display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="error"
                      sx={{ width: '100%' }}
                      onClick={() => setFieldValue('action', 'delete')}
                    >
                      Delete Patient
                    </Button>
                  </Grid>
                  <Grid item xs={4} display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="info"
                      sx={{ width: '100%' }}
                      onClick={() => setFieldValue('action', 'update')}
                    >
                      Update Patient
                    </Button>
                  </Grid>
                  <Grid item xs={4} display="flex" justifyContent="center">
                    <Button
                      type="submit"
                      variant="contained"
                      color="warning"
                      sx={{ width: '100%' }}
                      onClick={() => setFieldValue('action', 'clear')}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </FormWrapper>
        </FormikForm>
      )}
    </Formik>
  );
};
