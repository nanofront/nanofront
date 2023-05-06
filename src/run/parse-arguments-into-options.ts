import arg from "arg";

import type { Args } from "../types";
import type { RunOptions } from "./types";

export function parseArgumentsIntoOptions(rawArgs: Args): RunOptions {
  const options = {
    "--port": Number,
    "--debug": Boolean,
    "-f": "--foo",
    "-d": "--debug",
    "-p": "--port",
  };

  const args = arg(options, {
    argv: rawArgs,
    permissive: false,
  });

  return {
    port: args["--port"] || 3030,
    debug: !!args["--debug"],
  };
}
