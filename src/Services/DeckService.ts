import DeckModel from "../Persistance/DeckModel";
import FlashcardService from "./FlashcardService";

async function createDeck(
  study_set_id: string,
  name: string,
  owner_id?: string
) {
  try {
    const result = await DeckModel.createDeck(study_set_id, name, owner_id);
    return result;
  } catch (error) {
    throw new Error("There was an error creating the deck");
  }
}

async function updateDeck(
  name: string,
  study_set_id: string,
  owner_id: string
) {
  try {
    const result = await DeckModel.updateDeck(name, study_set_id, owner_id);
    return result;
  } catch (error) {
    throw new Error("There was an error creating the deck");
  }
}

async function deleteDeck(study_set_id: string, owner_id: string) {
  try {
    await DeckModel.deleteDeck(study_set_id, owner_id);
    await FlashcardService.deleteFlashcardByStudySetId(owner_id, study_set_id);
  } catch (error) {
    throw new Error("There was an error creating the deck");
  }
}

export async function getDeckByStudySetId(study_set_id: string) {
  try {
    const result = await DeckModel.getDeckByStudySetId(study_set_id);
    return result;
  } catch (error) {
    throw new Error("There was an error fetching the deck");
  }
}

export default {
  createDeck,
  deleteDeck,
  getDeckByStudySetId,
  updateDeck,
};
