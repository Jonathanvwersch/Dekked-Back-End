import { UserInterface } from '../types';
import db from '../db/database';

export async function getUserById(id: string) {
  try {
    const user: UserInterface = await db.table('users').where({ id }).first();
    return user;
  } catch (err) {
    throw err;
  }
}

export async function getUserByEmail(email_address: string) {
  try {
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

export async function updateUser({
  id,
  first_name,
  last_name,
  email_address
}: {
  id: string;
  first_name?: string;
  last_name?: string;
  email_address?: string;
}) {
  try {
    await db.table('users').update({ email_address, first_name, last_name }).where({ id });
  } catch (error) {
    console.log(error);
    throw new Error('Error updating user');
  }
}
