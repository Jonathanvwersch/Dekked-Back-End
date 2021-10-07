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
  (req, res, next) => {
    catchAsync(() => userController.getUser(req, res, next));
  }
);

router.patch(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(() => userController.updateUser(req, res, next));
  }
);

export { router as usersRouter };
