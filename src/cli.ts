import { buildProject } from "./build/main";
import { createProject } from "./create/main";
import { debugProject } from "./debug/main";
import { runProject } from "./run/main";
import packageJson from "../package.json";

import type { Args } from "./types";

export async function cli(args: Args) {
  const [command, ...optionsArg] = args;
  switch (command) {
    case "create":
      await createProject(optionsArg);
      break;
    case "debug":
      console.log("debug");
      await debugProject(optionsArg);
      break;
    case "build":
      console.log("build");
      buildProject(optionsArg);
      break;
    case "run":
      console.log("run");
      runProject(optionsArg);
      break;
    case "-v":
    case "--version":
      console.log("Nanofragmet CLI v" + packageJson.version);
      break;
    default:
      console.log("Command not found");
  }
}
