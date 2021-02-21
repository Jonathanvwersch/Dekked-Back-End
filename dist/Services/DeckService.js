"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createDeckObject(decks) {
    let deckObject = {};
    decks.forEach((val) => {
        if (val.id) {
            deckObject[val.id] = val;
        }
    });
    return deckObject;
}
exports.default = {
    createDeckObject
};
