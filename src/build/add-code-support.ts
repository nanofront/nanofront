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
              `entry-client-${path.basename(fullPath)}`
            );
            fs.writeFileSync(
              entryPointName,
              `import ReactDOM from "react-dom";
            import NanoFragment from "../${file}";
            
            ReactDOM.hydrate(<NanoFragment />, document.getElementById("${path
              .basename(fullPath)
              .replace(/\.[^.]*$/, "")}"));
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
