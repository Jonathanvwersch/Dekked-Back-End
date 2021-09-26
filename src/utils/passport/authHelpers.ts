import { compareSync } from "bcryptjs";

export function comparePass(userPassword: string, databasePassword: string) {
  return compareSync(userPassword, databasePassword);
}

export function getUserIdFromRequest(req: any) {
  const userId: string = req.user.id;
  return userId;
}
