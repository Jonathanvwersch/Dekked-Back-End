import express from "express";
import { commonBaseUrl } from ".";
import { PageController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const pageController = new PageController();
export const pagesRoute = `${commonBaseUrl}/pages`;

router.get("/", (_, res) => pageController.getPages(res));

router.get(`/:page_id`, (req, res) => pageController.getPage(req, res));

router.get(
  `/study-sets/:study_set_id`,
  passport.authenticate("jwt", {
    session: false,
  }),
  pageController.getPageByStudySetId
);

router.patch(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => pageController.updatePage(req, res)
);

export { router as pagesRouter };
