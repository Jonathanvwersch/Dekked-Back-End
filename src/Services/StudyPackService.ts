export function createStudyPackObject(study_packs: StudyPackInterface[]) {
  let studyPackObject: { [key: string]: StudyPackInterface } = {};
  study_packs.forEach((val) => {
    studyPackObject[val.id] = val;
  });

  return studyPackObject;
}
