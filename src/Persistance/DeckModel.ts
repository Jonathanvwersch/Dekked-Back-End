import db from "../db/database";

declare global {
  interface DeckInterface {
    id?: string;
    name: string;
    folder_id: string;
  }
}

async function createDeck({ folder_id, name }: DeckInterface): Promise<string> {
  const response: DeckInterface[] = await db
    .table("decks")
    .insert({ name, folder_id }, ["id"]);
  if (response[0].id) {
    return response[0].id;
  }

  throw new Error("Error creating deck");
}

async function getDeck(id: string): Promise<DeckInterface> {
  const response: DeckInterface[] = await db
    .table("decks")
    .select("*")
    .where("id", id);
  if (response.length) {
    return response[0];
  }
  throw new Error("Deck not found!");
}

async function getAllDecks(): Promise<DeckInterface[]> {
  const response: DeckInterface[] = await db.table("decks").select("*");
  return response;
}

async function updateDeck({
  deck_id,
  name,
  folder_id,
}: {
  deck_id: string;
  name?: string;
  folder_id?: string;
}): Promise<number> {
  if (!deck_id) throw new Error("Must specify deck");
  const response: number = await db("decks")
    .update({ folder_id, name })
    .where({ id: deck_id });
  console.log(response);
  return response;
}

async function deleteDeck(deck_id: string): Promise<number> {
  const response = await db("decks").delete().where({ id: deck_id });
  return response;
}

async function getDecksInFolder(
  folder_id: string
): Promise<Array<DeckInterface>> {
  console.log(folder_id);
  const response: Array<DeckInterface> = await db("decks")
    .select("*")
    .where("folder_id", folder_id);

  console.log(response);
  return response;
}

// createDeck({ folder_id: '6b13d0a1-f5af-45d7-a674-e83c81af7175', name: 'The nervous system' });
// getDeck('cc0a3fb5-9af2-4d67-85da-9accc4ea88a2');
// getAllDecksInFolder('d2a2f0a5-b619-4d33-8866-5dc6b7c26810');
export default {
  createDeck,
  getDeck,
  deleteDeck,
  updateDeck,
  getDecksInFolder,
  getAllDecks,
};
