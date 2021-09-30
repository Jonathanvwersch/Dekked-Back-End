import express from "express";
import { commonBaseUrl } from ".";
import { FileTreeController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const fileTreeController = new FileTreeController();
export const fileTreeRoute = `${commonBaseUrl}/file-tree`;

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  fileTreeController.getFileTree
);

export { router as fileTreeRouter };
