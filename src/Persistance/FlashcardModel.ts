import {
  FlashcardInterface,
  FlashcardLearningStatus,
  FlashcardStatus,
} from "../types";
import db from "../db/database";

async function createFlashcard({
  owner_id,
  study_set_id,
  block_link,
  front_draft_keys,
  back_draft_keys,
  deck_id,
}: {
  owner_id: string;
  study_set_id: string;
  block_link?: string;
  deck_id: string;
  front_draft_keys?: string[];
  back_draft_keys?: string[];
}): Promise<FlashcardInterface> {
  const now = new Date();
  const flashcard: FlashcardInterface[] = await db("flashcards")
    .insert({
      owner_id,
      study_set_id,
      deck_id,
      block_link,
      date_created: now,
      date_modified: now,
      front_ordering: front_draft_keys ?? [],
      back_ordering: back_draft_keys ?? [],
    })
    .returning("*");

  return flashcard[0];
}

async function getFlashcardsByDeckId(
  owner_id: string,
  deck_id: string
): Promise<FlashcardInterface[]> {
  const flashcards: FlashcardInterface[] = await db("flashcards")
    .select("*")
    .where({
      owner_id,
      deck_id,
    })
    .orderBy("date_created", "asc");

  return flashcards;
}

async function getFlashcardsByStudySetIds(
  userId: string,
  studySetIds: string[]
): Promise<FlashcardInterface[]> {
  const flashcards: FlashcardInterface[] = await db("flashcards")
    .select("*")
    .where({ owner_id: userId })
    .whereIn("study_set_id", studySetIds);

  return flashcards;
}

async function getFlashcardsByStudySetId(
  owner_id: string,
  study_set_id: string
): Promise<FlashcardInterface[]> {
  const flashcards: FlashcardInterface[] = await db("flashcards")
    .select("*")
    .where({
      owner_id,
      study_set_id,
    });

  return flashcards;
}

async function getSpacedRepetitionDeckByStudySetId(
  owner_id: string,
  studySetIds: string[]
): Promise<FlashcardInterface[]> {
  const now = new Date();
  const flashcards: FlashcardInterface[] = await db("flashcards")
    .select("*")
    .where({
      owner_id,
    })
    .whereIn("study_set_id", studySetIds)
    .andWhere(function () {
      this.whereNull("due_date").orWhere("due_date", "<=", now);
    })
    .orderBy("due_date", "asc");

  return flashcards;
}

async function getAllDueFlashcards(
  owner_id: string
): Promise<FlashcardInterface[]> {
  const now = new Date();
  const flashcards: FlashcardInterface[] = await db("flashcards")
    .select("*")
    .where({
      owner_id,
    })
    .andWhere(function () {
      this.whereNull("due_date").orWhere("due_date", "<=", now);
    });

  return flashcards;
}

async function updateFlashcard({
  id,
  owner_id,
  back_ordering,
  front_ordering,
  block_link,
  interval,
  learning_status,
  ease_factor,
  status,
  failed_consecutive_attempts,
  due_date,
  quality,
  starred,
}: {
  id: string;
  owner_id: string;
  back_ordering?: string[];
  front_ordering?: string[];
  block_link?: string;
  interval?: number;
  learning_status?: FlashcardLearningStatus;
  status?: FlashcardStatus;
  ease_factor?: number;
  failed_consecutive_attempts?: number;
  due_date?: Date;
  quality?: number;
  starred?: boolean;
}): Promise<FlashcardInterface> {
  const now = new Date();
  const flashcards: FlashcardInterface[] = await db("flashcards")
    .update({
      back_ordering,
      front_ordering,
      block_link,
      date_modified: now,
      interval,
      learning_status,
      ease_factor,
      status,
      failed_consecutive_attempts,
      due_date,
      quality,
      starred,
    })
    .where({ id, owner_id })
    .returning("*");

  return flashcards[0];
}

async function deleteFlashcard({
  owner_id,
  id,
}: {
  owner_id: string;
  id: string;
}) {
  await db("flashcards").delete("*").where({
    owner_id,
    id,
  });
}

async function deleteFlashcardByStudySetId({
  owner_id,
  study_set_id,
}: {
  owner_id: string;
  study_set_id: string;
}) {
  await db("flashcards").delete("*").where({
    owner_id,
    study_set_id,
  });
}

export default {
  createFlashcard,
  getFlashcardsByDeckId,
  updateFlashcard,
  deleteFlashcardByStudySetId,
  deleteFlashcard,
  getSpacedRepetitionDeckByStudySetId,
  getFlashcardsByStudySetId,
  getAllDueFlashcards,
  getFlashcardsByStudySetIds,
};
