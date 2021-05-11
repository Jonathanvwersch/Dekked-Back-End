import PageModel from '../Persistance/PageModel';
import BlockService from './BlockService';
async function getPageByStudyPackIdAsync(study_pack_id: string) {
  try {
    const result = await PageModel.getPageByStudyPackId(study_pack_id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error fetching page');
  }
}

async function createPage(study_pack_id: string, title?: string, owner_id?: string) {
  try {
    const result = await PageModel.createPage(study_pack_id, title, owner_id);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('There was an error creating page');
  }
}

async function deletePage(page_id: string, owner_id: string) {
  try {
    const blocks = await BlockService.getBlocksInPage(page_id);
    await Promise.all(blocks.map(async (val) => BlockService.deleteBlock(val.id, owner_id)));
    await PageModel.deletePage({ page_id, owner_id });
  } catch (e) {
    console.log(e);
    throw new Error('There was an error deleting page');
  }
}

export default {
  getPageByStudyPackIdAsync,
  createPage,
  deletePage
};
