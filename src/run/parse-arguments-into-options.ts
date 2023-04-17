import arg from "arg";

import type { Args } from "../types";
import type { RunOptions } from "./types";

export function parseArgumentsIntoOptions(rawArgs: Args): RunOptions {
  const options = {
    "--foo": Boolean,
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
    foo: !!args["--foo"],
    port: args["--port"] || 3030,
    debug: !!args["--debug"],
  };
}
