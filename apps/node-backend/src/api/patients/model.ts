import db from '../../util/db';
import { PatientInput } from './types';

export async function getPatientById(id: string) {
  return await db('patients').where({ id }).first();
}

export async function getAllPatients() {
  return await db('patients').select('*');
}

export async function createPatient(patientData: PatientInput) {
  return await db('patients').insert({ ...patientData, contactInfo: JSON.stringify(patientData.contactInfo) });
}

export async function updatePatient(id: string, patientData: PatientInput) {
  return await db('patients')
    .where({ id })
    .update({ ...patientData, contactInfo: JSON.stringify(patientData.contactInfo) });
}

export async function deletePatient(id: string) {
  return await db('patients').where({ id }).del();
}
