import express from "express";
import { commonBaseUrl } from ".";
import { FileController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express();

const fileController = new FileController();
export const filesRoute = `${commonBaseUrl}/files`;

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(fileController.getFiles)
);

export { router as filesRouter };
