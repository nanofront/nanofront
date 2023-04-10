import inquirer from "inquirer";

import type { Options, CreateOptions } from "./types";

// default values for unspecified args
const defaultOptions: Options = {
  git: false,
  install: true,
  template: "javascript",
};

// --yes flag is passed
const skipOptions: Omit<Options, "template"> = {
  projectName: "python-ms",
  git: true,
  install: true,
};

export async function promptForMissingOptions(
  options: CreateOptions
): Promise<Options> {
  if (options.skipPrompts) {
    options = { ...options, ...skipOptions };
  }

  const questions = [];

  if (!options.projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Please type your project name",
      validate: (value?: string) => !!value,
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: defaultOptions.git,
    });
  }

  if (!options.install) {
    questions.push({
      type: "confirm",
      name: "install",
      message: "Install packages?",
      default: defaultOptions.install,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    projectName: options.projectName || answers.projectName,
    git: options.git || answers.git,
    install: options.install || answers.install,
    template: options.template || answers.template,
  };
}
