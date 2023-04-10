import chalk from "chalk";
import Listr from "listr";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import { copyTemplateFiles } from "./copy-template-files";
import { initGitRepo } from "./init-git-repo";
import { installPackages } from "./install-packages";

import type { Args } from "../types";
import { parseArgumentsIntoOptions } from "./parse-arguments-into-options";
import { promptForMissingOptions } from "./prompt-for-missing-options";

export async function createProject(optionsArg: Args) {
  const rawOptions = parseArgumentsIntoOptions(optionsArg);
  const options = await promptForMissingOptions(rawOptions);

  const targetDirectory = `${process.cwd()}/${options.projectName}`;
  console.log("targetDirectory: ", targetDirectory);

  const currentFileUrl = import.meta.url;

  const templateDirectory = path.resolve(
    decodeURI(fileURLToPath(currentFileUrl)),
    "../../templates",
    "mf-fragment"
    // options.template.toLowerCase()
  );

  const tasks = new Listr([
    {
      title: "Copy project files",
      task: () => copyTemplateFiles(templateDirectory, targetDirectory),
    },
    {
      title: "Initialize git",
      task: () => initGitRepo(targetDirectory),
      enabled: () => options.git,
    },
    // {
    //   title: "Install dependencies",
    //   task: () => installPackages(targetDirectory),
    //   skip: () => {
    //     if (!options.install) {
    //       return "Pass --install or -i to automatically install dependencies";
    //     }
    //   },
    // },
  ]);

  try {
    await tasks.run();

    console.log("%s Project ready", chalk.green.bold("DONE"));
  } catch (error) {
    console.log("%s Error occurred", chalk.red.bold("ERROR"));
  }
}
