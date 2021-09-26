import express from "express";
import { createBinder, getBindersByUserId } from "../Persistance/BinderModel";
import BinderService, { createBinderObject } from "../Services/BinderService";
import { getUserIdFromRequest } from "../utils/passport/authHelpers";

export class BinderController {
  public async getBinders(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    try {
      const binders = await getBindersByUserId(userId);
      const binderObject = createBinderObject(binders);

      return res.status(200).json({
        ...binderObject,
      });
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public async createBinder(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { folder_id, name, color, id } = req.body;

    try {
      const binder = await createBinder(folder_id, name, userId, color, id);

      return res.status(201).json({
        ...binder,
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async updateBinder(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { name, color, binder_id } = req.body;

    try {
      await BinderService.updateBinder({
        name,
        color,
        binder_id,
        owner_id: userId,
      });

      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async deleteBinder(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const { binder_id } = req.body;

    try {
      await BinderService.deleteBinder({
        binder_id,
        owner_id: userId,
      });

      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
