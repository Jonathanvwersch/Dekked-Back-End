import express from "express";
import { getUserByEmail } from "../Persistance/UserModel";
import { createUser, genToken, login } from "../Services/AuthService";
import UserService from "../Services/UserService";
import { getUserIdFromRequest } from "../utils/passport/authHelpers";
import { OAuth2Client } from "google-auth-library";
import { config } from "../config";

const { GOOGLE_CLIENT_ID } = config;

const googleOAuth = new OAuth2Client(GOOGLE_CLIENT_ID);
export class UserController {
  public async register(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { first_name, last_name, password, email_address } = req.body;

    try {
      const response: any = await createUser(
        first_name,
        last_name,
        email_address,
        password
      );
      if (response.success) {
        return res.status(200).json(response?.data);
      } else {
        return res.status(response.code).json({
          success: false,
          message: response.message,
        });
      }
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async login(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { password, email_address } = req.body;

    try {
      const response: any = await login(email_address, password);
      if (response.success) {
        return res.status(200).json(response?.data);
      } else {
        return res.status(response.code).json({
          success: false,
          message: response.message,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async googleAuthentication(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { token, first_name, last_name, email_address } = req.body;

    try {
      const response: any = await googleOAuth.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID,
      });
      const { email_verified } = response.payload;
      if (email_verified) {
        const user = await getUserByEmail(email_address);
        // if user already exists, generate a token and send that back to client
        if (user?.id) {
          const token = genToken(user);
          return res.status(200).json({
            token,
            first_name,
            last_name,
            email_address,
            id: user.id,
          });
        }
        // if user does not exist, we need to create an entry in database for new user
        else {
          try {
            const response: any = await createUser(
              first_name,
              last_name,
              email_address
            );
            if (response.success) {
              return res.status(200).json(response?.data);
            } else {
              return res.status(response.code).json({
                success: false,
                message: response.message,
              });
            }
          } catch (e) {
            console.log(e.message);
            return res.status(500).json({ success: false, error: e.message });
          }
        }
      } else {
        console.log(res);
        return res.status(response.code).json({
          success: false,
          message: response.message,
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getUser(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    try {
      const user = await UserService.getUserByIdAsync(userId);
      return res.status(200).json({
        ...user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async updateUser(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { last_name, first_name, email_address, password } = req.body;

    try {
      await UserService.updateUserAsync({
        id: userId,
        last_name,
        first_name,
        email_address,
        password,
      });
      return res.status(200).json({
        success: true,
        first_name,
        last_name,
        email_address,
        userId,
        password,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }
}
