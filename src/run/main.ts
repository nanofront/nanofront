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

  runServer(fragments);

  const tasks = new Listr([
    {
      title: "Running",
      task: () => {},
      enabled: () => options.foo,
    },
  ]);

  try {
    await tasks.run();

    console.log("%s Project built", chalk.green.bold("DONE"));
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"));
  }
}

const runServer = (fragments: { [id: string]: string }) => {
  const PORT = 3030;

  app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200,
    })
  );

  for (const fragKey in fragments) {
    const fragValue = fragments[fragKey];
    console.log(fragKey + ": " + fragValue);
    app.use(`/${fragKey}`, startFragment(fragKey, fragValue));
  }

  app.use(`/public`, express.static(path.join(process.cwd(), "out")));

  app.listen(PORT, () => console.log(`MFF listening on port ${PORT}!`));
};
