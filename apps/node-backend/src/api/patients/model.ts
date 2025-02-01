import db from '../../util/db';
import { PatientInput } from './types';

export const getPatientById = (id: string) => db('patients').where({ id }).first();

export const getAllPatients = (): Promise<unknown[]> => db('patients').select('*');

export const createPatient = (patientData: PatientInput) =>
  db('patients').insert({ ...patientData, contactInfo: JSON.stringify(patientData.contactInfo) });

export const updatePatient = (id: string, patientData: PatientInput) =>
  db('patients')
    .where({ id })
    .update({ ...patientData, contactInfo: JSON.stringify(patientData.contactInfo) });

export const deletePatient = (id: string) => db('patients').where({ id }).del();
