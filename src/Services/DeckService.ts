import DeckModel from "../Persistance/DeckModel";

async function createDeck(
  study_set_id: string,
  name: string,
  owner_id?: string
) {
  try {
    const result = await DeckModel.createDeck(study_set_id, name, owner_id);
    return result;
  } catch (error) {
    console.log(error);
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
    console.log(error);
    throw new Error("There was an error creating the deck");
  }
}

export async function getDeckByStudySetIdAsync(study_set_id: string) {
  try {
    const result = await DeckModel.getDeckByStudySetId(study_set_id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("There was an error fetching the deck");
  }
}

export default {
  createDeck,
  getDeckByStudySetIdAsync,
  updateDeck,
};
