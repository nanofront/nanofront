import * as esbuild from "esbuild";
import manifestPlugin from "esbuild-plugin-manifest";

export const build = async (entryPoints: string[]) => {
  const result = await esbuild.build({
    entryPoints: entryPoints,
    entryNames: "[dir]/entry-client-[name]-[hash]",
    chunkNames: "chunks/[name]-[hash]",
    assetNames: "assets/[name]-[hash]",
    bundle: true,
    jsx: "automatic",
    // banner: {
    //   js: '//comment',
    //   css: '/*comment*/',
    // },
    splitting: true,
    format: "esm",
    minify: false,
    sourcemap: true,
    loader: { ".png": "dataurl", ".svg": "file" }, // TODO: Improve the loader, the generated path doesn't work
    // publicPath: '/public',
    // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    color: true,
    outbase: "temp-build/src/fragments",
    outdir: "out",
    plugins: [manifestPlugin()],
  });
};
