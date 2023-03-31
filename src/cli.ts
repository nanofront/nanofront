import { createProject } from "./create/main";

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
      break;
    case "run":
      console.log("run");
      break;
    default:
      console.log("not command found");
  }
}
