import express from "express";
import { commonBaseUrl } from ".";
import { UserController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const userController = new UserController();

router.get(
  `${commonBaseUrl}/users`,
  passport.authenticate("jwt", {
    session: false,
  }),
  userController.getUser
);

router.patch(
  `${commonBaseUrl}/users`,
  passport.authenticate("jwt", {
    session: false,
  }),
  userController.updateUser
);

export { router as usersRouter };
