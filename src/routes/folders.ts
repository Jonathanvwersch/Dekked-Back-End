import express from "express";
import { commonBaseUrl } from ".";
import { FolderController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express();

const folderController = new FolderController();
export const foldersRoute = `${commonBaseUrl}/folders`;

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(() => folderController.createFolder(req, res, next));
  }
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(() => folderController.getFolders(req, res, next));
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => folderController.updateFolder(req, res, next)
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.deleteFolder
);

export { router as foldersRouter };
