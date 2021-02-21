import db from './database';

declare global {
  interface BinderInterface {
    id: string;
    owner_id: string;
    folder_id: string;
    name: string;
    color: string;
  }
}

export async function createBinder(
  folder_id: string,
  name: string,
  owner_id: string,
  color: string
) {
  try {
    const binder: BinderInterface[] = await db
      .table('binders')
      .insert({ folder_id, name, owner_id, color }, ['*']);
    console.log(binder);
    return binder[0];
  } catch (err) {
    console.log(err);
    throw new Error('There was an error creating binder');
  }
}

export async function getBindersByUserId(user_id: string) {
  console.log(user_id);
  try {
    const binder: BinderInterface[] = await db
      .table('binders')
      .select('*')
      .where({ owner_id: user_id });
    return binder;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting binders by user id');
  }
}

export async function getBinderById(id: string) {
  try {
    const binder: BinderInterface | undefined = await db
      .table('binders')
      .select('*')
      .where({ id })
      .first();
    return binder;
  } catch (err) {
    console.log(err);
    throw Error('Error getting binder by id');
  }
}
