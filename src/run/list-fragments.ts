import fs from "fs";
import path from "path";

export async function listFragments(directory: string) {
  return new Promise<{ [id: string]: string }>((resolve, reject) => {
    fs.readdir(directory, (error, files) => {
      if (error) {
        console.error(error);
        reject(error);
      }

      const entryPoints: { [id: string]: string } = {};

      files.forEach((file) => {
        const fullPath = path.join(directory, file);

        const stats = fs.statSync(fullPath);

        if (stats.isFile()) {
          entryPoints[path.basename(fullPath).replace(/\.[^.]*$/, "")] =
            fullPath;
        }

        if (stats.isDirectory()) {
          console.error("Directory unsopported: ", fullPath);
          return;
        }

        return;
      });

      resolve(entryPoints);
    });
  });
}
