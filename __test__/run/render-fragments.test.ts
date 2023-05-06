import { renderFragment } from "../../src/run/render-fragment";
import path from "path";
import fs from "fs";

describe("renderFragment", () => {
  const fragmentName = "testFragment";
  const fragmentPath = path.join(__dirname, "TestFragment.tsx");
  const props = { testProp: "testValue" };

  // Crear el archivo TestFragment.tsx temporal antes de la prueba
  beforeAll(() => {
    const testFragmentContent = `
    export const SSR = (ssrProps: any) => "<div>h1>{props.text}</h1><p>{props.testProp}</p></div>";
    `;

    fs.writeFileSync(fragmentPath, testFragmentContent);
  });

  // Eliminar el archivo TestFragment.tsx temporal después de la prueba
  afterAll(() => {
    fs.unlinkSync(fragmentPath);
  });

  test("debe renderizar un fragmento con las propiedades proporcionadas", async () => {
    const html = await renderFragment(fragmentName, fragmentPath, props);

    // Comprueba si la función devuelve una cadena no vacía
    expect(html).toBeTruthy();

    // Comprueba si el ID del div y el nombre del fragmento coinciden
    expect(html).toContain(`<div id="${fragmentName}">`);

    // Comprueba si las propiedades del fragmento están presentes en el script
    const propsBuf = Buffer.from(JSON.stringify({ text: "Demo", ...props }));
    const nameFormatted = fragmentName
      .replace(/-/g, "_")
      .replace(/([A-Z])/g, "_$1")
      .toUpperCase();
    expect(html).toContain(
      `${nameFormatted}_PROPS = "${propsBuf.toString("base64")}"`
    );
  });
});
