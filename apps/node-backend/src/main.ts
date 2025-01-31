import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './api/patients/routes';
import initializeDatabase from './util/db';

dotenv.config();

// Initialize database
initializeDatabase();

const app: Application = express();
app.use(express.json());
app.use(cors());

// Register routes
app.use('/patients', patientRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
