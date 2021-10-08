import express from "express";
import { commonBaseUrl } from ".";
import { StudySetController } from "../Controllers";
import { catchAsync } from "../utils";
import passport from "./routes.helpers";

const router = express();
const studySetController = new StudySetController();
export const studySetsRoute = `${commonBaseUrl}/study-sets`;

router.post(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(studySetController.createStudySet(req, res, next));
  }
);

router.get(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(studySetController.getStudySets(req, res, next));
  }
);

router.patch(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(studySetController.updateStudySet(req, res, next));
  }
);

router.delete(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res, next) => {
    catchAsync(studySetController.deleteStudySet(req, res, next));
  }
);

export { router as studySetsRouter };
