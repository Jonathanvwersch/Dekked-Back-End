import BinderModel from "../Persistance/BinderModel";
import { BinderInterface } from "../types";
import StudySetService from "./StudySetService";

export function createBinderObject(binders: BinderInterface[]) {
  let binderObject: { [key: string]: BinderInterface } = {};
  binders.forEach((val) => {
    binderObject[val.id] = val;
  });

  return binderObject;
}

async function updateBinder({
  color,
  name,
  binder_id,
  owner_id,
}: {
  color?: string;
  name?: string;
  binder_id: string;
  owner_id: string;
}) {
  await BinderModel.updateBinder({ color, name, binder_id, owner_id });
}

async function deleteBinder({
  binder_id,
  owner_id,
}: {
  binder_id: string;
  owner_id: string;
}) {
  const study_sets = await StudySetService.getStudySetsByBinderId(binder_id);

  await Promise.all(
    study_sets.map(async (val) =>
      StudySetService.deleteStudySet({ study_set_id: val.id, owner_id })
    )
  );

  await BinderModel.deleteBinder({ binder_id, owner_id });
}

async function getBindersByFolderId(folder_id: string, owner_id: string) {
  return await BinderModel.getBindersByFolderId(owner_id, folder_id);
}

export default {
  createBinderObject,
  updateBinder,
  deleteBinder,
  getBindersByFolderId,
};
