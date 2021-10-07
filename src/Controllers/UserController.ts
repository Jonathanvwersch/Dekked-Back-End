import express, { NextFunction } from "express";
import { updateUser } from "../Persistance";
import UserService from "../Services/UserService";
import { getUserIdFromRequest, returnSuccessData } from "../utils";

export class UserController {
  public async getUser(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const user = await UserService.getUserByIdAsync(userId);

    return res.status(200).json({
      ...user,
    });
  }

  public async updateUser(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { last_name, first_name, email_address, password } = req.body;

    await updateUser({
      id: userId,
      last_name,
      first_name,
      email_address,
      password,
    });

    return res
      .status(200)
      .json(returnSuccessData("User has been successfully updated"));
  }
}
