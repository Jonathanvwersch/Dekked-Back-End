import express, { NextFunction } from "express";
import { getUserIdFromRequest, uploadFile } from "../utils";

export class ImageController {
  public async uploadImages(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const file = req.file as Express.Multer.File;

    const uploadedImage = await uploadFile(file, userId);

    return res.status(200).json({
      imageUrl: uploadedImage?.Location,
    });
  }
}
