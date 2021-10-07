import { getStudySetsByBinderId } from "../Persistance";
import BinderModel from "../Persistance/BinderModel";
import { BinderInterface } from "../types";
import { ErrorHandler } from "../utils";
import StudySetService from "./StudySetService";

export function createBinderObject(binders: BinderInterface[]) {
  let binderObject: { [key: string]: BinderInterface } = {};
  binders.forEach((val) => {
    binderObject[val.id] = val;
  });

  return binderObject;
}

async function deleteBinder({
  binder_id,
  owner_id,
}: {
  binder_id: string;
  owner_id: string;
}) {
  const study_sets = await getStudySetsByBinderId(binder_id);

  const studySets = await Promise.all(
    study_sets.map(async (val) =>
      StudySetService.deleteStudySet({ study_set_id: val.id, owner_id })
    )
  );

  if (!studySets) {
    throw new ErrorHandler(
      500,
      "There was an error deleting the study sets associated with the binder"
    );
  }

  const binder = await BinderModel.deleteBinder({ binder_id, owner_id });

  if (!binder) {
    throw new ErrorHandler(500, "There was an error deleting the binder");
  }
  return binder;
}

async function getBindersByFolderId(folder_id: string, owner_id: string) {
  return await BinderModel.getBindersByFolderId(owner_id, folder_id);
}

export default {
  createBinderObject,
  deleteBinder,
  getBindersByFolderId,
};
