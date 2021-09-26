import express from "express";
import { commonBaseUrl } from ".";
import { BinderController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const binderController = new BinderController();

router.post(
  `${commonBaseUrl}/binders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.createBinder
);

router.get(
  `${commonBaseUrl}/binders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.getBinders
);

router.patch(
  `${commonBaseUrl}/binders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.updateBinder
);

router.delete(
  `${commonBaseUrl}/binders`,
  passport.authenticate("jwt", {
    session: false,
  }),
  binderController.deleteBinder
);

export { router as bindersRouter };
