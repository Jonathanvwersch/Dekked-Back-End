import express, { NextFunction } from "express";
import {
  getFileStream,
  getUserIdFromRequest,
  missingParams,
  uploadFile,
} from "../utils";

export class ImageController {
  public async getImages(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { key } = req.params;
    missingParams(req.body, ["key"]);
    const readStream = getFileStream(key);
    return readStream.pipe(res);
  }

  public async uploadImages(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const file = req.file as Express.Multer.File;

    const uploadedImage = await uploadFile(file, userId);

    return res.send({ imagePath: `/images/${uploadedImage?.Key}` });
  }
}
