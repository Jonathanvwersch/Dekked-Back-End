import PageModel from "../Persistance/PageModel";
import { BlockInterface } from "../types";
import BlockService from "./BlockService";

async function getPageByStudySetIdAsync(study_set_id: string) {
  try {
    const result = await PageModel.getPageByStudySetId(study_set_id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("There was an error fetching page");
  }
}

async function createPage(study_set_id: string, owner_id?: string) {
  try {
    const result = await PageModel.createPage(study_set_id, owner_id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("There was an error creating page");
  }
}

async function deletePage(page_id: string, owner_id: string) {
  try {
    const blocks = await BlockService.getBlocksInParent(page_id);
    await Promise.all(
      blocks.map(async (val: BlockInterface) =>
        BlockService.deleteBlock(val.id, owner_id)
      )
    );
    await PageModel.deletePage({ page_id, owner_id });
  } catch (e) {
    console.log(e);
    throw new Error("There was an error deleting page");
  }
}

export default {
  getPageByStudySetIdAsync,
  createPage,
  deletePage,
};
