import express from "express";
import { commonBaseUrl } from ".";
import { UserController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express();
const userController = new UserController();
export const usersRoute = `${commonBaseUrl}/users`;

router.get(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(userController.getUser)
);

router.patch(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(userController.updateUser)
);

export { router as usersRouter };
