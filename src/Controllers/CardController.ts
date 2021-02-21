import express from 'express';
import ClassicCardModel from '../Persistance/ClassicCardModel';
import DeckModel from '../Persistance/DeckModel';

export class CardController {
  public async createCard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { type, cardData }: { type?: string; cardData?: ClassicCardInterface } = req.body;

    console.log(req.body);

    try {
      if (type && cardData && cardData) {
        if (type === 'classic') {
          const response = await ClassicCardModel.createCard(cardData);
          return res.status(200).json({
            success: true,
            data: response
          });
        } else {
          return res.status(400).json({
            success: false,
            error: 'Type ' + type + ' not implemented'
          });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, error: 'Properties not found, type and cardData not found' });
      }
    } catch (e) {
      return res.status(400).json({ success: false, error: e.message });
    }
  }

  public async getCard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      if (req.params.card_id) {
        const response = await ClassicCardModel.getCard(req.params.card_id);
        return res.status(200).json({
          success: true,
          data: response
        });
      } else {
        return res.status(400).json({ success: false, error: 'Property card_id not found' });
      }
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async updateCard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      if (!req.body.card_id)
        return res.status(400).json({ success: false, error: 'Property card_id not found' });
      const response = await ClassicCardModel.updateCard(req.body);
      if (!response) {
        return res.status(404).json({ success: false, error: 'Card not found' });
      }
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async deleteCard(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      if (!req.body.card_id)
        return res.status(400).json({ success: false, error: 'Property card_id not found' });
      const response = await ClassicCardModel.deleteCard(req.body.deck_id);

      if (!response) return res.status(404).json({ success: false, error: 'Card not found' });

      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getCardsInDeck(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      if (!req.params.deck_id) {
        return res.status(400).json({ success: false, error: 'Property deck_id not found' });
      }
      const response = await ClassicCardModel.getCardsInDeck(req.params.deck_id);
      console.log(response);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
