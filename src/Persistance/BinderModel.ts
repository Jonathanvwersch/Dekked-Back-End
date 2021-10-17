import { BinderInterface } from "../types";
import db from "../db/database";

export async function createBinder(
  folder_id: string,
  name: string,
  owner_id: string,
  color: string,
  id?: string
): Promise<string> {
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

  return binders[0]?.id;
}

export async function getBinders(user_id: string): Promise<BinderInterface[]> {
  const binders: BinderInterface[] = await db
    .table("binders")
    .select("*")
    .where({ owner_id: user_id })
    .orderBy("date_created");

  return binders;
}

export async function getBindersByFolderId(
  owner_id: string,
  folder_id: string
): Promise<BinderInterface[]> {
  const binders: BinderInterface[] = await db
    .table("binders")
    .select("*")
    .where({ owner_id, folder_id });

  return binders;
}

export async function getBinderIdsByFolderId(
  owner_id: string,
  folder_id: string
): Promise<string[]> {
  const binderIds: BinderInterface[] = await db
    .table("binders")
    .select("id")
    .where({ owner_id, folder_id });

  const returnedIds: string[] = [];

  binderIds?.forEach((binderIdObject) => {
    returnedIds.push(binderIdObject?.id);
  });
  return returnedIds;
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
}): Promise<string> {
  const now = new Date();
  const binders: BinderInterface[] = await db
    .table("binders")
    .update({ name, color, date_modified: now })
    .where({ id: binder_id, owner_id })
    .returning("*");

  return binders[0]?.id;
}

export async function deleteBinder({
  binder_id,
  owner_id,
}: {
  binder_id: string;
  owner_id: string;
}) {
  await db("binders").delete("*").where({ id: binder_id, owner_id });
}

export default {
  updateBinder,
  createBinder,
  getBinders,
  deleteBinder,
  getBindersByFolderId,
};
