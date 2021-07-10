import { getStudySetsByUserId } from "../Persistance/StudySetModel";
import { getBindersByUserId } from "../Persistance/BinderModel";
import FolderModel from "../Persistance/FolderModel";
import {
  BinderInterface,
  FileTreeInterface,
  FILETREE_TYPES,
  FolderInterface,
  StudySetInterface,
} from "../types";

function createFolderObject(
  folders: FolderInterface[]
): { [key: string]: FolderInterface } {
  let folderObject: { [key: string]: FolderInterface } = {};
  for (let i = 0; i < folders.length; i++) {
    const prop: string = folders[i].id;
    if (!folderObject[prop]) {
      folderObject[prop] = folders[i];
    }
  }
  return folderObject;
}

function createBindersObject(
  binders: BinderInterface[],
  study_sets: StudySetInterface[]
) {
  let bindersObject: FileTreeInterface = {};

  binders.forEach((binder) => {
    bindersObject[binder.id] = {
      type: FILETREE_TYPES.BINDER,
      ...binder,
      children: {},
    };
  });

  study_sets.forEach((study_set) => {
    const binder_id = study_set.binder_id;
    const study_set_id = study_set.id;
    if (bindersObject[binder_id]) {
      const folderId = bindersObject?.[binder_id]?.folder_id;
      bindersObject[binder_id].children[study_set_id] = {
        type: FILETREE_TYPES.STUDY_SET,
        ...study_set,
        folder_id: folderId,
        children: {},
      };
    }
  });

  return bindersObject;
}

function createFolderHierarchyObject(folders: FolderInterface[]) {
  let folderHierarchy: FileTreeInterface = {};
  folders.forEach((folder) => {
    if (!folderHierarchy[folder.id]) {
      folderHierarchy[folder.id] = {
        type: FILETREE_TYPES.FOLDER,
        ...folder,
        children: {},
      };
    }
  });

  return folderHierarchy;
}

function createFullHierarchyObject(
  binders_mapping: FileTreeInterface,
  binders: BinderInterface[],
  folder_hierarchy: FileTreeInterface
) {
  let hierarchy = { ...folder_hierarchy };

  binders.forEach((binder) => {
    if (hierarchy[binder.folder_id]) {
      hierarchy[binder.folder_id].children[binder.id] =
        binders_mapping[binder.id];
    }
  });
  return folder_hierarchy;
}

async function createFullFileTree(user_id: string) {
  const folders = await FolderModel.getFoldersByUser(user_id);
  const study_sets = await getStudySetsByUserId(user_id);
  const binders = await getBindersByUserId(user_id);
  const folder_hierarchy = createFolderHierarchyObject(folders);
  const binder_hierachy = createBindersObject(binders, study_sets);
  const full_hierarchy = createFullHierarchyObject(
    binder_hierachy,
    binders,
    folder_hierarchy
  );

  return full_hierarchy;
}

export default {
  createFullFileTree,
  createFolderObject,
};
