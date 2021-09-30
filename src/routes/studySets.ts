import express from "express";
import { commonBaseUrl } from ".";
import { StudySetController } from "../Controllers";
import passport from "./routes.helpers";

const router = express();
const studySetController = new StudySetController();
export const studySetsRoute = `${commonBaseUrl}/study-sets`;

router.post(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studySetController.createStudySet
);

router.get(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studySetController.getStudySets
);

router.patch(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studySetController.updateStudySet
);

router.delete(
  `/`,
  passport.authenticate("jwt", {
    session: false,
  }),
  studySetController.deleteStudySet
);

export { router as studySetsRouter };
