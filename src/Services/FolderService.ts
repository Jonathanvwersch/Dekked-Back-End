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

async function updateFolder({
  color,
  name,
  folder_id,
  owner_id,
}: {
  color?: string;
  name?: string;
  folder_id: string;
  owner_id: string;
}) {
  await FolderModel.updateFolder({ color, name, folder_id, owner_id });
}

async function deleteFolder(folder_id: string, owner_id: string) {
  const binders = await BinderService.getBindersByFolderId(folder_id, owner_id);
  await Promise.all(
    binders.map((val) =>
      BinderService.deleteBinder({ binder_id: val.id, owner_id })
    )
  );

  await FolderModel.deleteFolder({ folder_id, owner_id });
}

export default {
  getFolderObject,
  updateFolder,
  deleteFolder,
};
