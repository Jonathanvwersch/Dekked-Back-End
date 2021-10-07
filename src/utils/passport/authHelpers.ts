import { compareSync } from "bcryptjs";

export function comparePass(userPassword: string, databasePassword: string) {
  return compareSync(userPassword, databasePassword);
}

export function getUserIdFromRequest(req: any): string {
  return req.user.id;
}
