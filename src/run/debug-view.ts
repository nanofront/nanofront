import { HttpIncoming } from "@podium/utils";

export const templateView = (incoming: HttpIncoming, fragment: string) => `
  <!doctype html>
  <html lang="${incoming.context.locale}">
  <head>
      <meta charset="${incoming.view.encoding}">
      <title>${incoming.view.title}</title>
      ${incoming.css.map((css) => css.toHTML()).join("\n")}
  </head>
  <body>
      ${fragment}
      ${incoming.js.map((js) => js.toHTML()).join("\n")}
  </body>
  </html>
`;
