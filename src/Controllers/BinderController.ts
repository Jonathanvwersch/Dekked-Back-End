import express from "express";
import {
  createBinder,
  getBinders,
  updateBinder,
} from "../Persistance/BinderModel";
import BinderService, { createBinderObject } from "../Services/BinderService";
import { getUserIdFromRequest, missingParams } from "../utils";

export class BinderController {
  public async getBinders(
    req: express.Request,
    res: express.Response,
    _: express.NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    const binders = await getBinders(userId);
    const binderObject = createBinderObject(binders);

    return res.status(200).json({
      ...binderObject,
    });
  }

  public async createBinder(
    req: express.Request,
    res: express.Response,
    _: express.NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    missingParams(req.body, ["folder_id"]);

    const { folder_id, name, color, id } = req.body;

    const binder = await createBinder(folder_id, name, userId, color, id);

    return res.status(200).json(binder);
  }

  public async updateBinder(
    req: express.Request,
    res: express.Response,
    _: express.NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    missingParams(req.body, ["binder_id"]);

    const { name, color, binder_id } = req.body;

    const binder = await updateBinder({
      name,
      color,
      binder_id,
      owner_id: userId,
    });

    return res.status(200).json(binder);
  }

  public async deleteBinder(
    req: express.Request,
    res: express.Response,
    _: express.NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    missingParams(req.body, ["binder_id"]);

    const { binder_id } = req.body;

    await BinderService.deleteBinder({
      binder_id,
      owner_id: userId,
    });

    return res.sendStatus(200);
  }
}
