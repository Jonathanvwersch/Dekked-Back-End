import BlockModel from "../Persistance/BlockModel";
import FlashcardModel from "../Persistance/FlashcardModel";
import {
  BlockInterface,
  DeckInterface,
  DueSpacedRepetitionDecks,
  FlashcardInterface,
  FlashcardLearningStatus,
  FlashcardStatus,
} from "../types";
import BlockService, { getOrganizedBlocks, saveBlocks } from "./BlockService";
import { getDeckByStudySetIdAsync } from "./DeckService";

async function createFlashcard(
  study_set_id: string,
  owner_id: string,
  deck_id: string,
  block_link?: string,
  front_blocks?: string[],
  front_draft_keys?: string[],
  back_blocks?: string[],
  back_draft_keys?: string[]
) {
  const result = await FlashcardModel.createFlashcard({
    owner_id,
    study_set_id,
    block_link,
    deck_id,
    front_draft_keys,
    back_draft_keys,
  });

  if (result.length) {
    await saveBlocks(
      front_blocks ?? [],
      result[0]?.id,
      front_draft_keys ?? [],
      owner_id
    );
    await saveBlocks(
      back_blocks ?? [],
      result[0]?.id,
      back_draft_keys ?? [],
      owner_id
    );
    return result[0];
  } else {
    throw new Error("There was an error creating flashcard");
  }
}

async function getFullFlashcardsByDeckId(deck_id: string, owner_id: string) {
  try {
    const flashcards = await FlashcardModel.getFlashcardsByDeckId(
      owner_id,
      deck_id
    );
    const fullFlashcards = await Promise.all(
      flashcards.map(async (val) => {
        const blocksInCard = await BlockModel.getBlocksByParentId(val.id);
        const front_blocks = getOrganizedBlocks(
          val.front_ordering,
          blocksInCard
        );
        const back_blocks = getOrganizedBlocks(val.back_ordering, blocksInCard);
        return {
          ...val,
          front_blocks,
          back_blocks,
        };
      })
    );
    return fullFlashcards;
  } catch (error) {
    console.log(error);
    throw Error("There was an error getting flashcards by deck id");
  }
}

async function getSpacedRepetitionDeckByDeckId(
  deck_id: string,
  owner_id: string
) {
  try {
    const flashcards = await FlashcardModel.getSpacedRepetitionDeckByDeckId(
      owner_id,
      deck_id
    );
    const fullFlashcards = await Promise.all(
      flashcards.map(async (val) => {
        const blocksInCard = await BlockModel.getBlocksByParentId(val.id);
        const front_blocks = getOrganizedBlocks(
          val.front_ordering,
          blocksInCard
        );
        const back_blocks = getOrganizedBlocks(val.back_ordering, blocksInCard);
        return {
          ...val,
          front_blocks,
          back_blocks,
        };
      })
    );
    return fullFlashcards;
  } catch (error) {
    console.log(error);
    throw Error(
      "There was an error getting spaced repetition flashcards by deck id"
    );
  }
}

async function getAllDueDecks(owner_id: string) {
  const allDueDecks: DueSpacedRepetitionDecks = {};
  try {
    const allDueFlashcards = await FlashcardModel.getAllDueDecks(owner_id);

    await Promise.all(
      allDueFlashcards?.map(async (flashcard: FlashcardInterface) => {
        if (!allDueDecks?.[flashcard.deck_id]) {
          const deck: DeckInterface = await getDeckByStudySetIdAsync(
            flashcard.study_set_id
          );
          allDueDecks[flashcard.deck_id] = {
            study_set_id: flashcard.study_set_id,
            name: deck.name,
            number_of_cards: 0,
            number_of_new_cards: 0,
            number_of_learning_cards: 0,
            number_of_learned_cards: 0,
          };
        }
        allDueDecks[flashcard.deck_id].number_of_cards += 1;
        if (flashcard.learning_status === FlashcardLearningStatus.NEW) {
          allDueDecks[flashcard.deck_id].number_of_new_cards += 1;
        } else if (
          flashcard.learning_status === FlashcardLearningStatus.LEARNING
        ) {
          allDueDecks[flashcard.deck_id].number_of_learning_cards += 1;
        } else if (
          flashcard.learning_status === FlashcardLearningStatus.LEARNED ||
          flashcard.learning_status === FlashcardLearningStatus.DUE
        ) {
          allDueDecks[flashcard.deck_id].number_of_learned_cards += 1;
        }
      })
    );
    return allDueDecks;
  } catch (error) {
    console.log(error);
    throw Error(
      "There was an error getting spaced repetition flashcards by deck id"
    );
  }
}

async function saveFlashcard({
  id,
  owner_id,
  front_blocks,
  front_draft_keys,
  back_blocks,
  back_draft_keys,
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
  front_blocks?: [string];
  front_draft_keys?: [string];
  back_blocks?: [string];
  back_draft_keys?: [string];
  block_link?: string;
  interval?: number;
  learning_status?: FlashcardLearningStatus;
  status?: FlashcardStatus;
  ease_factor?: number;
  failed_consecutive_attempts?: number;
  due_date?: Date;
  quality?: number;
}) {
  front_draft_keys &&
    front_blocks &&
    (await saveBlocks(front_blocks, id, front_draft_keys, owner_id));
  back_blocks &&
    back_draft_keys &&
    (await saveBlocks(back_blocks, id, back_draft_keys, owner_id));
  const flashcard = await FlashcardModel.updateFlashcard({
    id,
    owner_id,
    back_ordering: back_draft_keys,
    front_ordering: front_draft_keys,
    interval,
    learning_status,
    status,
    ease_factor,
    failed_consecutive_attempts,
    due_date,
    block_link,
    quality,
  });
  return flashcard[0];
}

async function deleteFlashcard(owner_id: string, id: string) {
  try {
    const blocks = await BlockService.getBlocksInParent(id);
    await Promise.all(
      blocks.map(async (val: BlockInterface) =>
        BlockService.deleteBlock(val.id, owner_id)
      )
    );
    await FlashcardModel.deleteFlashcard({
      owner_id,
      id,
    });
  } catch (error) {
    console.log(error);
    throw Error("There was an error deleting flashcard");
  }
}

export default {
  createFlashcard,
  getFullFlashcardsByDeckId,
  saveFlashcard,
  deleteFlashcard,
  getSpacedRepetitionDeckByDeckId,
  getAllDueDecks,
};
