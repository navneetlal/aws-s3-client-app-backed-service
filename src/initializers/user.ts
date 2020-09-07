import { generateHash } from '../authentication/hash';
import { postgresQuery } from '../dbContext/postgres';

export async function initializeUser() {
  const email: string = process.env.EMAIL || "admin@example.com";
  const password: string = process.env.PASSWORD || "Y0urP4$$w0rD";
  const hashedPassword = await generateHash(password)
  const query = `
  INSERT INTO Users (email, password, salt) 
  VALUES ('${email}','${hashedPassword.hash}','${hashedPassword.salt}')
  ON CONFLICT (email) DO UPDATE SET password = '${hashedPassword.hash}', salt = '${hashedPassword.salt}';
  `;
  postgresQuery(query)
    .then(() => console.log(`User '${email}' registered into the system!`))
    .catch(err => console.log('Error occurred while registering user: ', err.message))
}