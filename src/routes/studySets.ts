import express from "express";
import { commonBaseUrl } from ".";
import { StudySetController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();

const studySetController = new StudySetController();

router.post(
  `${commonBaseUrl}/study-sets`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studySetController.createStudySet
);

router.get(
  `${commonBaseUrl}/study-sets`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studySetController.getStudySets
);

router.patch(
  `${commonBaseUrl}/study-sets`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studySetController.updateStudySet
);

router.delete(
  `${commonBaseUrl}/study-sets`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studySetController.deleteStudySet
);

export { router as studySetsRouter };
