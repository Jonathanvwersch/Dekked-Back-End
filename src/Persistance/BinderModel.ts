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
}

export async function getBindersByUserId(user_id: string) {
  const binder: BinderInterface[] = await db
    .table("binders")
    .select("*")
    .where({ owner_id: user_id })
    .orderBy("date_created");

  return binder;
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
  const binders: BinderInterface[] = await db
    .table("binders")
    .update({ name, color, date_modified: now })
    .where({ id: binder_id, owner_id })
    .returning("*");

  return binders[0];
}

export async function deleteBinder({
  binder_id,
  owner_id,
}: {
  binder_id: string;
  owner_id: string;
}) {
  const binders = await db("binders")
    .delete("*")
    .where({ id: binder_id, owner_id })
    .returning("*");
  return binders[0];
}

export async function getBindersByFolderId(
  owner_id: string,
  folder_id: string
) {
  const binders: BinderInterface[] = await db
    .table("binders")
    .select("*")
    .where({ owner_id, folder_id });
  return binders;
}

export default {
  updateBinder,
  createBinder,
  getBindersByUserId,
  deleteBinder,
  getBindersByFolderId,
};
