import express from 'express';
import BlockModel from '../Persistance/BlockModel';
import PageModel from '../Persistance/PageModel';
import { checkBlockExists, getOrganizedBlocks, saveBlocks } from '../Services/BlockService';

export class PageController {
  public async createPage(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const { title } = req.body;
      console.log('HERE');

      const response = await PageModel.createPage(title);
      return res.status(200).json({
        success: true,
        data: { page_id: response }
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getFullPage(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const { page_id } = req.params;

      const page = await PageModel.getPage(page_id);
      const blocks = await BlockModel.getBlockInPage(page_id);

      const organizedBlocks = getOrganizedBlocks(page.ordering, blocks);
      return res.status(200).json({
        success: true,
        data: { page, organizedBlocks }
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getPageMeta(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const { page_id } = req.params;

      const response = await PageModel.getPage(page_id);
      return res.status(200).json({
        success: true,
        data: response
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async saveFullPage(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      console.log('HERER');
      const { page_id } = req.params;

      const {
        blocks,
        draft_keys,
        title
      }: { blocks: [string]; draft_keys: [string]; title: string } = req.body;
      await saveBlocks(blocks, page_id, draft_keys);
      await PageModel.updatePage({ page_id, title, ordering: draft_keys });

      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async updatePage(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const response = await PageModel.updatePage(req.body);
      return res.status(200).json({
        success: true,
        data: response
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getPages(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const response = await PageModel.getPages();
      return res.status(200).json({
        success: true,
        data: {
          pages: response
        }
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
