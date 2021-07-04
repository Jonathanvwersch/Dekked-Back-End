import StudyPackModel from '../Persistance/StudyPackModel';
import { StudyPackInterface } from '../types';
import PageService from './PageService';

export function createStudyPackObject(study_packs: StudyPackInterface[]) {
  let studyPackObject: { [key: string]: StudyPackInterface } = {};
  study_packs.forEach((val) => {
    studyPackObject[val.id] = val;
  });

  return studyPackObject;
}

async function updateStudyPack({
  color,
  name,
  study_pack_id,
  owner_id
}: {
  color?: string;
  name?: string;
  study_pack_id: string;
  owner_id: string;
}) {
  await StudyPackModel.updateStudyPack({ color, name, study_pack_id, owner_id });
}

async function deleteStudyPack({
  study_pack_id,
  owner_id
}: {
  study_pack_id: string;
  owner_id: string;
}) {
  try {
    await StudyPackModel.deleteStudyPack({ owner_id, study_pack_id });
    const page = await PageService.getPageByStudyPackIdAsync(study_pack_id);
    await PageService.deletePage(page.id, owner_id);
  } catch (error) {
    console.log(error);

    throw new Error('There was an error deleting the study pack');
  }
}

async function getStudyPacksByBinderId(binder_id: string) {
  try {
    const studyPacks = await StudyPackModel.getStudyPacksByBinderId(binder_id);
    return studyPacks;
  } catch (err) {
    throw new Error('There was an error getting study packs by binder id');
  }
}

export default {
  createStudyPackObject,
  updateStudyPack,
  deleteStudyPack,
  getStudyPacksByBinderId
};
