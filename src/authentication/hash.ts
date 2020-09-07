import bcrypt from 'bcrypt';

const saltRounds = 10;

export interface IHashedPassword {
  hash: string
  salt: string
}

export function generateHash(value: string, salt?: string): Promise<IHashedPassword> {
  return new Promise((resolve, reject) => {
    if (salt) bcrypt.hash(value, salt, (err, hash) => {
      if (err) reject(err)
      else resolve({ hash, salt })
    })
    else bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(value, salt, function (err, hash) {
        if (err) reject(err);
        resolve({ hash, salt })
      });
    });
  })
}