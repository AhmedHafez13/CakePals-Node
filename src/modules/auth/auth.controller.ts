import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserProvider from '../../modules/user/user.provider';
import { jwtSettings } from '../../settings/jwt.settings';
import AuthValidation from './auth.validation';

class AuthController {
  async signup(req: Request, res: Response) {
    const { username, email, password } = req.body;

    // Validate the incoming data
    const { error } = AuthValidation.validateSignupInput({
      username,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if email is already in use
    const existingUser = await UserProvider.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use' });
    }

    try {
      // Create a new user
      const user = await UserProvider.createUser(username, email, password);

      // Generate a token and return it with the user
      const token = jwt.sign({ id: user._id }, jwtSettings.secretKey, {
        expiresIn: jwtSettings.authTokenExpireTime,
      });

      return res.json({ user, token });
    } catch (error) {
      return res.status(400).json({
        message: 'Error while creating account, review your inputs',
        error: String(error), // [TODO] DO NOT RETURN TO USER, LOG ERROR
      });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // Validate the incoming data
    const { error } = AuthValidation.validateLoginInput({ email, password });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await UserProvider.findByEmail(email);

    if (user && (await user.comparePassword(password))) {
      const token = jwt.sign({ id: user._id }, jwtSettings.secretKey, {
        expiresIn: jwtSettings.authTokenExpireTime,
      });
      return res.json({ user, token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
  }
}

export default AuthController;
