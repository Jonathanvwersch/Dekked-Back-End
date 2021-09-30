import express from "express";
import { commonBaseUrl } from ".";
import { FolderController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const folderController = new FolderController();
export const foldersRoute = `${commonBaseUrl}/folders`;

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.createFolder(req, res)
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.getFolders
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.updateFolder(req, res)
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.deleteFolder
);

export { router as foldersRouter };
