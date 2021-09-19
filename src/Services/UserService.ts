import { getUserById, updateUser } from "../Persistance/UserModel";
import { config } from "../config";
import sgMail from "@sendgrid/mail";
import { UserInterface } from "../types";

const {
  SENDGRID_API_KEY,
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
  APP_ENV,
} = config;

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

  const getResetPasswordLink = () => {
    if (APP_ENV === "production")
      return `https://www.app.dekked.com/reset-password/${token}`;
    else if (APP_ENV === "integration")
      return `https://www.integration.dekked.com/reset-password/${token}`;
    else if (APP_ENV === "staging")
      return `https://www.staging.dekked.com/reset-password/${token}`;
    return `http://localhost:3000/reset-password/${token}`;
  };

  const msg = {
    to: user.email_address,
    from: "team@dekked.com",
    templateId: SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
    dynamic_template_data: {
      subject: "Reset your password",
      resetPasswordLink: getResetPasswordLink(),
    },
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
