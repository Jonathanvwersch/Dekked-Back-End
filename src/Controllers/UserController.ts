import express from 'express';
import passport from 'passport';
import { createUser, login } from '../Services/AuthService';
import UserService from '../Services/UserService';
import { getUserIdFromRequest } from '../utils/passport/authHelpers';

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

  public async getUser(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    console.log(userId);
    try {
      const user = await UserService.getUserByIdAsync(userId);
      return res.status(200).json({
        success: true,
        data: {
          user
        }
      });
    } catch (error) {
      console.log(error);
      console.log(userId);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async editUser(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const userId = getUserIdFromRequest(req);
      const { last_name, first_name, email_address } = req.body;
      await UserService.updateUserAsync({
        id: userId,
        last_name,
        first_name,
        email_address
      });
      return res.status(200).json({
        success: true,
        first_name,
        last_name,
        email_address,
        userId
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
