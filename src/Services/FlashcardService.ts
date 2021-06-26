import e from 'express';
import { authenticate } from 'passport';
import BlockModel from '../Persistance/BlockModel';
import FlashcardModel from '../Persistance/FlashcardModel';
import BlockService, { getOrganizedBlocks, saveBlocks } from './BlockService';

async function createFlashcard(
  study_pack_id: string,
  owner_id: string,
  block_link?: string,
  front_blocks?: string[],
  front_draft_keys?: string[],
  back_blocks?: string[],
  back_draft_keys?: string[]
) {
  const result = await FlashcardModel.createFlashcard({
    owner_id,
    study_pack_id,
    block_link,
    front_draft_keys,
    back_draft_keys
  });
  if (result.length) {
    await saveBlocks(front_blocks ?? [], result[0], front_draft_keys ?? [], owner_id);
    await saveBlocks(back_blocks ?? [], result[0], back_draft_keys ?? [], owner_id);
    return result;
  } else {
    throw new Error('There was an error creating flashcard');
  }
}

async function getFullFlashcardsByStudyPackId(study_pack_id: string, owner_id: string) {
  try {
    const flashcards = await FlashcardModel.getFlashcardsByStudyPackId(owner_id, study_pack_id);
    const fullFlashcards = await Promise.all(
      flashcards.map(async (val) => {
        const blocksInCard = await BlockModel.getBlocksByParentId(val.id);
        const front_blocks = getOrganizedBlocks(val.front_ordering, blocksInCard);
        const back_blocks = getOrganizedBlocks(val.back_ordering, blocksInCard);
        return {
          flashcard: val,
          front_blocks,
          back_blocks
        };
      })
    );
    return fullFlashcards;
  } catch (error) {
    console.log(error);
    throw Error('There was an error getting flashcards by studypack id');
  }
}

async function saveFlashcard(
  flash_card_id: string,
  owner_id: string,
  front_blocks: [string],
  front_draft_keys: [string],
  back_blocks: [string],
  back_draft_keys: [string]
) {
  await saveBlocks(front_blocks, flash_card_id, front_draft_keys, owner_id);
  await saveBlocks(back_blocks, flash_card_id, back_draft_keys, owner_id);
  const flashcard = await FlashcardModel.updateFlashcard({
    id: flash_card_id,
    owner_id,
    back_ordering: back_draft_keys,
    front_ordering: front_draft_keys
  });
  return flashcard;
}

async function deleteFlashcard(owner_id: string, id: string) {
  try {
    const blocks = await BlockService.getBlocksInParent(id);
    await Promise.all(
      blocks.map(async (val: BlockInterface) => BlockService.deleteBlock(val.id, owner_id))
    );
    await FlashcardModel.deleteFlashcard({
      owner_id,
      id
    });
  } catch (error) {
    console.log(error);
    throw Error('There was an error deleting flashcard');
  }
}

export default {
  createFlashcard,
  getFullFlashcardsByStudyPackId,
  saveFlashcard,
  deleteFlashcard
};
