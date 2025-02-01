import db from '../../util/db';
import { toSnakeCase } from './helpers';

export const getPatientById = (id: string): Promise<Record<string, string>> => db('patients').where({ id }).first();

export const getAllPatients = (): Promise<Record<string, string>[]> =>
  db('patients').select('*').orderBy('created_at', 'desc');

export const createPatient = (patientData: Record<string, string>) => db('patients').insert(toSnakeCase(patientData));

export const updatePatient = (id: string, patientData: Record<string, string>) =>
  db('patients').where({ id }).update(toSnakeCase(patientData));

export const deletePatient = (id: string) => db('patients').where({ id }).del();
