import { UserInterface } from "../types";
import db from "../db/database";
import Knex from "knex";

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
  recently_visited,
}: {
  id: string;
  first_name?: string;
  last_name?: string;
  email_address?: string;
  password?: string;
  reset_password_token?: string;
  recently_visited?: string;
}): Promise<UserInterface> {
  const now = new Date();
  let returningUser: UserInterface[];

  if (recently_visited) {
    const user = await getUserById(id);
    const recentlyVisited = user?.recently_visited;
    recentlyVisited?.unshift(recently_visited);
    if (recentlyVisited && recentlyVisited.length > 6) {
      recentlyVisited.pop();
    }
    returningUser = await db("users")
      .update({ recently_visited: recentlyVisited })
      .where({ id })
      .returning("*");
  } else {
    returningUser = await db("users")
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
  }

  return returningUser[0] as UserInterface;
}

export async function updateRecentlyVisited({
  id,
  recently_visited,
}: {
  id: string;
  recently_visited?: string[];
}): Promise<UserInterface> {
  const users: UserInterface[] = await db
    .table("users")
    .update({
      recently_visited,
    })
    .where({ id })
    .returning("*");

  return users[0];
}
