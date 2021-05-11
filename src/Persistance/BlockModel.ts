import db from './database';

declare global {
  interface BlockInterface {
    id: string;
    draft_key: string;
    page_id: string;
    content: string;
  }
}

// Types: h1, bulleted_list, main_text...

async function createBlock(
  page_id: string,
  draft_key: string,
  content: string,
  owner_id: string
): Promise<string> {
  const response: BlockInterface[] = await db
    .table('blocks')
    .insert({ page_id, draft_key, content, owner_id }, ['id']);

  if (response[0].id) {
    return response[0].id;
  }

  throw new Error('Error creating block');
}

async function getBlock(page_id: string, draft_key: string) {
  const response: BlockInterface[] = await db
    .table('blocks')
    .select('*')
    .where({ draft_key, page_id });

  if (response.length) {
    return response[0];
  }

  throw new Error('Block not found');
}

async function updateBlock({
  id,
  page_id,
  draft_key,
  content
}: {
  id?: string;
  page_id: string;
  draft_key: string;
  content: string;
}): Promise<number> {
  const response = await db.table('blocks').update({ content }).where({ draft_key, page_id });

  return response;
}

async function getBlocksInPage(page_id: string): Promise<BlockInterface[]> {
  const response: BlockInterface[] = await db.table('blocks').select('*').where('page_id', page_id);
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
  getBlocksInPage,
  deleteBlock
};
