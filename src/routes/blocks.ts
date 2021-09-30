import express from "express";
import { commonBaseUrl } from ".";
import { BlockController } from "../Controllers";
import passport from "./routes.helpers";

const router = express.Router();

const blockController = new BlockController();
export const blockRoute = `${commonBaseUrl}/blocks`;

router.get(
  `/:page_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  blockController.getBlocksByPageId
);

export { router as blocksRouter };
