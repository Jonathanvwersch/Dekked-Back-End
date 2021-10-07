import StudySetModel from "../Persistance/StudySetModel";
import { StudySetInterface } from "../types";
import DeckService from "./DeckService";
import PageService from "./PageService";

export function createStudySetObject(study_sets: StudySetInterface[]) {
  let studyPackObject: { [key: string]: StudySetInterface } = {};
  study_sets.forEach((val) => {
    studyPackObject[val.id] = val;
  });

  return studyPackObject;
}

async function updateStudySet({
  color,
  name,
  study_set_id,
  owner_id,
}: {
  color?: string;
  name?: string;
  study_set_id: string;
  owner_id: string;
}) {
  await StudySetModel.updateStudySet({
    color,
    name,
    study_set_id,
    owner_id,
  });
}

async function deleteStudySet({
  study_set_id,
  owner_id,
}: {
  study_set_id: string;
  owner_id: string;
}) {
  await StudySetModel.deleteStudySet({ owner_id, study_set_id });
  const page = await PageService.getDeckByStudySetId(study_set_id, owner_id);
  await PageService.deletePage(page.id, owner_id);
  await DeckService.deleteDeck(study_set_id, owner_id);
}

export default {
  createStudySetObject,
  updateStudySet,
  deleteStudySet,
};
