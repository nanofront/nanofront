import arg from "arg";

import type { Args } from "../types";
import type { BuildOptions } from "./types";

export function parseArgumentsIntoOptions(rawArgs: Args): BuildOptions {
  const options = {
    "--foo": Boolean,
    "-f": "--foo",
  };

  const args = arg(options, {
    argv: rawArgs.slice(2),
    permissive: false,
  });

  return {
    foo: !!args["--foo"],
  };
}
