import express from "express";
import BlockModel from "../Persistance/BlockModel";
import PageModel from "../Persistance/PageModel";
import { getOrganizedBlocks, saveBlocks } from "../Services/BlockService";
import PageService from "../Services/PageService";
import { getUserIdFromRequest } from "../utils/passport/authHelpers";

export class PageController {
  public async getFullPage(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { page_id } = req.params;

    try {
      const page = await PageModel.getPage(page_id);
      const blocks = await BlockModel.getBlocksByParentId(page_id);
      const organizedBlocks = getOrganizedBlocks(page.ordering, blocks);
      return res.status(200).json({
        page,
        organizedBlocks,
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getPageMeta(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { page_id } = req.params;

    try {
      const response = await PageModel.getPage(page_id);
      return res.status(200).json({
        response,
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async saveFullPage(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { page_id } = req.params;
    const userId = getUserIdFromRequest(req);
    const {
      blocks,
      draft_keys,
    }: { blocks: [string]; draft_keys: [string] } = req.body;

    try {
      await saveBlocks(blocks, page_id, draft_keys, userId);
      await PageModel.updatePage({ page_id, ordering: draft_keys });
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
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
        response,
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getPages(res: express.Response): Promise<express.Response<any>> {
    try {
      const response = await PageModel.getPages();
      return res.status(200).json({
        pages: response,
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }

  public async getPageByStudySetId(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { study_set_id } = req.params;

    try {
      const response = await PageService.getPageByStudySetIdAsync(study_set_id);
      return res.status(200).json({
        ...response,
      });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
