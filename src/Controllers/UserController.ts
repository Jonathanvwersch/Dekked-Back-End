import express from "express";
import {
  getUserByEmail,
  getUserByResetPasswordToken,
} from "../Persistance/UserModel";
import { createUser, genToken, login } from "../Services/AuthService";
import UserService, { sendEmail } from "../Services/UserService";
import { getUserIdFromRequest } from "../utils/passport/authHelpers";
import { OAuth2Client } from "google-auth-library";
import { genSaltSync, hashSync } from "bcryptjs";

import { config } from "../config";
import jwt from "jsonwebtoken";

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

  public async verifyUserEmail(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { email_address } = req.body;

    try {
      const user = await getUserByEmail(email_address);

      return res.status(200).json({
        success: Boolean(user),
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async forgetPassword(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { email_address } = req.body;

    try {
      const user = await getUserByEmail(email_address);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User does not exist" });
      } else {
        // otherwise we need to create a temporary token that expires in 10 mins
        const resetPasswordToken = jwt.sign(
          { user: user.email_address },
          "reset secret",
          {
            expiresIn: "10m",
          }
        );
        // update resetLink property to be the temporary token and then send email
        await UserService.updateUserAsync({
          id: user.id,
          reset_password_token: resetPasswordToken,
        });
        sendEmail(user, resetPasswordToken);
        return res
          .status(200)
          .json({ success: true, message: "Reset email sent" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  public async resetPassword(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { password, token }: { password: string; token: string } = req.body;

    // // if there is a token we need to decode it and check that there are no errors
    // if (token) {
    //   jwt.verify(token, "check for errors", (error) => {
    //     if (error) {
    //       return res.status(400).json({
    //         message: "Incorrect token or expired",
    //       });
    //     }
    //   });
    // }

    try {
      // find user by the temporary token we stored earlier
      const user = await getUserByResetPasswordToken(token);

      // if there is no user, send back an error
      if (!user) {
        return res
          .status(404)
          .json({ message: "No user exists with that resetPasswordToken" });
      }

      // otherwise we need to hash the new password  before saving it in the database
      const salt = genSaltSync();
      const hashedPassword = hashSync(password, salt);

      // update user credentials and remove the temporary link from database before saving
      const updatedCredentials = {
        password: hashedPassword,
        resetPasswordToken: undefined,
        id: user.id,
      };

      await UserService.updateUserAsync({
        ...updatedCredentials,
      });
      return res.status(200).json({ message: "Password updated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
