import express, { ErrorRequestHandler } from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { ErrorHandler, sendError } from "./utils";
import {
  authRouter,
  bindersRouter,
  blocksRouter,
  commonBaseUrl,
  decksRouter,
  flashcardsRouter,
  foldersRouter,
  pagesRouter,
  studySetsRouter,
  usersRouter,
} from "./routes";
import { fileTreeRouter } from "./routes/fileTree";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(cors());

const { APP_ENV } = config;

// Routes which handle requests
app.use(`${commonBaseUrl}/auth`, authRouter);
app.use(`${commonBaseUrl}/users`, usersRouter);
app.use(`${commonBaseUrl}/file-tree`, fileTreeRouter);
app.use(`${commonBaseUrl}/folders`, foldersRouter);
app.use(`${commonBaseUrl}/binders`, bindersRouter);
app.use(`${commonBaseUrl}/study-sets`, studySetsRouter);
app.use(`${commonBaseUrl}/pages`, pagesRouter);
app.use(`${commonBaseUrl}/blocks`, blocksRouter);
app.use(`${commonBaseUrl}/flashcards`, flashcardsRouter);
app.use(`${commonBaseUrl}/decks`, decksRouter);

app.all("*", (req, _, next) => {
  next(
    new ErrorHandler(
      404,
      `The route '${req.originalUrl}' does not exist on this server!`
    )
  );
});

const errorHandlingMiddleWare: ErrorRequestHandler = (
  err: ErrorHandler,
  _,
  res,
  __
) => {
  err.status = err.status || 500;
  sendError(err, res);
};

app.use(errorHandlingMiddleWare);

app.listen(5000, () =>
  console.log(
    `${
      APP_ENV.charAt(0).toUpperCase() + APP_ENV.slice(1)
    } server is up and running on port 5000  🚀`
  )
);

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  process.exit(1);
});
