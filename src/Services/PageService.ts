import PageModel from '../Persistance/PageModel';

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

export default {
  getPageByStudyPackIdAsync,
  createPage
};
