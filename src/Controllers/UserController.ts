import express from "express";
import UserService from "../Services/UserService";
import { getUserIdFromRequest } from "../utils";

export class UserController {
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
