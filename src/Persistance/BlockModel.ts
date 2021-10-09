import { BlockInterface } from "../types";
import db from "../db/database";

async function createBlock(
  parent_id: string,
  draft_key: string,
  content: string,
  owner_id: string
): Promise<string> {
  const response: BlockInterface[] = await db
    .table("blocks")
    .insert({ parent_id, draft_key, content, owner_id }, ["id"])
    .returning("*");

  return response?.[0]?.id;
}

async function getBlock(
  parent_id: string,
  draft_key: string
): Promise<BlockInterface> {
  const response: BlockInterface[] = await db
    .table("blocks")
    .select("*")
    .where({ draft_key, parent_id });

  return response?.[0];
}

async function updateBlock({
  parent_id,
  draft_key,
  content,
}: {
  parent_id: string;
  draft_key: string;
  content: string;
}): Promise<string> {
  const response: BlockInterface[] = await db
    .table("blocks")
    .update({ content })
    .where({ draft_key, parent_id })
    .returning("*");

  return response?.[0]?.id;
}

async function getBlocksByParentId(
  parent_id: string
): Promise<BlockInterface[]> {
  const response: BlockInterface[] = await db
    .table("blocks")
    .select("*")
    .where({ parent_id });
  return response;
}

async function deleteBlock(id: string, owner_id: string) {
  await db.table("blocks").delete("*").where({ id, owner_id });
}

export default {
  createBlock,
  getBlock,
  updateBlock,
  getBlocksByParentId,
  deleteBlock,
};
