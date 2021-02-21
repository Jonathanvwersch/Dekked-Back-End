import express from 'express';
import { createBinder, getBindersByUserId } from '../Persistance/BinderModel';
import { createBinderObject } from '../Services/BinderService';
import { getUserIdFromRequest } from '../utils/passport/authHelpers';

export class BinderController {
  public async getBindersByUserId(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);

    try {
      const binders = await getBindersByUserId(userId);
      const binderObject = createBinderObject(binders);

      return res.status(200).json({
        success: true,
        data: {
          binders: binderObject
        }
      });
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public async createBinder(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const userId = getUserIdFromRequest(req);
      const { folder_id, name, color } = req.body;
      const response = await createBinder(folder_id, name, userId, color);
      return res.status(200).json({
        success: true,
        data: {
          binder: response
        }
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
