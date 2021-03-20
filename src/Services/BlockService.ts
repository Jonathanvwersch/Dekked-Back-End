import BlockModel from '../Persistance/BlockModel';

export async function checkBlockExists(page_id: string, draft_key: string) {
  try {
    await BlockModel.getBlock(page_id, draft_key);
    return true;
  } catch (error) {
    return false;
  }
}

async function saveOrCreateBlock(
  block: string,
  draft_key: string,
  page_id: string,
  owner_id: string
) {
  const exists = await checkBlockExists(page_id, draft_key);
  if (exists) {
    const response = await BlockModel.updateBlock({ page_id, draft_key, content: block });
    return response;
  } else {
    const response = await BlockModel.createBlock(page_id, draft_key, block, owner_id);
    return response;
  }
}

export async function saveBlocks(
  blocks: [string],
  page_id: string,
  draft_keys: [string],
  owner_id: string
) {
  console.log(blocks, page_id, draft_keys);
  for (let i = 0; i < blocks.length; i++) {
    await saveOrCreateBlock(blocks[i], draft_keys[i], page_id, owner_id);
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
