import express from 'express';
import passport from 'passport';
import { createUser, login } from '../Services/AuthService';

export class UserController {
  public async register(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const { first_name, last_name, password, email_address } = req.body;

      const response: any = await createUser(first_name, last_name, email_address, password);
      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(response.code).json({
          success: false,
          message: response.message
        });
      }
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async login(req: express.Request, res: express.Response): Promise<express.Response<any>> {
    try {
      const { password, email_address } = req.body;

      const response: any = await login(email_address, password);
      if (response.success) {
        return res.status(200).json(response);
      } else {
        return res.status(response.code).json({
          success: false,
          message: response.message
        });
      }
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
