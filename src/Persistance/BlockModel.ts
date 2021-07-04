import { BlockInterface } from '../types';
import db from './database';

async function createBlock(
  parent_id: string,
  draft_key: string,
  content: string,
  owner_id: string
): Promise<string> {
  const response: BlockInterface[] = await db
    .table('blocks')
    .insert({ parent_id, draft_key, content, owner_id }, ['id']);

  if (response[0].id) {
    return response[0].id;
  }

  throw new Error('There was an error creating the block');
}

async function getBlock(parent_id: string, draft_key: string) {
  const response: BlockInterface[] = await db
    .table('blocks')
    .select('*')
    .where({ draft_key, parent_id });

  if (response.length) {
    return response[0];
  }

  throw new Error('No block was found');
}

async function updateBlock({
  parent_id,
  draft_key,
  content
}: {
  parent_id: string;
  draft_key: string;
  content: string;
}): Promise<number> {
  const response = await db.table('blocks').update({ content }).where({ draft_key, parent_id });
  return response;
}

async function getBlocksByParentId(parent_id: string): Promise<BlockInterface[]> {
  const response: BlockInterface[] = await db.table('blocks').select('*').where({ parent_id });
  return response;
}

async function deleteBlock(id: string, owner_id: string) {
  try {
    await db.table('blocks').delete('*').where({ id, owner_id });
  } catch (error) {
    throw Error('There was an error deleting block');
  }
}

export default {
  createBlock,
  getBlock,
  updateBlock,
  getBlocksByParentId,
  deleteBlock
};
