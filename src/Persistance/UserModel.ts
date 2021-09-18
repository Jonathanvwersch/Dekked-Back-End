import { UserInterface } from "../types";
import db from "../db/database";

export async function getUserById(id: string) {
  try {
    const user: UserInterface = await db.table("users").where({ id }).first();
    return user;
  } catch (err) {
    throw err;
  }
}

export async function getUserByEmail(email_address: string) {
  try {
    const user: UserInterface = await db
      .table("users")
      .where({ email_address })
      .first();
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getUserByResetPasswordToken(
  reset_password_token: string
) {
  try {
    const user: UserInterface = await db
      .table("users")
      .where({ reset_password_token })
      .first();
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
  password?: string
) {
  const now = new Date();

  try {
    await db.table("users").insert({
      email_address,
      first_name,
      last_name,
      password,
      date_created: now,
      date_modified: now,
    });
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
}) {
  const now = new Date();

  try {
    await db
      .table("users")
      .update({
        email_address,
        first_name,
        last_name,
        date_modified: now,
        password,
        reset_password_token,
      })
      .where({ id });
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user");
  }
}
