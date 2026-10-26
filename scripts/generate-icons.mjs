import { copyFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const source = new URL("../src/assets/branding/", import.meta.url);
const output = new URL("../public/branding/", import.meta.url);
await mkdir(output, { recursive: true });
await copyFile(
  new URL("app-icon.svg", source),
  new URL("app-icon.svg", output),
);

const sizes = [
  ["favicon-16.png", 16],
  ["favicon-32.png", 32],
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
];
await Promise.all(
  sizes.map(([name, size]) =>
    sharp(fileURLToPath(new URL("app-icon.svg", source)))
      .resize(size, size)
      .png()
      .toFile(fileURLToPath(new URL(name, output))),
  ),
);
await sharp(fileURLToPath(new URL("app-icon.svg", source)))
  .flatten({ background: "#087b62" })
  .png()
  .toFile(fileURLToPath(new URL("icon-maskable-512.png", output)));
await sharp(fileURLToPath(new URL("social-card.svg", source)))
  .png()
  .toFile(fileURLToPath(new URL("social-card.png", output)));
console.log(
  "Generated iMedica favicons, app icons, and social preview in public/branding/.",
);
