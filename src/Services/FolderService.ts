import FolderModel from '../Persistance/FolderModel';

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
  owner_id
}: {
  color?: string;
  name?: string;
  folder_id: string;
  owner_id: string;
}) {
  await FolderModel.updateFolder({ color, name, folder_id, owner_id });
}

export default {
  getFolderObject,
  updateFolder
};
