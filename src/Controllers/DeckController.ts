import express from 'express';
import DeckModel from '../Persistance/DeckModel';
import DeckService from '../Services/DeckService';

export class DeckController {
  public async createDeck(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const { folder_id, name }: { folder_id: string; name: string } = req.body;
      if (folder_id && name) {
        const response = await DeckModel.createDeck({ folder_id, name });
        return res.status(200).json({
          success: true,
          data: response
        });
      } else {
        return res
          .status(400)
          .json({ success: false, error: 'Properties not found, type and cardData not found' });
      }
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getDeck(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      if (req.params.deck_id) {
        const response = await DeckModel.getDeck(req.params.deck_id);
        return res.status(200).json({
          success: true,
          data: response
        });
      } else {
        return res.status(400).json({ success: false, error: 'Property deck_id not found' });
      }
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async updateDeck(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      if (!req.body.deck_id)
        return res.status(400).json({ success: false, error: 'Property deck_id not found' });
      const response = await DeckModel.updateDeck(req.body);
      if (!response) {
        return res.status(404).json({ success: false, error: 'Deck not found' });
      }
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async deleteDeck(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      if (!req.body.deck_id)
        return res.status(400).json({ success: false, error: 'Property deck_id not found' });
      const response = await DeckModel.deleteDeck(req.body.deck_id);

      if (!response) return res.status(404).json({ success: false, error: 'Deck not found' });

      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getDecksInFolder(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      console.log(req.params);
      if (!req.params.folder_id)
        return res.status(400).json({ success: false, error: 'Property folder_id not found' });
      const response = await DeckModel.getDecksInFolder(req.params.folder_id);
      console.log(response);
      return res.status(200).json({ success: true, data: response });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getAllDecks(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const response = await DeckModel.getAllDecks();
      const decks = DeckService.createDeckObject(response);
      return res.status(200).json({ success: true, data: decks });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
