import express, { ErrorRequestHandler } from "express";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config";
import { ErrorHandler, sendError } from "./utils";

import {
  authRoute,
  authRouter,
  bindersRoute,
  bindersRouter,
  blockRoute,
  blocksRouter,
  decksRoute,
  decksRouter,
  flashcardsRoute,
  flashcardsRouter,
  foldersRoute,
  foldersRouter,
  pagesRoute,
  pagesRouter,
  studySetsRoute,
  studySetsRouter,
  usersRoute,
  usersRouter,
  fileTreeRoute,
  fileTreeRouter,
} from "./routes";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(compression());

const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "https://www.integration.dekked.com",
    "integration.dekked.com",
    "app.dekked.com",
    "https://www.app.dekked.com",
    "https://integration.dekked.com/",
    "https://app.dekked.com/",
  ],
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://www.integration.dekked.com"
  );
});

const { APP_ENV } = config;

// Routes which handle requests
app.use(authRoute, authRouter);
app.use(usersRoute, usersRouter);
app.use(fileTreeRoute, fileTreeRouter);
app.use(foldersRoute, foldersRouter);
app.use(bindersRoute, bindersRouter);
app.use(studySetsRoute, studySetsRouter);
app.use(pagesRoute, pagesRouter);
app.use(blockRoute, blocksRouter);
app.use(flashcardsRoute, flashcardsRouter);
app.use(decksRoute, decksRouter);

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
