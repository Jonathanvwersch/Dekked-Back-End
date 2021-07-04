import { getStudyPacksByUserId } from "../Persistance/StudyPackModel";
import { getBindersByUserId } from "../Persistance/BinderModel";
import FolderModel from "../Persistance/FolderModel";
import {
  BinderInterface,
  FileTreeInterface,
  FILETREE_TYPES,
  FolderInterface,
  StudyPackInterface,
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
  study_packs: StudyPackInterface[]
) {
  let bindersObject: FileTreeInterface = {};

  binders.forEach((binder) => {
    bindersObject[binder.id] = {
      type: FILETREE_TYPES.BINDER,
      ...binder,
      children: {},
    };
  });

  study_packs.forEach((study_pack) => {
    const binder_id = study_pack.binder_id;
    const study_pack_id = study_pack.id;
    if (bindersObject[binder_id]) {
      const folderId = bindersObject?.[binder_id]?.folder_id;
      bindersObject[binder_id].children[study_pack_id] = {
        type: FILETREE_TYPES.STUDY_PACK,
        ...study_pack,
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
  const study_packs = await getStudyPacksByUserId(user_id);
  const binders = await getBindersByUserId(user_id);
  const folder_hierarchy = createFolderHierarchyObject(folders);
  const binder_hierachy = createBindersObject(binders, study_packs);
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
