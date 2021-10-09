import { StudySetInterface, UserInterface } from "../types";
import db from "../db/database";

export async function getUserById(id: string): Promise<UserInterface> {
  return await db.table("users").where({ id }).first();
}

export async function getUserByEmail(
  email_address: string
): Promise<UserInterface> {
  const user: UserInterface = await db
    .table("users")
    .where({ email_address })
    .first();

  return user;
}

export async function getUserByResetPasswordToken(
  reset_password_token: string
): Promise<UserInterface> {
  const user: UserInterface = await db
    .table("users")
    .where({ reset_password_token })
    .first();

  return user;
}

export async function createNewUser(
  email_address: string,
  first_name: string,
  last_name: string,
  password?: string
): Promise<UserInterface> {
  const now = new Date();
  const users = await db
    .table("users")
    .insert({
      email_address,
      first_name,
      last_name,
      password,
      date_created: now,
      date_modified: now,
    })
    .returning("*");

  return users[0];
}

export async function updateUser({
  id,
  first_name,
  last_name,
  email_address,
  password,
  reset_password_token,
}: {
  id: string;
  first_name?: string;
  last_name?: string;
  email_address?: string;
  password?: string;
  reset_password_token?: string;
}): Promise<string> {
  const now = new Date();
  const studySet: StudySetInterface[] = await db
    .table("users")
    .update({
      email_address,
      first_name,
      last_name,
      date_modified: now,
      password,
      reset_password_token,
    })
    .where({ id })
    .returning("*");

  return studySet[0]?.id;
}
