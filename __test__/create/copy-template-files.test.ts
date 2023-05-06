import path from "path";
import fs from "fs";

import { copyTemplateFiles } from "../../src/create/copy-template-files";

describe("createProject", () => {
  const templateDirectory = path.join(__dirname, "../../templates/mf-fragment");
  const targetDirectory = `${process.cwd()}/tempTestDir`;

  // Eliminar el proyecto temporal después de la prueba
  afterAll(() => {
    fs.rmSync(targetDirectory, { recursive: true, force: true });
  });

  test("debe crear un nuevo proyecto", async () => {
    const result = await copyTemplateFiles(templateDirectory, targetDirectory);

    // Comprueba si la función devuelve un vacío
    expect(result).toBeFalsy();
  });
});
