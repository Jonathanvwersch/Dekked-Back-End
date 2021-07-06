import StudySetModel from "../Persistance/StudySetModel";
import { StudySetInterface } from "../types";
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
  try {
    await StudySetModel.deleteStudySet({ owner_id, study_set_id });
    const page = await PageService.getPageByStudySetIdAsync(study_set_id);
    await PageService.deletePage(page.id, owner_id);
  } catch (error) {
    console.log(error);

    throw new Error("There was an error deleting the study pack");
  }
}

async function getStudySetsByBinderId(binder_id: string) {
  try {
    const studySets = await StudySetModel.getStudySetsByBinderId(binder_id);
    return studySets;
  } catch (err) {
    throw new Error("There was an error getting study packs by binder id");
  }
}

export default {
  createStudySetObject,
  updateStudySet,
  deleteStudySet,
  getStudySetsByBinderId,
};
