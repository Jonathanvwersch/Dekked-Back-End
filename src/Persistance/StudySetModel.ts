import { StudySetInterface } from "../types";
import db from "../db/database";

export async function createStudySet(
  binder_id: string,
  name: string,
  owner_id: string,
  color: string,
  id?: string
): Promise<StudySetInterface> {
  const now = new Date();

  const study_set: StudySetInterface[] = await db.table("study_sets").insert(
    {
      binder_id,
      name,
      owner_id,
      color,
      id,
      date_created: now,
      date_modified: now,
    },
    ["*"]
  );

  return study_set[0];
}

export async function getStudySetById(id: string) {
  const studySet: StudySetInterface | undefined = await db
    .table("study_sets")
    .select("*")
    .where({ id })
    .first();
  return studySet;
}

export async function getStudySetsByBinderId(binder_id: string) {
  const study_sets: StudySetInterface[] = await db
    .table("study_sets")
    .select("*")
    .where({ binder_id });

  return study_sets;
}

export async function getStudySetsByUserId(user_id: string) {
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
}) {
  const now = new Date();

  await db("study_sets")
    .update({ name, color, date_modified: now })
    .where({ id: study_set_id, owner_id });
}

async function deleteStudySet({
  study_set_id,
  owner_id,
}: {
  study_set_id: string;
  owner_id: string;
}) {
  await db("study_sets")
    .delete("*")
    .where({ id: study_set_id, owner_id })
    .returning("*");
}
export default {
  createStudySet,
  getStudySetById,
  getStudySetsByBinderId,
  updateStudySet,
  deleteStudySet,
};
