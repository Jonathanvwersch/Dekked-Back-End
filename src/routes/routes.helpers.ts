import passport from "passport";
import { applyPassportStrategy } from "../utils";
applyPassportStrategy(passport);

export { passport as default };

export const commonBaseUrl = "api/v1";
