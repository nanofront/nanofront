import fs from "fs";
import path from "path";

export async function addCodeSupport(directory: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(directory, (error, files) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      const entryPoints = files
        .map((file) => {
          const fullPath = path.join(directory, file);

          const stats = fs.statSync(fullPath);

          if (stats.isFile()) {
            const clientDir = path.resolve(directory, "client");
            if (!fs.existsSync(clientDir)) {
              fs.mkdirSync(clientDir);
            }

            const entryPointName = path.join(
              clientDir,
              path.basename(fullPath)
            );

            const fragmentName = path
              .basename(fullPath)
              .replace(/\.[^.]*$/, "");

            const nameFormatted = fragmentName
              .replace(/-/g, "_")
              .replace(/([A-Z])/g, "_$1")
              .toUpperCase();

            fs.writeFileSync( // TODO: Improve with the use of nunjucks lib
              entryPointName,
              `import { hydrateRoot } from 'react-dom/client';
            import { renderToString } from "react-dom/server";
            import NanoFragment from "../${file}";

            if (typeof window !== 'undefined') {
              // @ts-ignore
              const props = ${nameFormatted}_PROPS;
              hydrateRoot(document.getElementById("${fragmentName}"), <NanoFragment props={props} />);
            }

            export const SSR = (ssrProps) => renderToString(<NanoFragment props={ssrProps} />);
            `
            );
            console.log("asd");
            return entryPointName;
          }

          if (stats.isDirectory()) {
            console.error("Directory unsopported: ", fullPath);
            return null;
          }

          return null;
        })
        .filter((entry) => entry !== null) as string[];

      resolve(entryPoints);
    });
  });
}
