import BlockModel from '../Persistance/BlockModel';
import FlashcardModel from '../Persistance/FlashcardModel';
import { getOrganizedBlocks } from './BlockService';

async function createFlashcard(study_pack_id: string, owner_id: string, block_link?: string) {
  const result = await FlashcardModel.createFlashcard({ owner_id, study_pack_id, block_link });
  return result;
}

async function getFullFlashcardsByStudyPackId(study_pack_id: string, owner_id: string) {
  try {
    const flashcards = await FlashcardModel.getFlashcardsByStudyPackId(owner_id, study_pack_id);
    const fullFlashcards = await Promise.all(
      flashcards.map(async (val) => {
        const blocksInCard = await BlockModel.getBlocksByParentId(study_pack_id);
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

export default {
  createFlashcard,
  getFullFlashcardsByStudyPackId
};
