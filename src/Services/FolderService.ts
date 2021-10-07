import FolderModel from "../Persistance/FolderModel";
import { FolderInterface } from "../types";
import BinderService from "./BinderService";

async function getFolderObject(user_id: string) {
  const folders = await FolderModel.getFoldersByUser(user_id);
  let folderObject: { [key: string]: FolderInterface } = {};
  folders.forEach((folder) => {
    folderObject[folder.id] = folder;
  });

  return folderObject;
}

async function deleteFolder(folder_id: string, owner_id: string) {
  const binders = await BinderService.getBindersByFolderId(folder_id, owner_id);
  await Promise.all(
    binders.map((val) =>
      BinderService.deleteBinder({ binder_id: val.id, owner_id })
    )
  );

  return await FolderModel.deleteFolder({ folder_id, owner_id });
}

export default {
  getFolderObject,
  deleteFolder,
};
