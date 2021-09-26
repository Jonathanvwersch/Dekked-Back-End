import express from "express";
import { commonBaseUrl } from ".";
import { PageController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const pageController = new PageController();

router.get(`${commonBaseUrl}/pages`, (_, res) => pageController.getPages(res));

router.get(`${commonBaseUrl}/pages/:page_id`, (req, res) =>
  pageController.getPage(req, res)
);

router.get(
  `${commonBaseUrl}/pages/study-sets/:study_set_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  pageController.getPageByStudySetId
);

router.patch(
  `${commonBaseUrl}/pages`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => pageController.updatePage(req, res)
);

export { router as pagesRouter };
