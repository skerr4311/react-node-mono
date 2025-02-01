import knex, { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db: Knex = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'postgresdb',
  },
});

export const initializeDatabase = async () => {
  try {
    const exists = await db.schema.hasTable('patients');
    if (!exists) {
      await db.schema.createTable('patients', (table) => {
        table.uuid('id').primary();
        table.string('full_name').notNullable();
        table.date('date_of_birth').notNullable();
        table.jsonb('contact_info').notNullable();
        table.string('adhd_diagnosis').notNullable();
        table.text('additional_notes'); // ✅ Use snake_case
        table.timestamps(true, true);
      });
      // eslint-disable-next-line no-console
      console.log('Table "patients" created successfully.');
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default db;
