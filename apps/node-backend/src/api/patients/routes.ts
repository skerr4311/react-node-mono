import express, { Request, Response, Router } from 'express';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from './model';
import { mockPatients } from '../../mocks';

const router: Router = express.Router();

// Get all patients
router.get('/', async (req: Request, res: Response) => {
  try {
    const patients = await getAllPatients();
    if (!patients.length) {
      res.send(mockPatients);
      return;
    }
    res.send(patients);
  } catch (error) {
    res.status(500).send('Error fetching patients');
  }
});

// Get a single patient
router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await getPatientById(id);

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
    const newPatient = await createPatient(req.body);
    res.status(201).send({ id: newPatient, message: 'Patient created successfully' });
  } catch (error) {
    res.status(500).send('Error creating patient');
  }
});

// Update a patient
router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await updatePatient(id, req.body);

    if (!updated) {
      res.status(404).send('Patient not found');
      return;
    }
    res.send('Patient updated successfully');
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
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Error deleting patient');
  }
});

export default router;
