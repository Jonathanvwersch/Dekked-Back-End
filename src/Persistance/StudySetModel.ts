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

  try {
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
  } catch (err) {
    throw new Error("There was an error creating the study set");
  }
}

export async function getStudySetById(id: string) {
  try {
    const studySet: StudySetInterface | undefined = await db
      .table("study_sets")
      .select("*")
      .where({ id })
      .first();
    return studySet;
  } catch (err) {
    throw Error("Error getting study pack by id");
  }
}

export async function getStudySetsByBinderId(binder_id: string) {
  try {
    const study_sets: StudySetInterface[] = await db
      .table("study_sets")
      .select("*")
      .where({ binder_id });
    return study_sets;
  } catch (err) {
    throw Error("Error getting study pack by binder id");
  }
}

export async function getStudySetsByUserId(user_id: string) {
  try {
    const studySets: StudySetInterface[] = await db
      .table("study_sets")
      .select("*")
      .where({ owner_id: user_id })
      .orderBy("date_created");
    return studySets;
  } catch (err) {
    throw Error("Error getting study pack by user id");
  }
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

  try {
    await db("study_sets")
      .update({ name, color, date_modified: now })
      .where({ id: study_set_id, owner_id });
  } catch (err) {
    throw Error("There was an error updating study pack");
  }
}

async function deleteStudySet({
  study_set_id,
  owner_id,
}: {
  study_set_id: string;
  owner_id: string;
}) {
  try {
    await db("study_sets").delete("*").where({ id: study_set_id, owner_id });
  } catch (err) {
    throw Error("There was an error deleting study pack");
  }
}
export default {
  createStudySet,
  getStudySetById,
  getStudySetsByBinderId,
  updateStudySet,
  deleteStudySet,
};
