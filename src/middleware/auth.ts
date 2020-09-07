import passport from 'passport';
import passportJwt, { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';

import { generateHash } from '../authentication/hash';
import { postgresQuery } from '../dbContext/postgres';

passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const hashedPassword = await generateHash(password);
    const query = `
      INSERT INTO Users (email, password, salt)
      VALUES (?,?,?)
      `;
    const result = await postgresQuery(query, [email, hashedPassword.hash, hashedPassword.salt]);
    return done(null, result.rows[0]);
  } catch (error) {
    done(error);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email: string, password: string, done: (err: Error | null, user?: any, message?: { message: string }) => void) => {
  try {
    const query = `
    SELECT *
    FROM Users
    WHERE email='${email}'
    `
    const result = await postgresQuery(query);
    const user = result.rows[0];
    if (!user) {
      return done(null, false, { message: 'User not found' });
    }
    const hashedPassword = await generateHash(password, user.salt)
    const validate = hashedPassword.hash === user.password;
    if (!validate) {
      return done(null, false, { message: 'Wrong Password' });
    }
    return done(null, user, { message: 'Logged in Successfully' });
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  secretOrKey: 'ThatsWhatSheSaid',
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt')
}, async (token, done) => {
  try {
    return done(null, token.email);
  } catch (error) {
    done(error);
  }
}));