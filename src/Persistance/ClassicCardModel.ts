import db from '../db/database';

declare global {
  interface ClassicCardInterface {
    id?: string;
    question: string;
    answer: string;
    last_seen: Date;
    status: string;
    interval?: number;
    ease_factor: number;
    failed_attempts: number;
    deck_id: string;
  }
}

async function createCard({ deck_id, question, answer }: ClassicCardInterface): Promise<String> {
  if (!deck_id) throw new Error('Must specify a deck');
  const response: ClassicCardInterface[] = await db
    .table('classic_cards')
    .insert({ deck_id, question, answer })
    .returning('*');
  if (response[0].id) {
    return response[0].id;
  }

  throw new Error('Error creating card');
}

async function getCard(card_id: string): Promise<ClassicCardInterface> {
  if (!card_id) throw new Error('Must specify card');
  const response: ClassicCardInterface[] = await db('classic_cards').select('*').where({ card_id });
  if (!response.length) throw new Error('Card not found');

  return response[0];
}

async function updateCard({
  card_id,
  deck_id,
  question,
  answer
}: {
  card_id: string;
  deck_id?: string;
  question?: string;
  answer?: string;
}): Promise<number> {
  if (!card_id) throw new Error('Must specify card');
  const response: number = await db('classic_cards')
    .update({ deck_id, question, answer })
    .where({ id: card_id });
  console.log(response);
  return response;
}

async function deleteCard(card_id: string): Promise<number> {
  if (!card_id) throw new Error('Must specify card');
  const response = await db('classic_cards').delete().where({ id: card_id });
  return response;
}

async function getCardsInDeck(deck_id: string): Promise<Array<ClassicCardInterface>> {
  console.log(deck_id);
  const response: Array<ClassicCardInterface> = await db('classic_cards')
    .select('*')
    .where('deck_id', deck_id);

  console.log(response);
  return response;
}

async function getAllCards(): Promise<Array<ClassicCardInterface>> {
  const response: Array<ClassicCardInterface> = await db('classic_cards').select('*');
  return response;
}

export default {
  createCard,
  getCard,
  updateCard,
  deleteCard,
  getCardsInDeck,
  getAllCards
};
