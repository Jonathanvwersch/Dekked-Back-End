import express from "express";
import { commonBaseUrl } from ".";
import { BlockController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express.Router();

const blockController = new BlockController();
export const blockRoute = `${commonBaseUrl}/blocks`;

router.get(
  `/:page_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(() => blockController.getBlocksByPageId(req, res, next));
  }
);

export { router as blocksRouter };
