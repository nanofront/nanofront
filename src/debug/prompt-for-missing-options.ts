import inquirer, { QuestionCollection } from "inquirer";

import type { DebugOptions } from "./types";

// default values for unspecified args
const defaultOptions: DebugOptions = {
  foo: false,
  port: 3030,
  debug: false,
};

export async function promptForMissingOptions(
  options: DebugOptions
): Promise<DebugOptions> {

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
    port: options.port || answers.port,
    debug: options.debug || answers.debug,
  };
}
