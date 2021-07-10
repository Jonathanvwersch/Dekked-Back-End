import { FolderInterface } from "../types";
import db from "../db/database";

async function createFolder(
  name: string,
  owner_id: string,
  color: string,
  id?: string
): Promise<FolderInterface> {
  const now = new Date();

  try {
    const folders: FolderInterface[] = await db("folders")
      .insert({
        name,
        owner_id,
        color,
        date_created: now,
        date_modified: now,
        id,
      })
      .returning("id");
    return folders[0];
  } catch (error) {
    console.log(error);
    throw new Error("There was an error creating folder");
  }
}

export async function getFoldersByUser(
  owner_id: string
): Promise<FolderInterface[]> {
  try {
    const response: FolderInterface[] = await db("folders")
      .select("*")
      .where({ owner_id })
      .orderBy("date_created");
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("There was fetching folders for given user");
  }
}

async function updateFolder({
  name,
  color,
  folder_id,
  owner_id,
}: {
  name?: string;
  color?: string;
  folder_id: string;
  owner_id: string;
}) {
  const now = new Date();

  try {
    await db("folders")
      .update({ name, color, date_modified: now })
      .where({ id: folder_id, owner_id });
  } catch (err) {
    console.log(err);
    throw Error("There was an error updating folder");
  }
}

async function deleteFolder({
  folder_id,
  owner_id,
}: {
  folder_id: string;
  owner_id: string;
}) {
  try {
    await db("folders").delete("*").where({ id: folder_id, owner_id });
  } catch (err) {
    console.log(err);
    throw Error("There was an error deleting folder");
  }
}

export default {
  createFolder,
  getFoldersByUser,
  updateFolder,
  deleteFolder,
};
