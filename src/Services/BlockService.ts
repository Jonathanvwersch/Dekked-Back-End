import BlockModel from '../Persistance/BlockModel';

export async function checkBlockExists(parent_id: string, draft_key: string) {
  try {
    await BlockModel.getBlock(parent_id, draft_key);
    return true;
  } catch (error) {
    return false;
  }
}

async function saveOrCreateBlock(
  block: string,
  draft_key: string,
  parent_id: string,
  owner_id: string
) {
  const exists = await checkBlockExists(parent_id, draft_key);
  if (exists) {
    const response = await BlockModel.updateBlock({ parent_id, draft_key, content: block });
    return response;
  } else {
    const response = await BlockModel.createBlock(parent_id, draft_key, block, owner_id);
    return response;
  }
}

export async function saveBlocks(
  blocks: [string],
  parent_id: string,
  draft_keys: [string],
  owner_id: string
) {
  console.log(blocks, parent_id, draft_keys);
  for (let i = 0; i < blocks.length; i++) {
    await saveOrCreateBlock(blocks[i], draft_keys[i], parent_id, owner_id);
  }
}

export function getOrganizedBlocks(ordering: string[], blocks: BlockInterface[]): BlockInterface[] {
  let orderingMap: any = {};

  blocks.forEach((val) => (orderingMap[val.draft_key] = val.content));
  const orderedBlocks = ordering.map((val) => {
    return orderingMap[val];
  });

  return orderedBlocks;
}

export async function deleteBlock(block_id: string, owner_id: string) {
  await BlockModel.deleteBlock(block_id, owner_id);
}

export async function getBlocksInParent(parent_id: string) {
  const blocks = await BlockModel.getBlocksByParentId(parent_id);
  return blocks;
}

export default {
  getBlocksInParent,
  deleteBlock
};
