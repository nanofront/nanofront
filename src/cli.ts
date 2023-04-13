import { buildProject } from "./build/main";
import { createProject } from "./create/main";
import { runProject } from "./run/main";

import type { Args } from "./types";

export async function cli(args: Args) {
  const [command, ...optionsArg] = args;
  switch (command) {
    case "create":
      await createProject(optionsArg);
      break;
    case "debug":
      console.log("debug");
      break;
    case "build":
      console.log("build");
      buildProject(optionsArg);
      break;
    case "run":
      console.log("run");
      runProject(optionsArg);
      break;
    default:
      console.log("not command found");
  }
}
