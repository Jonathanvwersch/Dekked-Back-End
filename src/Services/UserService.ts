import { getUserById, updateUser } from "../Persistance/UserModel";
import { config } from "../config";
import sgMail from "@sendgrid/mail";
import { UserInterface } from "../types";

const {
  SENDGRID_API_KEY,
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
  APP_ENV,
} = config;

async function getUserByIdAsync(userId: string): Promise<UserInterface> {
  return await getUserById(userId);
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
};
