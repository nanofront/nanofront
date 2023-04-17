import arg from "arg";

import type { Args } from "../types";
import type { CreateOptions } from "./types";

export function parseArgumentsIntoOptions(rawArgs: Args): CreateOptions {
  const options = {
    "--project-name": String,
    "--git": Boolean,
    "--yes": Boolean,
    "--install": Boolean,
    "-pn": "--project-name",
    "-g": "--git",
    "-y": "--yes",
    "-i": "--install",
  };

  const args = arg(options, {
    argv: rawArgs,
    permissive: false,
    stopAtPositional: false,
  });

  return {
    projectName: args["--project-name"],
    git: args["--git"] || false,
    install: args["--install"] || false,
    skipPrompts: args["--yes"] || false,
    template: args._[0],
  };
}
