import { PageInterface } from '../types';
import db from './database';

async function createPage(
  study_pack_id: string,
  title: string = 'Untitled',
  owner_id: string | undefined,
  ordering = []
): Promise<string> {
  const response: PageInterface[] = await db
    .table('pages')
    .insert({ title, ordering, owner_id, study_pack_id }, ['id']);
  if (response[0].id) {
    return response[0].id;
  }

  throw new Error('Theere was an error creating the page');
}

async function getPage(id: string): Promise<PageInterface> {
  const response: PageInterface[] = await db.table('pages').select('*').where('id', id);

  if (response.length) {
    return response[0];
  }
  throw new Error('The page you are looking for does not exist!');
}

async function updatePage({
  page_id,
  ordering
}: {
  page_id: string;
  ordering?: string[];
}): Promise<number> {
  if (!page_id) throw new Error('You must specify a page Id');
  const response: number = await db('pages').update({ ordering }).where('id', page_id);
  return response;
}

async function getPages() {
  const response: PageInterface[] = await db('pages').select();
  return response;
}

async function getPageByStudyPackId(study_pack_id: string) {
  const response: PageInterface[] = await db.table('pages').select('*').where({ study_pack_id });
  if (response.length) {
    return response[0];
  }
  throw new Error('Page not found!');
}

async function deletePage({
  page_id,
  owner_id
}: {
  page_id: string;
  owner_id: string;
}): Promise<number> {
  const response: number = await db('pages').delete().where({ owner_id, id: page_id });
  return response;
}

export default {
  createPage,
  getPage,
  updatePage,
  getPages,
  getPageByStudyPackId,
  deletePage
};
