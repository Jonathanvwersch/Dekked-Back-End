import { genSaltSync, hashSync } from "bcryptjs";
import { createNewUser, getUserByEmail } from "../Persistance/UserModel";
import jwt from "jsonwebtoken";
import { compareSync } from "bcryptjs";
import { UserInterface } from "../types";
import { config } from "../config";
import { ErrorHandler } from "../utils";
const { AUTHENTICATION_SECRET_KEY } = config;

export function comparePass(userPassword: string, databasePassword: string) {
  return compareSync(userPassword, databasePassword);
}

export function genToken(user: UserInterface) {
  const token = jwt.sign(
    { email_address: user.email_address },
    AUTHENTICATION_SECRET_KEY,
    {
      expiresIn: "1y",
    }
  );

  return token;
}

export async function login(
  email_address: string,
  password: string
): Promise<UserInterface & { token: string }> {
  const user = await getUserByEmail(email_address);

  if (!user) {
    throw new ErrorHandler(404, "Incorrect username or password");
  }

  if (!comparePass(password, user.password!)) {
    throw new ErrorHandler(401, "Incorrect username or password");
  }

  const token = genToken(user);

  return {
    token,
    first_name: user.first_name,
    last_name: user.last_name,
    email_address: email_address,
    id: user.id,
  };
}

export async function createUser(
  first_name: string,
  last_name: string,
  email_address: string,
  password?: string
): Promise<UserInterface & { token: string }> {
  const salt = genSaltSync();
  const hash = password ? hashSync(password, salt) : undefined;
  const user = await createNewUser(email_address, first_name, last_name, hash);
  const token = genToken(user);

  return {
    token,
    first_name: user.first_name,
    last_name: user.last_name,
    email_address: user.email_address,
    id: user.id,
  };
}
