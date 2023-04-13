import fs from "fs";
import path from "path";
import express from "express";
import Podlet from "@podium/podlet";
import { glob } from "glob";
import { createHash } from "crypto";
import { templateView } from "./debug-view";
import { renderFragment } from "./render-fragment";

const IS_DEVELOPMENT = true;

export function startFragment(fragmentName: string, fragmentPath: string) {
  console.log("startFragment");
  const jsonManifest = JSON.parse(fs.readFileSync("out/manifest.json", "utf8")); // TODO: Improve the manifest to include CSS
  const builtFragment =
    jsonManifest[`temp-build/src/fragments/client/${fragmentName}.jsx`]; // TODO: Resolve with Path

  const hash = createHash("sha256");
  hash.update(builtFragment);
  const buildHash = hash.digest("hex");

  const podlet = new Podlet({
    name: fragmentName, // Example: teamludus__eccomerce__cart
    version: buildHash,
    pathname: "/",
    manifest: "/manifest.json",
    content: "/",
    fallback: "/fallback",
    development: IS_DEVELOPMENT,
  });

  podlet.defaults({
    text: "Hello world",
  });

  podlet.view(templateView);

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

  if (IS_DEVELOPMENT) {
    // TODO: Make CSS and JS customizable from developer
    podlet.css([
      {
        value: `https://d1uanze3ra4w37.cloudfront.net/presets/olive.css`,
        ...cssSalt,
      },
    ]);
  }

  glob(path.join("out", "client", "entry-client-index-*.css")).then((files) => {
    // TODO: Improve this, I dont like this lib
    if (files.length === 1) {
      const filepathCSS = files[0];
      console.log(filepathCSS);
      podlet.css([
        {
          value:
            "http://localhost:3030" + filepathCSS.replace("out", "/public"),
          ...cssSalt,
        },
      ]);
    }
  });

  podlet.js({
    value: builtFragment.replace("out", "/public"),
    ...jsSalt,
  });

  const router = express.Router();

  router.use(podlet.middleware());

  router.get(podlet.content(), async (req, res, next) => {
    try {
      console.log("podlet.content()");
      const { text } = res.locals.podium.context;
      console.log("text: ", text);
      const html = await renderFragment(fragmentName, builtFragment, text);
      res.status(200).podiumSend(html);
    } catch (err) {
      next(err);
    }
  });

  router.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
  });

  router.get(podlet.fallback(), (req, res) => {
    res
      .status(200)
      .podiumSend(`<div>Fragment ${fragmentName} is not working</div>`);
  });

  //   router.use(sessionErrorsMiddleware); TODO: Implement middlewares support
  return router;
}
