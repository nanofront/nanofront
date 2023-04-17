import { resolve } from "path";
// import PersonalInfoForm from "src/fragments/PersonalInfoForm/fragment";

export const renderFragment = async (
  fragmentName: string,
  fragmentPath: string,
  props: {},
  podlets?: { name: string; html: string }[]
) => {
  console.log("renderFragment");
  const nameFormatted = fragmentName
    .replace(/-/g, "_")

    .replace(/([A-Z])/g, "_$1")
    .toUpperCase();

  console.log("process.cwd(): " + process.cwd());
  console.log("fragmentPath: " + fragmentPath);
  const fullPath = resolve(process.cwd(), fragmentPath);
  console.log("fullPath: " + fullPath);

  const { SSR } = await import(fullPath);
  console.log(SSR);

  // TODO: Execute server side logic

  const FRAGMENT_PROPS = {
    text: "Demo",
    ...props,
    podlets,
  };

  const html = SSR(FRAGMENT_PROPS);
  console.log(html);

  const propsBuf = Buffer.from(JSON.stringify(FRAGMENT_PROPS));
  console.log("propsBuf: " + propsBuf.toString("base64"));
  const asd = `
  <script>
    ${nameFormatted}_PROPS = "${propsBuf.toString("base64")}";
  </script>
  <div id="${fragmentName}">${html}</div>
`;
  console.log(asd);

  return `
      <script>
        ${nameFormatted}_PROPS = "${propsBuf.toString("base64")}";
      </script>
      <div id="${fragmentName}">${html}</div>
    `;
};
