import ncp from "ncp";
import { basename } from "path";
import { promisify } from "util";

const copy = promisify(ncp);

export async function createTemp(
  templateDir: string,
  targetDir: string
) {
  return copy(templateDir, targetDir, {
    clobber: false,
    filter: new RegExp(`^(?!.*${basename(targetDir)}).*$`),
  });
}
