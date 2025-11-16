// scripts/generate-mui-icons-16.mjs
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import sharp from "sharp";
import * as Icons from "@mui/icons-material";

// __dirname for ESM
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, "../src/assets/mui-16px");
const ICON_SIZE = 128;

await fs.promises.mkdir(OUTPUT_DIR, { recursive: true });

function sanitizeSvg(rawSvg) {
  let svg = rawSvg;

  // 1) Remove all <style>...</style> blocks (Emotion/MUI)
  svg = svg.replace(/<style[\s\S]*?<\/style>/g, "");

  // 2) Keep only the first <svg>...</svg> block
  const match = svg.match(/<svg[\s\S]*?<\/svg>/);
  if (!match) {
    throw new Error("No <svg> root element found");
  }
  svg = match[0];

  // 3) Ensure SVG namespace
  if (!/xmlns=/.test(svg)) {
    svg = svg.replace(
      /<svg([^>]*)>/,
      '<svg$1 xmlns="http://www.w3.org/2000/svg">'
    );
  }

  // 4) Ensure xlink namespace if needed (for TwoTone icons using xlink:href)
  if (svg.includes("xlink:") && !/xmlns:xlink=/.test(svg)) {
    svg = svg.replace(
      /<svg([^>]*)>/,
      '<svg$1 xmlns:xlink="http://www.w3.org/1999/xlink">'
    );
  }

  return svg;
}

async function generateIcons() {
  const entries = Object.entries(Icons);
  console.log(`Found ${entries.length} exports in @mui/icons-material`);

  for (const [name, IconComponent] of entries) {
    if (name === "__esModule") continue;

    const outputPath = path.join(OUTPUT_DIR, `${name}.png`);

    if (fs.existsSync(outputPath)) {
      continue;
    }

    // Must be something React can treat as a component type
    if (
      typeof IconComponent !== "function" &&
      (typeof IconComponent !== "object" || IconComponent === null)
    ) {
      console.log(`Skipping ${name} (not a React component type)`);
      continue;
    }

    try {
      const element = React.createElement(IconComponent, {
        fontSize: "inherit",
      });

      const rawSvg = renderToStaticMarkup(element);
      const svg = sanitizeSvg(rawSvg);
      const svgBuffer = Buffer.from(svg, "utf8");

      await sharp(svgBuffer)
        .resize(ICON_SIZE, ICON_SIZE, {
          fit: "contain",
          kernel: sharp.kernel.nearest,
        })
        .png({
          compressionLevel: 9,
          palette: true,
        })
        .toFile(outputPath);
    } catch (err) {
      console.error(`Failed for ${name}:`, err.message);
    }
  }

  console.log("Done generating MUI 16px icons.");
}

generateIcons().catch((err) => {
  console.error(err);
  process.exit(1);
});
