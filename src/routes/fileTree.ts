import express from "express";
import { commonBaseUrl } from ".";
import { FileTreeController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express();

const fileTreeController = new FileTreeController();
export const fileTreeRoute = `${commonBaseUrl}/file-tree`;

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(fileTreeController.getFileTree(req, res, next));
  }
);

export { router as fileTreeRouter };
