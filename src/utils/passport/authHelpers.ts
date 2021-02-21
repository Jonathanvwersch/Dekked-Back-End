import { compareSync } from 'bcryptjs';
import express from 'express';

export function comparePass(userPassword: string, databasePassword: string) {
  return compareSync(userPassword, databasePassword);
}

export function getUserIdFromRequest(req: any) {
  const userId: string = req.user._id;
  return userId;
}
