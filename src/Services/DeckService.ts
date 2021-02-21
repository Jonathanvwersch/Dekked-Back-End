function createDeckObject(decks: Array<DeckInterface>): { [deck_id: string]: DeckInterface } {
  let deckObject: { [deck_id: string]: DeckInterface } = {};

  decks.forEach((val) => {
    if (val.id) {
      deckObject[val.id] = val;
    }
  });
  return deckObject;
}

export default {
  createDeckObject
};
