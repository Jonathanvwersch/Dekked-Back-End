import { FlashcardInterface } from '../types';
import db from './database';

async function createFlashcard({
  owner_id,
  study_pack_id,
  block_link,
  front_draft_keys,
  back_draft_keys
}: {
  owner_id: string;
  study_pack_id: string;
  block_link?: string;
  front_draft_keys?: string[];
  back_draft_keys?: string[];
}) {
  const now = new Date();

  try {
    const creationResponse: FlashcardInterface[] = await db('flashcards')
      .insert({
        owner_id,
        study_pack_id,
        block_link,
        date_created: now,
        date_modified: now,
        front_ordering: front_draft_keys ?? [],
        back_ordering: back_draft_keys ?? []
      })
      .returning('*');
    return creationResponse;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error creating the flashcard');
  }
}

async function getFlashcardsByStudyPackId(owner_id: string, study_pack_id: string) {
  try {
    const flashcards: FlashcardInterface[] = await db('flashcards').select('*').where({
      owner_id,
      study_pack_id
    });
    return flashcards;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error fetching flashcards by study pack id');
  }
}

async function updateFlashcard({
  id,
  owner_id,
  back_ordering,
  front_ordering,
  block_link
}: {
  id: string;
  owner_id: string;
  back_ordering?: string[];
  front_ordering?: string[];
  block_link?: string;
}) {
  try {
    const flashcard: FlashcardInterface[] | undefined = await db('flashcards')
      .update({
        back_ordering,
        front_ordering,
        block_link,
        date_modified: new Date()
      })
      .where({ id, owner_id })
      .returning('*');
    return flashcard;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating flashcard');
  }
}

async function deleteFlashcard({ owner_id, id }: { owner_id: string; id: string }) {
  try {
    await db('flashcards').delete('*').where({
      owner_id,
      id
    });
  } catch (error) {
    console.log(error);
    throw new Error('There was an error deleting flashcard');
  }
}

export default {
  createFlashcard,
  getFlashcardsByStudyPackId,
  updateFlashcard,
  deleteFlashcard
};
