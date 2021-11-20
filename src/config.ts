require("dotenv").config();

type ConfigType = {
  APP_ENV: string;
  DB_CONNECTION: string;
  CLIENT: string;
  GOOGLE_CLIENT_ID: string;
  SENDGRID_API_KEY: string;
  RESET_PASSWORD_SECRET_KEY: string;
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID: string;
  AUTHENTICATION_SECRET_KEY: string;
  AWS_IMAGES_BUCKET_NAME: string;
  AWS_IMAGES_BUCKET_REGION: string;
  AWS_IMAGES_ACCESS_KEY: string;
  AWS_IMAGES_SECRET_ACCESS_KEY: string;
};

export const config: ConfigType = {
  APP_ENV: process.env.APP_ENV!,
  DB_CONNECTION:
    process.env.APP_ENV === "production"
      ? process.env.PRODUCTION_DB_CONNECTION!
      : process.env.DB_CONNECTION!,
  CLIENT: process.env.CLIENT!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY!,
  RESET_PASSWORD_SECRET_KEY: process.env.RESET_PASSWORD_SECRET_KEY!,
  SENDGRID_RESET_PASSWORD_TEMPLATE_ID: process.env
    .SENDGRID_RESET_PASSWORD_TEMPLATE_ID!,
  AUTHENTICATION_SECRET_KEY: process.env.AUTHENTICATION_SECRET_KEY!,
  AWS_IMAGES_BUCKET_NAME: process.env.AWS_IMAGES_BUCKET_NAME!,
  AWS_IMAGES_BUCKET_REGION: process.env.AWS_IMAGES_BUCKET_REGION!,
  AWS_IMAGES_ACCESS_KEY: process.env.AWS_IMAGES_ACCESS_KEY!,
  AWS_IMAGES_SECRET_ACCESS_KEY: process.env.AWS_IMAGES_SECRET_ACCESS_KEY!,
};
