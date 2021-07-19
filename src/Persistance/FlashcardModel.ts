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
}) {
  const now = new Date();

  try {
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
    return flashcard;
  } catch (error) {
    console.log(error);
    throw new Error("There was an error creating the flashcard");
  }
}

async function getFlashcardsByDeckId(owner_id: string, deck_id: string) {
  try {
    const flashcards: FlashcardInterface[] = await db("flashcards")
      .select("*")
      .where({
        owner_id,
        deck_id,
      })
      .orderBy("date_created", "asc");
    return flashcards;
  } catch (error) {
    console.log(error);
    throw new Error("There was an error fetching flashcards by deck id");
  }
}

async function getSpacedRepetitionDeckByDeckId(
  owner_id: string,
  deck_id: string
) {
  try {
    const flashcards: FlashcardInterface[] = await db("flashcards")
      .select("*")
      .where({
        owner_id,
        deck_id,
      })
      .orderBy("due_date", "asc");
    return flashcards;
  } catch (error) {
    console.log(error);
    throw new Error("There was an error fetching flashcards by deck id");
  }
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
}) {
  const now = new Date();
  try {
    const flashcard: FlashcardInterface[] | undefined = await db("flashcards")
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
      })
      .where({ id, owner_id })
      .returning("*");
    return flashcard;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating flashcard");
  }
}

async function deleteFlashcard({
  owner_id,
  id,
}: {
  owner_id: string;
  id: string;
}) {
  try {
    await db("flashcards").delete("*").where({
      owner_id,
      id,
    });
  } catch (error) {
    console.log(error);
    throw new Error("There was an error deleting flashcard");
  }
}

export default {
  createFlashcard,
  getFlashcardsByDeckId,
  updateFlashcard,
  deleteFlashcard,
  getSpacedRepetitionDeckByDeckId,
};
