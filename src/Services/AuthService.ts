import { genSaltSync, hashSync } from 'bcryptjs';
import { createNewUser, getUserByEmail } from '../Persistance/UserModel';
import jwt from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';

export function comparePass(userPassword: string, databasePassword: string) {
  return compareSync(userPassword, databasePassword);
}

function genToken(user: UserInterface) {
  const token = jwt.sign({ email_address: user.email_address }, 'testing123', {
    expiresIn: 10000000
  });

  return token;
}

export async function login(email_address: string, password: string) {
  try {
    const user = await getUserByEmail(email_address);
    if (!user) {
      return {
        success: false,
        code: 404,
        message: 'Incorrect email'
      };
    }

    if (!comparePass(password, user.password)) {
      return {
        success: false,
        code: 401,
        message: 'Incorrect password'
      };
    }

    const token = genToken(user);

    return {
      success: true,
      data: {
        token,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id
      }
    };
  } catch (err) {
    return {
      success: false,
      code: 500,
      message: 'Internal server error'
    };
  }
}

export async function createUser(
  first_name: string,
  last_name: string,
  email_address: string,
  password: string
) {
  try {
    const foundUser = await getUserByEmail(email_address);

    if (foundUser) {
      return {
        success: false,
        code: 400,
        message: 'Email is already in use'
      };
    }
    const salt = genSaltSync();
    const hash = hashSync(password, salt);

    const user = await createNewUser(email_address, first_name, last_name, hash);
    const token = genToken(user);

    return {
      success: true,
      data: {
        token,
        first_name: user.first_name,
        last_name: user.last_name,
        id: user.id
      }
    };
  } catch (err) {
    return {
      success: false,
      message: err,
      code: 500
    };
  }
}
