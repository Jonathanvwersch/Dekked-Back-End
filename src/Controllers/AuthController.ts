import express, { NextFunction } from "express";
import {
  getUserByEmail,
  getUserByResetPasswordToken,
} from "../Persistance/UserModel";
import { createUser, genToken, login } from "../Services/AuthService";
import UserService, { sendEmail } from "../Services/UserService";
import { OAuth2Client } from "google-auth-library";
import { genSaltSync, hashSync } from "bcryptjs";
import { ErrorHandler, missingParams } from "../utils";

import { config } from "../config";
import jwt from "jsonwebtoken";

const { GOOGLE_CLIENT_ID, RESET_PASSWORD_SECRET_KEY, APP_ENV } = config;

const googleOAuth = new OAuth2Client(GOOGLE_CLIENT_ID);

const sessionCookieName = "dekked-session";

const cookieOptions = {
  httpOnly: true,
  secure: APP_ENV === "production" ? true : false,
  expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  SameSite: APP_ENV === "production" ? "none" : true,
  domain: ".app.localhost",
};

export class AuthController {
  public register = async (
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> => {
    const { first_name, last_name, password, email_address } = req.body;
    missingParams(req.body);

    const doesUserExist = await getUserByEmail(email_address);

    if (doesUserExist) {
      throw new ErrorHandler(
        409,
        "A user already exists with that email address"
      );
    }

    const response = await createUser(
      first_name,
      last_name,
      email_address,
      password
    );

    return res.status(200).json(response);
  };

  public async login(req: express.Request, res: express.Response) {
    const { password, email_address } = req.body;

    try {
      const response: any = await login(email_address, password);
      if (response.success) {
        res.cookie(sessionCookieName, response?.data?.token, cookieOptions);
        res.send("Logged in successfully");
      } else {
        return res.status(response.code).json({
          success: false,
          message: response.message,
        });
      }
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async logout(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    res.clearCookie(sessionCookieName);
    req.logout();
    return res.status(200).json({ success: true });
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
          res.cookie(sessionCookieName, token, cookieOptions);
          return res.status(200).json({
            token,
            success: true,
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
              res.cookie(sessionCookieName, token, cookieOptions);
              return res.status(200).json({ success: true, ...response?.data });
            } else {
              return res.status(response.code).json({
                success: false,
                message: response.message,
              });
            }
          } catch (e) {
            return res.status(500).json({ success: false, error: e.message });
          }
        }
      } else {
        return res.status(response.code).json({
          success: false,
          message: response.message,
        });
      }
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
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
          { email_address: user.email_address },
          RESET_PASSWORD_SECRET_KEY,
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

    // if there is a token we need to decode it and check that there are no errors
    if (token) {
      jwt.verify(token, RESET_PASSWORD_SECRET_KEY, (error) => {
        if (error) {
          return res.status(400).json({
            message: "Incorrect token or expired",
          });
        }
      });
    }

    try {
      // find user by the temporary token we stored earlier
      const user = await getUserByResetPasswordToken(token);

      // if there is no user, send back an error
      if (!user) {
        return res.status(404).json({
          message: "No user exists with that resetPasswordToken",
        });
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
