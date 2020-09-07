import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import '../middleware/auth';

const router = express.Router();

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occurred')
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error)
        const claims = {
          email: user.email
        }
        const token = jwt.sign(claims, 'ThatsWhatSheSaid');
        return res.json({ token })
      })
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
})

export default router;