import { getUserById, updateUser } from "../Persistance/UserModel";

async function getUserByIdAsync(userId: string) {
  try {
    const user = await getUserById(userId);
    return {
      id: user.id,
      email_address: user.email_address,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  } catch (error) {
    console.log(error);
    throw Error(`There was an error fetching data of user with id: ${userId}`);
  }
}

async function updateUserAsync({
  first_name,
  last_name,
  email_address,
  id,
  password,
}: {
  id: string;
  password: string;
  first_name?: string;
  last_name?: string;
  email_address?: string;
}) {
  try {
    await updateUser({ first_name, last_name, email_address, id, password });
  } catch (error) {
    console.log(error);
    throw Error("There was an error updating user");
  }
}
export default {
  getUserByIdAsync,
  updateUserAsync,
};
