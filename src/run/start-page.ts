import fs from "fs";
import path from "path";
import express from "express";
import Layout from "@podium/layout";
import { glob } from "glob";
import { templateView } from "./debug-view";
import { renderFragment } from "./render-fragment";
import { RegisterOptions } from "@podium/client";
import { RunOptions } from "./types";

export function startPage(
  pageName: string,
  pagePath: string,
  options: RunOptions
) {
  console.log("startPage");
  const jsonManifest = JSON.parse(fs.readFileSync("out/manifest.json", "utf8")); // TODO: Improve the manifest to include CSS
  const builtPage = jsonManifest[`temp-build/src/pages/client/${pageName}.jsx`]; // TODO: Resolve with Path
  console.log("builtPage: " + builtPage);

  const layout = new Layout({
    name: `${pageName}Layout`,
    pathname: `/${pageName}`,
  });

  layout.view(templateView);

  const nanofragments = fs.readFileSync("nanofragments.json", "utf-8");
  const podConfs = JSON.parse(nanofragments) as RegisterOptions[];
  const podClients = podConfs.map((podConf) => layout.client.register(podConf));

  const cssSalt = {
    media: "screen",
    toHTML: () => "",
    as: "",
    crossOrigin: "",
    disabled: false,
    hreflang: "",
    rel: "stylesheet",
    title: "",
    type: "",
  };

  const jsSalt = {
    type: "module",
    toHTML: () => "",
    async: false,
    defer: false,
    integrity: "",
    crossOrigin: "",
    noModule: false,
    referrerPolicy: "",
  };

  glob(
    path.join("out", "pages", "client", `entry-client-${pageName}-*.css`)
  ).then((files) => {
    // TODO: Improve this, I dont like this lib
    if (files.length === 1) {
      const filepathCSS = files[0];
      console.log(filepathCSS);
      layout.css([
        {
          value: `http://localhost:${options.port}${filepathCSS.replace(
            "out",
            ""
          )}`,
          ...cssSalt,
        },
      ]);
    }
  });

  layout.js({
    value: `http://localhost:${options.port}${builtPage.replace("out", "")}`,
    ...jsSalt,
  });

  const router = express.Router();

  router.use(layout.middleware());

  // console.log("layout.pathname(): " + layout.pathname());
  router.get("/", async (req, res, next) => {
    try {
      console.log("layout.pathname(): " + layout.pathname());
      const incoming = res.locals.podium;

      const podletsResponse = await Promise.all(
        podClients.map((podClient) => podClient.fetch(incoming))
      );
      incoming.podlets = podletsResponse;

      const enrichedPodlet = podletsResponse.map((podRes, i) => ({
        name: podClients[i].name,
        html: podRes.content,
      }));
      enrichedPodlet.forEach((pod) => console.log({ pod }));
      console.log("allCSS: " + incoming.css);
      console.log("allJS: " + incoming.js);

      incoming.view = {
        title: pageName,
        encoding: "utf-8",
      };

      const html = await renderFragment(
        pageName,
        builtPage,
        {},
        enrichedPodlet
      );
      res.status(200).podiumSend(html);
    } catch (err) {
      next(err);
    }
  });

  //   router.use(sessionErrorsMiddleware); TODO: Implement middlewares support
  return router;
}
