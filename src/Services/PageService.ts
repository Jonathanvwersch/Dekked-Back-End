import PageModel from "../Persistance/PageModel";
import { BlockInterface } from "../types";
import BlockService from "./BlockService";
import BlockModel from "../Persistance/BlockModel";

async function getDeckByStudySetId(study_set_id: string, ownerId: string) {
  const result = await PageModel.getPageByStudySetId(study_set_id, ownerId);

  return result;
}

async function deletePage(page_id: string, owner_id: string) {
  const blocks = await BlockService.getBlocksInParent(page_id);
  await Promise.all(
    blocks.map(async (val: BlockInterface) =>
      BlockModel.deleteBlock(val.id, owner_id)
    )
  );
  await PageModel.deletePage({ page_id, owner_id });
}

export default {
  getDeckByStudySetId,
  deletePage,
};
