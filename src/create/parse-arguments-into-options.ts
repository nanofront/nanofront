import arg from "arg";

import type { Args, RawOptions } from "../types";

export function parseArgumentsIntoOptions(rawArgs: Args): RawOptions {
  const options = {
    "--project-name": String,
    "--git": Boolean,
    "--yes": Boolean,
    "--install": Boolean,
    "-pn": "--project-name",
    "-df": "--data-file",
    "-g": "--git",
    "-y": "--yes",
    "-i": "--install",
  };

  const aliases = {
    create: "create",
    debug: "debug",
  };

  const args = arg(options, {
    argv: rawArgs.slice(2),
    permissive: false,
    stopAtPositional: true,
  });

  return {
    projectName: args["--project-name"],
    git: args["--git"] || false,
    install: args["--install"] || false,
    skipPrompts: args["--yes"] || false,
    template: args._[0],
  };
}
