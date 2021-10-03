import express from "express";
import { commonBaseUrl } from ".";
import { AuthController } from "../Controllers";
import { catchAsync } from "../utils";
const router = express();

const authController = new AuthController();
export const authRoute = `${commonBaseUrl}/auth`;

router.post(`/register`, (req, res, next) => {
  catchAsync(() => authController.register(req, res, next));
});

router.post(`/login`, (req, res) => {
  authController.login(req, res);
});

router.post(`/logout`, (req, res) => {
  authController.logout(req, res);
});

router.post(`/google`, (req, res) => {
  authController.googleAuthentication(req, res);
});

router.post(`/verify-user-email`, (req, res) => {
  authController.verifyUserEmail(req, res);
});

router.patch(`/forget-password`, (req, res) => {
  authController.forgetPassword(req, res);
});

router.patch(`/reset-password`, (req, res) => {
  authController.resetPassword(req, res);
});

export { router as authRouter };
