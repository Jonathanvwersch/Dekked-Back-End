import express from "express";
import {
  createBinder,
  getBindersByUserId,
  updateBinder,
} from "../Persistance/BinderModel";
import BinderService, { createBinderObject } from "../Services/BinderService";
import { ErrorHandler, getUserIdFromRequest } from "../utils";

export class BinderController {
  public async getBinders(
    req: express.Request,
    res: express.Response,
    _: express.NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    const binders = await getBindersByUserId(userId);
    const binderObject = createBinderObject(binders);

    if (!binders) {
      throw new ErrorHandler(
        500,
        "There was an error getting the binders by user id"
      );
    }

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
    const { folder_id, name, color, id } = req.body;

    const binder = await createBinder(folder_id, name, userId, color, id);

    if (!binder) {
      throw new ErrorHandler(500, "There was an error creating the binder");
    }

    return res.status(200).json({
      ...binder,
    });
  }

  public async updateBinder(
    req: express.Request,
    res: express.Response,
    _: express.NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { name, color, binder_id } = req.body;

    const binder = await updateBinder({
      name,
      color,
      binder_id,
      owner_id: userId,
    });

    if (!binder) {
      throw new ErrorHandler(500, "There was an error updating the binder");
    }

    return res.status(200).json({ ...binder });
  }

  public async deleteBinder(
    req: express.Request,
    res: express.Response,
    _: express.NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { binder_id } = req.body;

    const binder = await BinderService.deleteBinder({
      binder_id,
      owner_id: userId,
    });

    if (!binder) {
      throw new ErrorHandler(500, "There was an error deleting the binder");
    }

    return res.status(200).json({ ...binder });
  }
}
