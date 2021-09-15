import { getUserById, updateUser } from "../Persistance/UserModel";
import { config } from "../config";
import sgMail from "@sendgrid/mail";
import { UserInterface } from "../types";

const { SENDGRID_API_KEY } = config;

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
  reset_password_token,
}: {
  id: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  email_address?: string;
  reset_password_token?: string;
}) {
  try {
    await updateUser({
      first_name,
      last_name,
      email_address,
      id,
      password,
      reset_password_token,
    });
  } catch (error) {
    console.log(error);
    throw Error("There was an error updating user");
  }
}

export const sendEmail = (user: UserInterface, token: string) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: user.email_address,
    from: "team@dekked.com",
    subject: "Reset password requested",
    html: `
     <a href="https:/dekked.com/reset-password/${token}">${token}</a>
   `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Reset email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  getUserByIdAsync,
  updateUserAsync,
};
