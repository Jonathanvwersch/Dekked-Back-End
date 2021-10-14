import express, { NextFunction } from "express";
import { config } from "../../config";
const { APP_ENV } = config;

export class ErrorHandler extends Error {
  public status: number;
  public readonly isOperational: boolean;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const catchAsync = (fn: any) => (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => Promise.resolve(fn(req, res, next).catch(next));

export const missingParams = (
  responseBody: { [key: string]: string },
  requiredFields: string[]
) => {
  const missingFields: string[] = [];

  requiredFields.forEach((field) => {
    if (!responseBody[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length) {
    const errorMessage =
      missingFields.length > 1
        ? "The following fields are missing:"
        : "The following field is missing:";

    throw new ErrorHandler(400, `${errorMessage} ${missingFields.join(", ")}`);
  }
};

const sendErrorDev = (err: ErrorHandler, res: express.Response) => {
  const now = new Date();

  res.status(err.status).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
    timeStamp: now,
  });
};

const sendErrorProd = (err: ErrorHandler, res: express.Response) => {
  if (err.isOperational) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error: ", err);
    res.status(500).json({
      status: 500,
      message:
        "Something went wrong. If problem persists, contact support at team@dekked.com.",
    });
  }
};

export const sendError = (err: ErrorHandler, res: express.Response) => {
  if (APP_ENV === "production") {
    sendErrorProd(err, res);
  } else {
    sendErrorDev(err, res);
  }
};

export default {
  ErrorHandler,
  catchAsync,
};
