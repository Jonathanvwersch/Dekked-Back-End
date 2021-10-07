import express, { CookieOptions, NextFunction } from "express";
import {
  getUserByEmail,
  getUserByResetPasswordToken,
} from "../Persistance/UserModel";
import { createUser, genToken, login } from "../Services/AuthService";
import UserService, { sendEmail } from "../Services/UserService";
import { LoginTicket, OAuth2Client } from "google-auth-library";
import { genSaltSync, hashSync } from "bcryptjs";
import { ErrorHandler, missingParams, returnSuccessData } from "../utils";

import { config } from "../config";
import jwt from "jsonwebtoken";

const { GOOGLE_CLIENT_ID, RESET_PASSWORD_SECRET_KEY } = config;

const googleOAuth = new OAuth2Client(GOOGLE_CLIENT_ID);

const sessionCookieName = "dekked-session";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  sameSite: "none",
};

export class AuthController {
  public register = async (
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> => {
    const { first_name, last_name, password, email_address } = req.body;
    missingParams(req.body, [
      "first_name",
      "last_name",
      "password",
      "email_address",
    ]);

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

  public async login(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { password, email_address } = req.body;

    missingParams(req.body, ["password", "email_address"]);

    const response: any = await login(email_address, password);

    if (!response.success) {
      throw new ErrorHandler(
        response.code,
        "A user already exists with that email address"
      );
    }

    res.cookie(sessionCookieName, response?.data?.token, cookieOptions);
    return res.status(200).json(response?.data);
  }

  public async logout(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    res.clearCookie(sessionCookieName);
    req.logout();
    return res.sendStatus(200);
  }

  public async googleAuthentication(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { token, first_name, last_name, email_address } = req.body;

    missingParams(req.body, [
      "first_name",
      "last_name",
      "token",
      "email_address",
    ]);

    const response: LoginTicket = await googleOAuth.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const isEmailVerified = response.getPayload()?.email_verified;

    if (!isEmailVerified) {
      throw new ErrorHandler(404, "That user does not have a Google account");
    } else {
      const user = await getUserByEmail(email_address);

      // if user already exists, generate a token and send that back to client
      if (user?.id) {
        const token = genToken(user);
        res.cookie(sessionCookieName, token, cookieOptions);
        return res.status(200).json({
          token,
          first_name,
          last_name,
          email_address,
          id: user.id,
        });
      }
      // if user does not exist, we need to create an entry in database for the new user and send a newly created token back to client
      else {
        const response = await createUser(first_name, last_name, email_address);
        const token = genToken(user);

        if (response.first_name) {
          res.cookie(sessionCookieName, token, cookieOptions);
          return res.status(200).json({ ...response, token });
        } else {
          throw new ErrorHandler(500, "Failed to create user");
        }
      }
    }
  }

  public async verifyUserEmail(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { email_address } = req.body;
    missingParams(req.body, ["email_address"]);

    const user = await getUserByEmail(email_address);

    if (!user.first_name) {
      throw new ErrorHandler(404, "No user exists with that email address");
    }

    return res.status(200).json(returnSuccessData("User found"));
  }

  public async forgetPassword(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { email_address } = req.body;
    missingParams(req.body, ["email_address"]);

    const user = await getUserByEmail(email_address);

    if (!user.first_name) {
      throw new ErrorHandler(404, "No user exists with that email address");
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
        .json(
          returnSuccessData(
            `Reset email has been successfully sent to ${email_address}`
          )
        );
    }
  }

  public async resetPassword(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { password, token }: { password: string; token: string } = req.body;
    missingParams(req.body, ["token", "password"]);

    // if there is a token we need to decode it and check that there are no errors
    if (token) {
      jwt.verify(token, RESET_PASSWORD_SECRET_KEY, (error) => {
        if (error) {
          throw new ErrorHandler(400, "Incorrect token or expired");
        }
      });
    }

    // find user by the temporary token we stored earlier
    const user = await getUserByResetPasswordToken(token);

    // if there is no user, send back an error
    if (!user) {
      throw new ErrorHandler(
        404,
        "No user exists with that reset password token"
      );
    }

    // otherwise we need to hash the new password before saving it in the database
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

    return res
      .status(200)
      .json(returnSuccessData("Password has been successfully reset"));
  }
}
