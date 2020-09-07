import { Pool } from 'pg';

const pool = new Pool({
  user: 'navneet',
  password: 'example',
  database: 's3client'
});

export function postgresQuery(queryText: string, values?: string[]) {
  return pool.query(queryText, values);
}