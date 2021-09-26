import express from "express";
import BlockModel from "../Persistance/BlockModel";
import PageModel from "../Persistance/PageModel";
import { getOrganizedBlocks } from "../Services/BlockService";

export class BlockController {
  public async getBlocksByPageId(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    const { page_id } = req.params;

    try {
      const page = await PageModel.getPage(page_id);
      const blocks = await BlockModel.getBlocksByParentId(page_id);
      const organizedBlocks = getOrganizedBlocks(page.ordering, blocks);

      return res.status(200).json(organizedBlocks);
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
