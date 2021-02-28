import StudyPackModel from '../Persistance/StudyPackModel';

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

export default {
  createStudyPackObject,
  updateStudyPack
};
