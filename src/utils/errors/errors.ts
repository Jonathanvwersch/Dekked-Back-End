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

export const catchAsync = (
  fn: (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => Promise<express.Response<any>>
) => {
  return (req: express.Request, res: express.Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export const missingParams = (params: { [key: string]: string }) => {
  const paramKeys = Object.keys(params);
  const isParamMissing = Object.keys(params).some((param) => {
    return !params?.[param];
  });

  let paramKeysAsStrings = "";
  paramKeys.forEach((key, index) => {
    const addCommaAndSpace = index + 1 === paramKeys.length ? false : true;
    paramKeysAsStrings += `${key}${addCommaAndSpace ? ", " : ""}`;
  });

  if (isParamMissing) {
    throw new ErrorHandler(
      400,
      `One or more of the following fields is missing: ${paramKeys}`
    );
  }
};

const sendErrorDev = (err: ErrorHandler, res: express.Response) => {
  res.status(err.status).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
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
  res.status(err.status).json({
    status: err.status,
    message: err.message,
  });
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
