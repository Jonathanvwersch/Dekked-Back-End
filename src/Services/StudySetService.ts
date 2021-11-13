import db from "../db/database";
import { getUserById } from "../Persistance";
import DeckModel from "../Persistance/DeckModel";
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
  // we need to delete study_set_id from recently_visited array (if it exists in the array)
  const user = await getUserById(owner_id);
  let recentlyVisited = user?.recently_visited;
  const recentlyVisitedFiltered = recentlyVisited?.filter(
    (visited) => visited !== study_set_id
  );
  await db("users")
    .update({ recently_visited: recentlyVisitedFiltered })
    .where({ id: owner_id });

  await StudySetModel.deleteStudySet({ owner_id, study_set_id });
  const page = await DeckModel.getDeckByStudySetId(study_set_id, owner_id);
  await PageService.deletePage(page.id, owner_id);
  await DeckService.deleteDeck(study_set_id, owner_id);
}

export default {
  createStudySetObject,
  updateStudySet,
  deleteStudySet,
};
