import db from './database';
declare global {
  interface UserInterface {
    id: string;
    email_address: string;
    first_name: string;
    last_name: string;
    password: string;
  }
}
export async function getUserById(id: string) {
  try {
    const user: UserInterface = await db.table('users').select({ id }).first();
    return user;
  } catch (err) {
    throw err;
  }
}

export async function getUserByEmail(email_address: string) {
  try {
    console.log(email_address);
    const user: UserInterface = await db.table('users').where({ email_address }).first();
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function createNewUser(
  email_address: string,
  first_name: string,
  last_name: string,
  password: string
) {
  try {
    await db.table('users').insert({ email_address, first_name, last_name, password });
    const user: UserInterface = await getUserByEmail(email_address);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
