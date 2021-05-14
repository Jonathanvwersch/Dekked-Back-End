import db from './database';

declare global {
  interface FlashcardInterface {
    id: string;
    owner_id: string;
    study_pack_id: string;
    back_ordering: string[];
    front_ordering: string[];
    date_created: Date;
    date_modified: Date;
    block_link?: string;
  }
}

async function createFlashcard({
  owner_id,
  study_pack_id,
  block_link
}: {
  owner_id: string;
  study_pack_id: string;
  block_link?: string;
}) {
  try {
    const now = new Date();
    const creationResponse: String = await db('flashcards')
      .insert({
        owner_id,
        study_pack_id,
        block_link,
        date_created: now,
        date_modified: now
      })
      .returning('id');

    return creationResponse;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error creating flashcard');
  }
}

async function getFlashcardsByStudyPackId(owner_id: string, study_pack_id: string) {
  try {
    const flashcards: FlashcardInterface[] = await db('flashcards').select('*').where({
      owner_id,
      id: study_pack_id
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
  date_created,
  date_modified,
  block_link
}: {
  id: string;
  owner_id: string;
  back_ordering?: string[];
  front_ordering?: string[];
  date_created?: Date;
  date_modified?: Date;
  block_link?: string;
}) {
  try {
    await db('flashcards')
      .update({
        back_ordering,
        front_ordering,
        date_created,
        date_modified,
        block_link
      })
      .where({ id, owner_id });
  } catch (error) {
    console.log(error);
    throw new Error('Error updating flashcard');
  }
}

export default {
  createFlashcard,
  getFlashcardsByStudyPackId,
  updateFlashcard
};
