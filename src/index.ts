import express, { Request, Response } from 'express';
import helmet from 'helmet';

import rateLimiterRedis from './middleware/rateLimiterRedis';
import loginRouter from './routes/login';

import { initializeDb, initializeUser } from './initializers';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(rateLimiterRedis);
app.use(express.json())

app.use('/api', loginRouter)

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World')
})

app.listen(PORT, async () => {
  console.log("listening to http://localhost:3000")
  await initializeDb()
  await initializeUser()
})
