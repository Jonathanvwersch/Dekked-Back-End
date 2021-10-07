import DeckModel from "../Persistance/DeckModel";
import FlashcardService from "./FlashcardService";

async function deleteDeck(study_set_id: string, owner_id: string) {
  await DeckModel.deleteDeck(study_set_id, owner_id);
  await FlashcardService.deleteFlashcardByStudySetId(owner_id, study_set_id);
}

export default {
  deleteDeck,
};
