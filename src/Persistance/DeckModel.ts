import db from "../db/database";
import { DeckInterface } from "../types";

async function createDeck(
  study_set_id: string,
  owner_id: string | undefined
): Promise<string> {
  const now = new Date();
  const response: DeckInterface[] = await db.table("decks").insert(
    {
      owner_id,
      study_set_id,
      date_created: now,
      date_modified: now,
    },
    ["id"]
  );
  if (response[0].id) {
    return response[0].id;
  }

  throw new Error("There was an error creating the page");
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
};
