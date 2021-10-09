import express from "express";
import { commonBaseUrl } from ".";
import { PageController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express();

const pageController = new PageController();
export const pagesRoute = `${commonBaseUrl}/pages`;

router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(pageController.getPages)
);

router.get(
  `/:page_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(pageController.getPage)
);

router.get(
  `/study-sets/:study_set_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(pageController.getPageByStudySetId)
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  catchAsync(pageController.updatePage)
);

export { router as pagesRouter };
