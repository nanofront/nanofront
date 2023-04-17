import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/cli.ts",
    output: {
      name: "cli",
      dir: "dist",
      format: "es",
    },
    plugins: [
      peerDepsExternal(),
      // resolve(),
      // commonjs(),
      typescript({ tsconfig: "./tsconfig-nontypes.json" }),
      postcss(),
      // terser(),
    ],
  },
  {
    input: "src/tools/index.ts",
    output: [
      {
        file: packageJson.exports["./tools"].require,
        format: "cjs",
        // sourcemap: true,
      },
      {
        file: packageJson.exports["./tools"].import,
        format: "es",
        // sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      json(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss(),
      // terser(),
    ],
  },
  {
    input: "dist/tools/esm/index.d.ts",
    output: [{ file: "dist/tools/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
