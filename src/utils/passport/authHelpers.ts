import { compareSync } from "bcryptjs";
import express from "express";

export function comparePass(userPassword: string, databasePassword: string) {
  return compareSync(userPassword, databasePassword);
}

export function getUserIdFromRequest(req: express.Request): string {
  // @ts-ignore
  return req.user.id;
}
