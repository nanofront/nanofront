import chalk from "chalk";
import Listr from "listr";
import path, { join, resolve } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import type { Args } from "../types";

import { parseArgumentsIntoOptions } from "./parse-arguments-into-options";
import { promptForMissingOptions } from "./prompt-for-missing-options";
// import createServer from "./server";
import build from "./build-with-esbuild";
import { createTemp } from "./create-temp";
import { addCodeSupport } from "./add-code-support";
import { removeTemp } from "./remove-temp";

export async function buildProject(optionsArg: Args) {
  const rawOptions = parseArgumentsIntoOptions(optionsArg);
  const options = await promptForMissingOptions(rawOptions);

  const targetDirectory = process.cwd();
  console.log("targetDirectory: ", targetDirectory);
  const targetSubDir = resolve(targetDirectory, "temp-build");

  const currentFileUrl = decodeURI(fileURLToPath(import.meta.url));
  console.log("currentFileUrl: ", currentFileUrl);

  console.log("before createTemp");
  await createTemp(targetDirectory, targetSubDir);
  console.log("createTemp");
  const entryPoints = await addCodeSupport(
    join(targetSubDir, "src", "fragments")
  );
  await build(entryPoints);

  removeTemp(targetSubDir);

  const tasks = new Listr([
    {
      title: "Initialize git",
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
