import fs from "fs";

export function removeTemp(dirPath: string) {
  fs.rmdirSync(dirPath, { recursive: true });
}
