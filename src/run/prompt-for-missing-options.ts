import inquirer from "inquirer";

import type { BuildOptions } from "./types";

// default values for unspecified args
const defaultOptions: BuildOptions = {
  foo: false,
};

export async function promptForMissingOptions(
  options: BuildOptions
): Promise<BuildOptions> {
  // if (options.skipPrompts) {
  //   options = { ...options, ...defaultOptions };
  // }

  const questions = [];

  if (options.foo) {
    questions.push({
      type: "confirm",
      name: "foo",
      message: "Foo?",
      default: defaultOptions.foo,
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    foo: options.foo || answers.foo,
  };
}
