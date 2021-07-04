import db from "../db/database";

declare global {
  interface MultipleChoiceInterface {
    id: string;
    question: string;
    answer: string;
    choices: string;
    notes: string;
    deck_id: string;
  }
}

async function createNewMultipleChoice(
  question: string,
  answer: string,
  choices: string[],
  notes: string,
  deck_id: string
): Promise<string> {
  const response = await db
    .table("multiple_choice")
    .insert({ question, answer, choices, notes, deck_id }, ["id"]);

  return response[0];
}

async function getAllCardsInDeck(
  deck_id: string
): Promise<MultipleChoiceInterface[]> {
  const response = await db("multiple_choice")
    .select("*")
    .where({ deck_id: deck_id });
  return response;
}
