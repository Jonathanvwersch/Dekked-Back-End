import express from 'express';
import BlockModel from '../Persistance/BlockModel';
import PageModel from '../Persistance/PageModel';

export class BlockController {
  public async createBlock(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response<any>> {
    try {
      const {
        page_id,
        draft_key,
        content,
        index
      }: { page_id: string; draft_key: string; content: string; index?: number } = req.body;

      console.log(req.body);
      if (page_id && draft_key && content) {
        const blockResponse = await BlockModel.createBlock(page_id, draft_key, content);

        let { ordering } = await PageModel.getPage(page_id);
        // New page at index
        if (index && index < ordering.length) {
          ordering.splice(index, 0, blockResponse);
        } else {
          ordering.push(blockResponse);
        }

        const pageUpdateResponse = await PageModel.updatePage({ page_id, ordering });

        if (pageUpdateResponse > 0) {
          return res.status(200).json({
            success: true,
            data: {
              block_id: blockResponse
            }
          });
        }

        return res.status(400).json({
          success: false,
          error: 'Error updating page'
        });
      }
      return res
        .status(400)
        .json({ success: false, error: 'Fields page_id, content and type are required' });
    } catch (e) {
      return res.status(500).json({ success: false, error: e.message });
    }
  }
}
