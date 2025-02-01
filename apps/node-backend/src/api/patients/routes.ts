import express, { Request, Response, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from './model';
import { toCamelCase } from './helpers';

const router: Router = express.Router();

// Get all patients
router.get('/', async (req: Request, res: Response) => {
  try {
    const patients = (await getAllPatients()).map((patient) => toCamelCase(patient));
    res.send(patients);
  } catch (error) {
    res.status(500).send('Error fetching patients');
  }
});

// Get a single patient
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const patient = toCamelCase(await getPatientById(id));

    if (!patient) {
      res.status(404).send('Patient not found');
      return;
    }

    res.send(patient);
  } catch (error) {
    res.status(500).send('Error fetching patient');
  }
});

// Create a new patient
router.post('/', async (req: Request, res: Response) => {
  try {
    const patientId = uuidv4();
    const patientDetails = req.body as Record<string, string>;

    const newPatient = {
      id: patientId,
      ...patientDetails,
    };

    await createPatient(newPatient);
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// Update a patient
router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const patientDetails = req.body as Record<string, string>;
    const updated = await updatePatient(id, patientDetails);

    if (!updated) {
      res.status(404).send('Patient not found');
      return;
    }
    res.status(201).json({ id, ...patientDetails });
  } catch (error) {
    res.status(500).send('Error updating patient');
  }
});

// Delete a patient
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deletePatient(id);
    if (!deleted) {
      res.status(404).send('Patient not found');
      return;
    }
    res.status(204).send('Patient deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting patient');
  }
});

export default router;
