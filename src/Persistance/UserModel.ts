import { UserInterface } from "../types";
import db from "../db/database";

export async function getUserById(id: string): Promise<UserInterface> {
  const user: UserInterface = await db.table("users").where({ id }).first();
  delete user.password;

  return user;
}

export async function getUserByEmail(
  email_address: string
): Promise<UserInterface> {
  const user: UserInterface = await db
    .table("users")
    .where({ email_address })
    .first();
  delete user.password;

  return user;
}

export async function getUserByResetPasswordToken(
  reset_password_token: string
): Promise<UserInterface> {
  const user: UserInterface = await db
    .table("users")
    .where({ reset_password_token })
    .first();
  delete user.password;

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
  delete users[0].password;

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
    let recentlyVisited = user?.recently_visited;
    if (!recentlyVisited) {
      recentlyVisited = [];
    }
    recentlyVisited?.unshift(recently_visited);
    if (recentlyVisited.length > 6) {
      recentlyVisited.pop();
    }
    returningUser = await db("users")
      .update({ recently_visited: recentlyVisited })
      .where({ id })
      .returning("*");
    console.log(returningUser);
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

  delete returningUser[0].password;
  return returningUser[0] as UserInterface;
}
