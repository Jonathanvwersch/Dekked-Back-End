import { StudySetInterface } from "../types";
import db from "../db/database";

export async function createStudySet(
  binder_id: string,
  name: string,
  owner_id: string,
  color: string,
  id?: string
): Promise<string> {
  const now = new Date();
  const study_set: StudySetInterface[] = await db
    .table("study_sets")
    .insert({
      binder_id,
      name,
      owner_id,
      color,
      id,
      date_created: now,
      date_modified: now,
    })
    .returning("*");

  return study_set[0]?.id;
}

export async function getStudySetById(id: string): Promise<StudySetInterface> {
  const studySet: StudySetInterface = await db
    .table("study_sets")
    .select("*")
    .where({ id })
    .first();

  return studySet;
}

export async function getStudySetsByBinderId(
  binder_id: string
): Promise<StudySetInterface[]> {
  const studySets: StudySetInterface[] = await db
    .table("study_sets")
    .select("*")
    .where({ binder_id });

  return studySets;
}

export async function getStudySetIdsByBinderId(
  binder_id: string
): Promise<string[]> {
  const studySetIds: { id: string }[] = await db
    .table("study_sets")
    .select("id")
    .where({ binder_id });

  const returnedIds: string[] = [];

  studySetIds?.forEach((studySetIdObject) => {
    returnedIds.push(studySetIdObject?.id);
  });

  return returnedIds;
}

export async function getStudySetsByUserId(
  user_id: string
): Promise<StudySetInterface[]> {
  const studySets: StudySetInterface[] = await db
    .table("study_sets")
    .select("*")
    .where({ owner_id: user_id })
    .orderBy("date_created");

  return studySets;
}

export async function updateStudySet({
  study_set_id,
  owner_id,
  color,
  name,
}: {
  study_set_id: string;
  owner_id: string;
  color?: string;
  name?: string;
}): Promise<string> {
  const now = new Date();
  const studySet: StudySetInterface[] = await db("study_sets")
    .update({ name, color, date_modified: now })
    .where({ id: study_set_id, owner_id })
    .returning("*");

  return studySet[0]?.id;
}

async function deleteStudySet({
  study_set_id,
  owner_id,
}: {
  study_set_id: string;
  owner_id: string;
}) {
  await db("study_sets").delete("*").where({ id: study_set_id, owner_id });
}

export default {
  createStudySet,
  getStudySetById,
  getStudySetsByBinderId,
  updateStudySet,
  deleteStudySet,
};
