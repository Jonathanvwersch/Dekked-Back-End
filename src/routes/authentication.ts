import express from "express";
import { commonBaseUrl } from ".";
import { AuthController } from "../Controllers";
import { catchAsync } from "../utils";
const router = express();

const authController = new AuthController();

router.post(`${commonBaseUrl}/auth/register`, (req, res, next) => {
  catchAsync(() => authController.register(req, res, next));
});

router.post(`${commonBaseUrl}/auth/login`, (req, res) => {
  authController.login(req, res);
});

router.post(`${commonBaseUrl}/auth/google`, (req, res) => {
  authController.googleAuthentication(req, res);
});

router.post(`${commonBaseUrl}/auth/verify-user-email`, (req, res) => {
  authController.verifyUserEmail(req, res);
});

router.patch(`${commonBaseUrl}/auth/forget-password`, (req, res) => {
  authController.forgetPassword(req, res);
});

router.patch(`${commonBaseUrl}/auth/reset-password`, (req, res) => {
  authController.resetPassword(req, res);
});

export { router as authRouter };
