import { PageInterface } from "../types";
import db from "../db/database";

async function createPage(
  study_set_id: string,
  owner_id: string | undefined,
  ordering = []
): Promise<PageInterface> {
  const now = new Date();

  const response: PageInterface[] = await db.table("pages").insert(
    {
      ordering,
      owner_id,
      study_set_id,
      date_created: now,
      date_modified: now,
    },
    ["id"]
  );

  return response[0];
}

async function getPage(id: string, owner_id: string): Promise<PageInterface> {
  const response: PageInterface[] = await db
    .table("pages")
    .select("*")
    .where({ id, owner_id })
    .returning("*");

  return response[0];
}

async function updatePage({
  page_id,
  ordering,
  owner_id,
}: {
  page_id: string;
  ordering?: string[];
  owner_id?: string;
}): Promise<PageInterface> {
  const now = new Date();

  const response: PageInterface[] = await db("pages")
    .update({ ordering, date_modified: now })
    .where({ id: page_id, owner_id })
    .returning("*");

  return response[0];
}

async function getPages(ownerId: string) {
  const response: PageInterface[] = await db("pages")
    .select()
    .where({ owner_id: ownerId });
  return response;
}

async function getPageByStudySetId(study_set_id: string, owner_id: string) {
  const response: PageInterface[] = await db
    .table("pages")
    .select("*")
    .where({ study_set_id, owner_id });

  return response[0];
}

async function deletePage({
  page_id,
  owner_id,
}: {
  page_id: string;
  owner_id: string;
}): Promise<number> {
  const response: number = await db("pages")
    .delete()
    .where({ owner_id, id: page_id });
  return response;
}

export default {
  createPage,
  getPage,
  updatePage,
  getPages,
  getPageByStudySetId,
  deletePage,
};
