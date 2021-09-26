import express from "express";
import { commonBaseUrl } from ".";
import { FolderController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const folderController = new FolderController();

router.post(
  `${commonBaseUrl}/folders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.createFolder(req, res)
);

router.get(
  `${commonBaseUrl}/folders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.getFolders
);

router.patch(
  `${commonBaseUrl}/folders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => folderController.updateFolder(req, res)
);

router.delete(
  `${commonBaseUrl}/folders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  folderController.deleteFolder
);

export { router as foldersRouter };
