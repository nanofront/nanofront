import express from "express";
import cors from "cors";
import chalk from "chalk";
import Listr from "listr";
import path from "path";
import { fileURLToPath } from "url";

import type { Args } from "../types";

import { parseArgumentsIntoOptions } from "./parse-arguments-into-options";
import { listFragments } from "./list-fragments";
import { startFragment } from "./start-fragment";
import { startPage } from "./start-page";
import { RunOptions } from "./types";

const app = express();

export async function runProject(optionsArg: Args) {
  const options = parseArgumentsIntoOptions(optionsArg);

  const targetDirectory = process.cwd();
  console.log("targetDirectory: ", targetDirectory);

  const currentFileUrl = decodeURI(fileURLToPath(import.meta.url));
  console.log("currentFileUrl: ", currentFileUrl);

  const fragments = await listFragments(
    path.join(targetDirectory, "src", "fragments")
  );

  const pages = await listFragments(path.join(targetDirectory, "src", "pages"));

  const server = runServer(fragments, pages, options);

  const tasks = new Listr([
    // TODO: agregar la ejecución de cada función aqui
    {
      title: "Foo",
      task: () => {},
      enabled: () => options.debug,
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

type Dictionary = { [id: string]: string }; // TODO: Convert all { [id: string]: string } in this type
// TODO: Relocate this function
const runServer = (
  fragments: Dictionary,
  pages: Dictionary,
  options: RunOptions
) => {
  const PORT = options.port;

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
  app.use(function (req, res, next) {
    router(req, res, next);
  });

  // TODO: This is for allowing the restart of the server, find a better way
  const defineStuff = () => {
    router = express.Router();

    for (const fragKey in fragments) {
      console.log("Fragments");
      const fragValue = fragments[fragKey];
      console.log(fragKey + ": " + fragValue);
      router.use(`/${fragKey}`, startFragment(fragKey, fragValue, options));
    }

    for (const pagKey in pages) {
      console.log("Pages");
      const pagValue = pages[pagKey];
      console.log(pagKey + ": " + pagValue);
      router.use(`/${pagKey}`, startPage(pagKey, pagValue, options));
    }

    router.use(`/`, express.static(path.join(process.cwd(), "out"))); // TODO: Fix assets routes
  };

  defineStuff();

  const server = app.listen(PORT, () =>
    console.log(`Microfrontends listening on port ${PORT}!`)
  );

  return defineStuff;
};
