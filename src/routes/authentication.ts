import express from "express";
import { commonBaseUrl } from ".";
import { AuthController } from "../Controllers";
import { catchAsync } from "../utils";
const router = express();

const authController = new AuthController();
export const authRoute = `${commonBaseUrl}/auth`;

router.post(`/register`, catchAsync(authController.register));

router.post(`/login`, catchAsync(authController.login));

router.post(`/logout`, catchAsync(authController.logout));

router.post(`/google`, catchAsync(authController.googleAuthentication));

router.post(`/verify-user-email`, catchAsync(authController.verifyUserEmail));

router.patch(`/forget-password`, catchAsync(authController.forgetPassword));

router.patch(`/reset-password`, catchAsync(authController.resetPassword));

export { router as authRouter };
