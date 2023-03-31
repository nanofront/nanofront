#! /usr/bin/env node
import { cli } from "../dist/cli.js";

console.log(process.argv);

cli(process.argv.slice(2));
