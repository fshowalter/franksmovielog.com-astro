#! /usr/bin/env node

import fs from "node:fs";
import path from "node:path";

import chokidar from "chokidar";

chokidar
  .watch(["../movielog/reviews", "../movielog/export", "../movielog/viewings"])
  .on("all", (event, sourcePath) => {
    if (event === "add" || event === "change") {
      console.log(event, sourcePath);

      let dest;
      const name = sourcePath.replace(
        /..\/movielog\/(export|reviews|viewings)\//,
        "",
      );

      if (/\/reviews\//.test(sourcePath)) {
        dest = `${import.meta.dirname}/content/reviews/${name}`;
      }

      if (/\/viewings\//.test(sourcePath)) {
        dest = `${import.meta.dirname}/content/viewings/${name}`;
      }

      if (/\/export\//.test(sourcePath)) {
        dest = `${import.meta.dirname}/content/data/${name}`;

        const destPath = path.parse(dest).dir;

        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath);
        }
      }

      if (dest) {
        fs.copyFileSync(sourcePath, dest);
      }
    }
  });
