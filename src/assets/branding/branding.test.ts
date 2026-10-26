import { readFileSync } from "node:fs";
import sharp from "sharp";
import { describe, expect, it } from "vitest";

const publicDirectory = new URL("../../../public/", import.meta.url);
const manifest = JSON.parse(
  readFileSync(new URL("manifest.json", publicDirectory), "utf8"),
) as {
  name: string;
  icons: Array<{ src: string; sizes: string; type: string; purpose: string }>;
};

describe("published branding assets", () => {
  it("provides real PNGs matching every manifest declaration", async () => {
    expect(manifest.name).toContain("iMedica");
    for (const icon of manifest.icons) {
      const png = readFileSync(new URL(icon.src, publicDirectory));
      const metadata = await sharp(png).metadata();
      expect(metadata.format).toBe("png");
      expect(`${metadata.width}x${metadata.height}`).toBe(icon.sizes);
      if (icon.purpose === "maskable") expect(metadata.hasAlpha).toBe(false);
    }
  });
  it.each([
    ["favicon-16.png", 16, 16],
    ["favicon-32.png", 32, 32],
    ["apple-touch-icon.png", 180, 180],
    ["social-card.png", 1200, 630],
  ])("ships %s at its declared dimensions", async (name, width, height) => {
    const metadata = await sharp(
      readFileSync(new URL(`branding/${name}`, publicDirectory)),
    ).metadata();
    expect(metadata.width).toBe(width);
    expect(metadata.height).toBe(height);
  });
});
