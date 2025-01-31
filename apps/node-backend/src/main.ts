import express, { Application, Request, Response } from 'express';
import knex, { Knex } from 'knex';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

console.log('Loaded PORT:', process.env.PORT);

const db: Knex = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'testdb',
  },
});

// Ensure database and table exist
async function initializeDatabase() {
  try {
    const exists = await db.schema.hasTable('patients');
    if (!exists) {
      await db.schema.createTable('patients', (table) => {
        table.uuid('id').primary();
        table.string('full_name').notNullable();
        table.date('date_of_birth').notNullable();
        table.jsonb('contact_info').notNullable();
        table.string('diagnosis_status').notNullable();
        table.text('additional_notes');
        table.timestamps(true, true);
      });
      console.log('Table "patients" created successfully.');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initializeDatabase();

const app: Application = express();
app.use(express.json());
app.use(cors());

// Create a new patient
app.post('/patients', async (req: Request, res: Response) => {
  try {
    const { fullName, dateOfBirth, contact, diagnosisStatus, notes } = req.body;
    const id = uuidv4();

    await db('patients').insert({
      id,
      full_name: fullName,
      date_of_birth: dateOfBirth,
      contact_info: JSON.stringify(contact),
      diagnosis_status: diagnosisStatus,
      additional_notes: notes,
    });

    res.status(201).json({ id, message: 'Patient created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating patient' });
  }
});

// Get all patients
app.get('/patients', async (req: Request, res: Response) => {
  try {
    const patients = await db('patients').select('*');
    res.json(
      patients.map((patient) => ({
        id: patient.id,
        fullName: patient.full_name,
        dateOfBirth: patient.date_of_birth,
        contact: JSON.parse(patient.contact_info),
        diagnosisStatus: patient.diagnosis_status,
        notes: patient.additional_notes,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patients' });
  }
});

app.get('/test/:id', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    res.send(`Patient ID: ${req.params.id}`);
  } catch (error) {
    res.status(500).send('Something went wrong');
  }
});

// Get a single patient by ID
app.get('/patients/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await db('patients').where({ id }).first();

    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patient' });
  }
});

// Update a patient
app.put('/patients/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { fullName, dateOfBirth, contact, diagnosisStatus, notes } = req.body;
    const { id } = req.params;

    const updated = await db('patients')
      .where({ id })
      .update({
        full_name: fullName,
        date_of_birth: dateOfBirth,
        contact_info: JSON.stringify(contact),
        diagnosis_status: diagnosisStatus,
        additional_notes: notes,
      });

    if (!updated) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    res.json({ message: 'Patient updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating patient' });
  }
});

// Delete a patient
app.delete('/patients/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await db('patients').where({ id }).del();
    if (!deleted) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting patient' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
