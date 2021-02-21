import db from './database';

declare global {
  interface StudyPackInterface {
    id: string;
    owner_id: string;
    binder_id: string;
    name: string;
    color: string;
  }
}

export async function createStudyPack(
  binder_id: string,
  name: string,
  owner_id: string,
  color: string
) {
  try {
    const study_pack: StudyPackInterface[] = await db
      .table('study_packs')
      .insert({ binder_id, name, owner_id, color }, ['*']);
    console.log(study_pack);
    return study_pack[0];
  } catch (err) {
    console.log(err);
    throw new Error('There was an error creating binder');
  }
}

export async function getStudyPackById(id: string) {
  try {
    const binder: BinderInterface | undefined = await db
      .table('study_packs')
      .select('*')
      .where({ id })
      .first();
    return binder;
  } catch (err) {
    console.log(err);
    throw Error('Error getting study pack by id');
  }
}

export async function getStudyPacksByBinderId(binder_id: string) {
  try {
    const binders: BinderInterface[] = await db
      .table('study_packs')
      .select('*')
      .where({ binder_id });
    return binders;
  } catch (err) {
    console.log(err);
    throw Error('Error getting study pack by binder id');
  }
}

export async function getStudyPacksByUserId(user_id: string) {
  try {
    const binders: StudyPackInterface[] = await db
      .table('study_packs')
      .select('*')
      .where({ owner_id: user_id });
    return binders;
  } catch (err) {
    console.log(err);
    throw Error('Error getting study pack by user id');
  }
}
