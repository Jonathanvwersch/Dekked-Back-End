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
  catchAsync(folderController.createFolder)
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(folderController.getFolders)
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(folderController.updateFolder)
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(folderController.deleteFolder)
);

export { router as foldersRouter };
