import chalk from "chalk";
import Listr from "listr";
import fs from "fs";
import { fileURLToPath } from "url";

import type { Args } from "../types";

import { parseArgumentsIntoOptions } from "./parse-arguments-into-options";
import { buildProject } from "../build/main";
import { runProject } from "../run/main";

export async function debugProject(optionsArg: Args) {
  const options = parseArgumentsIntoOptions(optionsArg);

  const targetDirectory = process.cwd();
  console.log("targetDirectory: ", targetDirectory);

  const currentFileUrl = decodeURI(fileURLToPath(import.meta.url));
  console.log("currentFileUrl: ", currentFileUrl);

  await buildProject(optionsArg);
  let defineStuff = await runProject(optionsArg);

  fs.watch(
    targetDirectory,
    { recursive: true },
    async (eventType, filename) => {
      if (filename.endsWith(".jsx") && eventType === "change") {
        console.log(`The file ${filename} has changed`);

        console.log("Closed server");

        await buildProject(optionsArg);
        console.log("Built project");

        // server = await runProject(optionsArg, count);
        defineStuff();
        console.log("Run project");
      }
    }
  );

  const tasks = new Listr([
    // TODO: agregar la ejecución de cada función aqui
    {
      title: "Foo",
      task: () => {},
      enabled: () => options.foo,
    },
  ]);

  try {
    await tasks.run();

    console.log("%s Project debug", chalk.green.bold("DONE"));
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"));
  }
}
