import express from "express";
import { commonBaseUrl } from ".";
import { BlockController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const blockController = new BlockController();

router.get(
  `${commonBaseUrl}/blocks/:page_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  blockController.getBlocksByPageId
);

export { router as blocksRouter };
