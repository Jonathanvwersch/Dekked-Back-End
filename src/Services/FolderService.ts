import FolderModel from '../Persistance/FolderModel';

async function getFolderObject(user_id: string) {
  const folders = await FolderModel.getFoldersByUser(user_id);
  let folderObject: { [key: string]: FolderInterface } = {};
  folders.forEach((folder) => {
    folderObject[folder.id] = folder;
  });

  return folderObject;
}

export default {
  getFolderObject
};
