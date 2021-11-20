import express from "express";
import { commonBaseUrl } from ".";
import { ImageController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

const imageController = new ImageController();
export const imagesRoute = `${commonBaseUrl}/images`;

router.get("/:key", catchAsync(imageController.getImages));

router.post(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  upload.single("image"),
  catchAsync(imageController.uploadImages)
);

export { router as imagesRouter };
