"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getSpacedRepetitionQueuedCards(cards) {
    let queuedCards = [];
    cards.forEach((card) => {
        console.log(card);
        if (card.status === 'new') {
            queuedCards.push(card);
        }
        else if (card.status === 'graduated' && card.interval !== undefined) {
            console.log('HERE');
            let tmp_day = new Date(card.last_seen);
            tmp_day.setDate(tmp_day.getDate() + card.interval);
            let today = new Date();
            today.setHours(23, 59, 59, 999);
            if (tmp_day <= new Date(today.toUTCString())) {
                console.log('ADDING');
                queuedCards.push(card);
            }
        }
    });
    console.log(queuedCards);
    return queuedCards;
}
function calculateNewIntervalNewCard(card) { }
function calculateNewIntervalGraduatedCard(card) { }
exports.default = {
    getSpacedRepetitionQueuedCards
};
