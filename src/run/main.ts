import express from "express";
import cors from "cors";
import chalk from "chalk";
import Listr from "listr";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import type { Args } from "../types";

import { parseArgumentsIntoOptions } from "./parse-arguments-into-options";
import { promptForMissingOptions } from "./prompt-for-missing-options";
import { listFragments } from "./list-fragments";
import { startFragment } from "./start-fragment";

const app = express();

export async function runProject(optionsArg: Args) {
  const rawOptions = parseArgumentsIntoOptions(optionsArg);
  const options = await promptForMissingOptions(rawOptions);

  const targetDirectory = process.cwd();
  console.log("targetDirectory: ", targetDirectory);

  const currentFileUrl = decodeURI(fileURLToPath(import.meta.url));
  console.log("currentFileUrl: ", currentFileUrl);

  const fragments = await listFragments(
    path.join(targetDirectory, "src", "fragments")
  );

  const server = runServer(fragments);

  const tasks = new Listr([
    // TODO: agregar la ejecución de cada función aqui
    {
      title: "Running",
      task: () => {},
      enabled: () => options.foo,
    },
  ]);

  try {
    await tasks.run();

    console.log("%s Project run", chalk.green.bold("DONE"));
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"));
  }
  return server;
}

const runServer = (fragments: { [id: string]: string }) => {
  // TODO: Relocate this function
  const PORT = 3030;

  app._router?.stack?.forEach((middleware: any, index: any) => {
    if (middleware.route) {
      app._router.stack.splice(index, 1);
    }
  });

  app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200,
    })
  );

  let router: any = undefined;
  // this should be the only thing on your app
  app.use(function (req, res, next) {
    // this needs to be a function to hook on whatever the current router is
    router(req, res, next);
  });

  const defineStuff = () => {
    router = express.Router();

    // define everything on _router_, not _app_
    for (const fragKey in fragments) {
      const fragValue = fragments[fragKey];
      console.log(fragKey + ": " + fragValue);
      router.use(`/${fragKey}`, startFragment(fragKey, fragValue));
    }

    router.use(`/public`, express.static(path.join(process.cwd(), "out")));
  };

  defineStuff();

  const server = app.listen(PORT, () =>
    console.log(`MFF listening on port ${PORT}!`)
  );

  // server.on("close", () => {
  //   console.log("closing server");
  //   delete app._router.map.get;
  //   app._router.map.get = [];
  //   console.log("removed routes");
  // });
  return defineStuff;
};
