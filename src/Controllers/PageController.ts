import express, { NextFunction } from "express";
import { updateUser } from "../Persistance";
import BlockModel from "../Persistance/BlockModel";
import PageModel from "../Persistance/PageModel";
import { getOrganizedBlocks, saveBlocks } from "../Services/BlockService";
import { getUserIdFromRequest, missingParams } from "../utils";

export class PageController {
  public async getPage(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { page_id } = req.params;
    missingParams(req.body, ["page_id"]);

    const userId = getUserIdFromRequest(req);

    const page = await PageModel.getPage(page_id, userId);
    const blocks = await BlockModel.getBlocksByParentId(page_id);
    const organizedBlocks = getOrganizedBlocks(page.ordering, blocks);

    return res.status(200).json({
      page,
      organizedBlocks,
    });
  }

  public async updatePage(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    missingParams(req.body, ["study_set_id", "page_id"]);

    const {
      blocks,
      draft_keys,
      page_id,
      study_set_id,
    }: {
      blocks: string[];
      draft_keys: string[];
      page_id: string;
      study_set_id: string;
    } = req.body;

    // update recently visited array
    await updateUser({ id: userId, recently_visited: study_set_id });

    await saveBlocks(blocks, page_id, draft_keys, userId);
    const page = await PageModel.updatePage({
      page_id,
      ordering: draft_keys,
      owner_id: userId,
    });

    return res.status(200).json(page);
  }

  public async getPages(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const userId = getUserIdFromRequest(req);
    const response = await PageModel.getPages(userId);

    return res.status(200).json(response);
  }

  public async getPageByStudySetId(
    req: express.Request,
    res: express.Response,
    _: NextFunction
  ): Promise<express.Response<any>> {
    const { study_set_id } = req.params;
    missingParams(req.params, ["study_set_id"]);

    const userId = getUserIdFromRequest(req);

    const response = await PageModel.getPageByStudySetId(study_set_id, userId);

    return res.status(200).json(response);
  }
}
