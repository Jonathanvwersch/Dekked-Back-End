import db from "../db/database";
import { DeckInterface } from "../types";

async function createDeck(
  study_set_id: string,
  name: string,
  owner_id: string | undefined
): Promise<string> {
  const now = new Date();
  const response: DeckInterface[] = await db.table("decks").insert(
    {
      owner_id,
      study_set_id,
      name,
      date_created: now,
      date_modified: now,
    },
    ["id"]
  );
  if (response[0].id) {
    return response[0].id;
  }

  throw new Error("There was an error creating the deck");
}

async function updateDeck(
  name: string,
  study_set_id: string,
  owner_id: string
): Promise<number> {
  const now = new Date();
  const response = await db
    .table("decks")
    .update({ name, date_modified: now })
    .where({ study_set_id, owner_id });

  if (response) {
    return response;
  }

  throw new Error("There was an error updating the deck");
}

async function getDeckByStudySetId(study_set_id: string) {
  const response: DeckInterface[] = await db
    .table("decks")
    .select("*")
    .where({ study_set_id });
  if (response.length) {
    return response[0];
  }
  throw new Error("Deck not found!");
}

export default {
  createDeck,
  getDeckByStudySetId,
  updateDeck,
};
