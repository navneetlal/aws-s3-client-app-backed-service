import { postgresQuery } from '../dbContext/postgres';


export async function initializeDb() {
  const query = `
  CREATE TABLE IF NOT EXISTS Users (
      email varchar UNIQUE,
      password varchar,
      salt varchar,
      firstName varchar,
      lastName varchar,
      age int
  );
  `
  await postgresQuery(query)
    .then(() => console.log(`Table 'Users' created!`))
    .catch(err => console.error('Error occurred while creating table: ', err.message));
}