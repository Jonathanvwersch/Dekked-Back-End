import db from './database';

declare global {
  interface FolderInterface {
    id: string;
    owner_id: string;
    name: string;
    date_created: Date;
    date_modified: Date;
  }
}

async function createFolder(
  name: string,
  owner_id: string,
  color: string,
  id?: string
): Promise<FolderInterface> {
  try {
    const now = new Date();
    const folders: FolderInterface[] = await db('folders')
      .insert({
        name,
        owner_id,
        color,
        date_created: now,
        date_modified: now,
        id
      })
      .returning('id');

    return folders[0];
  } catch (error) {
    console.log(error);
    throw new Error('There was an error creating folder');
  }
}

export async function getFoldersByUser(owner_id: string): Promise<FolderInterface[]> {
  try {
    const response: FolderInterface[] = await db('folders').select('*').where({ owner_id });
    return response;
  } catch (error) {
    console.log(error);
    throw new Error('There was fetching folders for given user');
  }
}

async function updateFolder({
  name,
  color,
  folder_id,
  owner_id
}: {
  name?: string;
  color?: string;
  folder_id: string;
  owner_id: string;
}) {
  try {
    await db('folders').update({ name, color }).where({ id: folder_id, owner_id });
  } catch (err) {
    console.log(err);
    throw Error('There was an error updating folder');
  }
}

async function deleteFolder({ folder_id, owner_id }: { folder_id: string; owner_id: string }) {
  try {
    await db('folders').delete('*').where({ id: folder_id, owner_id });
  } catch (err) {
    console.log(err);
    throw Error('There was an error deleting folder');
  }
}

// async function deleteAllChildren(folder_id: string, owner_id: string) {
//   if (folder_id === 'ROOT') {
//     throw new Error('ROOT folder cannot be deleted');
//   }

//   const folderResponse: FolderInterface[] = await db('folders')
//     .select('*')
//     .where({ id: folder_id });
//   if (folderResponse.length) {
//     return await db('folders')
//       .delete('*')
//       .whereRaw('? @> path AND owner_id = ? ', [folderResponse[0].path, owner_id]);
//   } else {
//     throw new Error('Folder not found');
//   }
// }

// async function moveFolder(target_folder_id: string, folder_id: string, owner_id: string) {
//   if (folder_id === 'ROOT') {
//     throw new Error('ROOT folder cannot be moved');
//   }

//   if (folder_id === target_folder_id) {
//     throw new Error('Target and source are the same');
//   }

//   if (target_folder_id === 'ROOT') {
//     const folderResponse: FolderInterface[] = await db('folders')
//       .select('*')
//       .where({ id: folder_id, owner_id });
//     if (!folderResponse.length) throw new Error('Could not find folder');

//     await db.raw('UPDATE folders SET path = ? || subpath(path, nlevel(?)-1)where path <@ ?', [
//       'ROOT',
//       folderResponse[0].path,
//       folderResponse[0].path
//     ]);
//   } else {
//     const folderResponse: FolderInterface[] = await db('folders')
//       .select('*')
//       .where({ id: folder_id, owner_id });
//     const targetResponse: FolderInterface[] = await db('folders')
//       .select('*')
//       .where({ id: target_folder_id, owner_id });

//     if (!folderResponse.length) throw new Error('Could not find folder');
//     if (!targetResponse.length) throw new Error('Could not find target folder');

//     if (targetResponse[0].path.includes(folderResponse[0].id.replace(/-/g, '')))
//       throw new Error('Cannot move folder within itself');

//     await db.raw('UPDATE folders SET path = ? || subpath(path, nlevel(?)-1) WHERE path <@ ?', [
//       targetResponse[0].path,
//       folderResponse[0].path,
//       folderResponse[0].path
//     ]);
//   }
// }

export default {
  createFolder,
  getFoldersByUser,
  updateFolder,
  deleteFolder
};
