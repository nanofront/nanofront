import chalk from "chalk";
import Listr from "listr";
import { join, resolve } from "path";
import { fileURLToPath } from "url";

import type { Args } from "../types";
import { parseArgumentsIntoOptions } from "./parse-arguments-into-options";
import { build } from "./build-with-esbuild";
import { createTemp } from "./create-temp";
import { addCodeSupport } from "./add-code-support";
import { removeDir } from "./remove-dir";

export async function buildProject(optionsArg: Args) {
  const options = parseArgumentsIntoOptions(optionsArg);

  const targetDirectory = process.cwd();
  console.log("targetDirectory: ", targetDirectory);
  const targetSubDir = resolve(targetDirectory, "temp-build");

  const currentFileUrl = decodeURI(fileURLToPath(import.meta.url));
  console.log("currentFileUrl: ", currentFileUrl);

  console.log("before createTemp");
  await createTemp(targetDirectory, targetSubDir);
  console.log("createTemp");
  const fragEntryPoints = await addCodeSupport(
    join(targetSubDir, "src", "fragments")
  );
  const PagEntryPoints = await addCodeSupport(
    join(targetSubDir, "src", "pages")
  );

  const entryPoints = [...fragEntryPoints, ...PagEntryPoints];
  
  removeDir(resolve(targetDirectory, "out"));
  await build(entryPoints);
  removeDir(targetSubDir);

  const tasks = new Listr([ // TODO: agregar la ejecución de cada función aqui
    {
      title: "Foo",
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
