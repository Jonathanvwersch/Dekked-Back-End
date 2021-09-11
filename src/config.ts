type ConfigType = {
  API_ENV: string;
  DB_CONNECTION: string;
  CLIENT: string;
  GOOGLE_CLIENT_ID: string;
};

export const config: ConfigType = {
  API_ENV: process.env.APP_ENV!,
  DB_CONNECTION: process.env.DB_CONNECTION!,
  CLIENT: process.env.CLIENT!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
};
