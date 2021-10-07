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

router.post(`/login`, (req, res, next) => {
  catchAsync(() => authController.login(req, res, next));
});

router.post(`/logout`, (req, res, next) => {
  catchAsync(() => authController.logout(req, res, next));
});

router.post(`/google`, (req, res, next) => {
  catchAsync(() => authController.googleAuthentication(req, res, next));
});

router.post(`/verify-user-email`, (req, res, next) => {
  catchAsync(() => authController.verifyUserEmail(req, res, next));
});

router.patch(`/forget-password`, (req, res, next) => {
  catchAsync(() => authController.forgetPassword(req, res, next));
});

router.patch(`/reset-password`, (req, res, next) => {
  catchAsync(() => authController.resetPassword(req, res, next));
});

export { router as authRouter };
