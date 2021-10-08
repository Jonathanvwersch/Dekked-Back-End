import express from "express";
import { commonBaseUrl } from ".";
import { BinderController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express.Router();

const binderController = new BinderController();
export const bindersRoute = `${commonBaseUrl}/binders`;

router.post(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),

  catchAsync(binderController.createBinder)
);

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),

  catchAsync(binderController.getBinders)
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),

  catchAsync(binderController.updateBinder)
);

router.delete(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),

  catchAsync(binderController.deleteBinder)
);

export { router as bindersRouter };
