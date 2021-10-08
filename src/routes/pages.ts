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
  (req, res, next) => {
    catchAsync(pageController.getPages(req, res, next));
  }
);

router.get(
  `/:page_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(pageController.getPage(req, res, next));
  }
);

router.get(
  `/study-sets/:study_set_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(pageController.getPageByStudySetId(req, res, next));
  }
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(pageController.updatePage(req, res, next));
  }
);

export { router as pagesRouter };
