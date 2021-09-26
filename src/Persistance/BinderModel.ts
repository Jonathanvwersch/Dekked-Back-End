import { BinderInterface } from "../types";
import db from "../db/database";

export async function createBinder(
  folder_id: string,
  name: string,
  owner_id: string,
  color: string,
  id?: string
): Promise<BinderInterface> {
  const now = new Date();

  try {
    const binders: BinderInterface[] = await db
      .table("binders")
      .insert({
        folder_id,
        name,
        owner_id,
        color,
        id,
        date_created: now,
        date_modified: now,
      })
      .returning("*");
    return binders[0];
  } catch (err) {
    throw new Error("There was an error creating the binder");
  }
}

export async function getBindersByUserId(user_id: string) {
  try {
    const binder: BinderInterface[] = await db
      .table("binders")
      .select("*")
      .where({ owner_id: user_id })
      .orderBy("date_created");
    return binder;
  } catch (err) {
    throw new Error("There was an error getting the binders by user id");
  }
}

export async function updateBinder({
  binder_id,
  owner_id,
  color,
  name,
}: {
  binder_id: string;
  owner_id: string;
  color?: string;
  name?: string;
}) {
  const now = new Date();
  try {
    await db("binders")
      .update({ name, color, date_modified: now })
      .where({ id: binder_id, owner_id });
  } catch (err) {
    throw Error("There was an error updating binder");
  }
}

export async function deleteBinder({
  binder_id,
  owner_id,
}: {
  binder_id: string;
  owner_id: string;
}) {
  try {
    await db("binders").delete("*").where({ id: binder_id, owner_id });
  } catch (err) {
    throw Error("There was an error deleting binder");
  }
}

export async function getBindersByFolderId(
  owner_id: string,
  folder_id: string
) {
  try {
    const binders: BinderInterface[] = await db
      .table("binders")
      .select("*")
      .where({ owner_id, folder_id });
    return binders;
  } catch (err) {
    throw Error("There was an error fetching the binders");
  }
}

export default {
  updateBinder,
  createBinder,
  getBindersByUserId,
  deleteBinder,
  getBindersByFolderId,
};
