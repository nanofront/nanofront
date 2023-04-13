import fs from "fs";

export function removeDir(dirPath: string) {
  if (fs.existsSync(dirPath)) fs.rmSync(dirPath, { recursive: true });
}
