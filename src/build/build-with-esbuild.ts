import * as esbuild from "esbuild";

const build = async (entryPoints: string[]) => {
  const result = await esbuild.build({
    entryPoints: entryPoints,
    entryNames: "[dir]/[name]-[hash]",
    // stdin: {
    //   // contents: `export * from "./another-file"`,

    //   // These are all optional:
    //   resolveDir: "./src",
    //   sourcefile: "support/entry-client.jsx",
    //   // loader: "ts",
    // },
    bundle: true,
    // banner: {
    //   js: '//comment',
    //   css: '/*comment*/',
    // },
    splitting: true,
    format: "esm",
    minify: false,
    sourcemap: true,
    loader: { ".png": "dataurl", ".svg": "file" },
    //   target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    color: true,
    outdir: "out",
  });
};

export default build;
