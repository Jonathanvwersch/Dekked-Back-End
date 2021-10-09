import { FolderInterface } from "../types";
import db from "../db/database";

export async function createFolder(
  name: string,
  owner_id: string,
  color: string,
  id?: string
): Promise<string> {
  const now = new Date();
  const folders: FolderInterface[] = await db("folders")
    .insert({
      name,
      owner_id,
      color,
      date_created: now,
      date_modified: now,
      id,
    })
    .returning("*");

  return folders[0]?.id;
}

export async function getFoldersByUser(
  owner_id: string
): Promise<FolderInterface[]> {
  const folders: FolderInterface[] = await db("folders")
    .select("*")
    .where({ owner_id })
    .orderBy("date_created");

  return folders;
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
}): Promise<string> {
  const now = new Date();
  const folders = await db("folders")
    .update({ name, color, date_modified: now })
    .where({ id: folder_id, owner_id })
    .returning("*");

  return folders[0]?.id;
}

async function deleteFolder({
  folder_id,
  owner_id,
}: {
  folder_id: string;
  owner_id: string;
}) {
  await db("folders")
    .delete("*")
    .where({ id: folder_id, owner_id })
    .returning("*");
}

export default {
  createFolder,
  getFoldersByUser,
  updateFolder,
  deleteFolder,
};
