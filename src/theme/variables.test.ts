import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

const stylesheet = readFileSync(
  new URL("./variables.css", import.meta.url),
  "utf8",
);

function colorTokens(selector: RegExp): Record<string, string> {
  const block = stylesheet.match(selector)?.[1] ?? "";
  return Object.fromEntries(
    Array.from(
      block.matchAll(/(--[\w-]+):\s*(#[a-f0-9]{6})\s*;/gi),
      (match) => [match[1], match[2]],
    ),
  );
}

function luminance(hex: string): number {
  const channels = (hex.match(/[a-f0-9]{2}/gi) ?? []).map((channel) => {
    const value = parseInt(channel, 16) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

const light = colorTokens(/:root\s*\{([\s\S]*?)\}/);
const dark = { ...light, ...colorTokens(/:root\.dark\s*\{([\s\S]*?)\}/) };

describe.each([
  ["light", light],
  ["dark", dark],
] as const)("%s theme contrast", (_, tokens) => {
  it.each([
    ["--im-text", "--im-bg"],
    ["--im-muted", "--im-bg"],
    ["--im-muted", "--im-surface"],
    ["--im-muted", "--im-accent-soft"],
    ["--ion-color-primary-contrast", "--im-accent"],
  ])("keeps %s readable on %s", (foreground, background) => {
    const values = [
      luminance(tokens[foreground]),
      luminance(tokens[background]),
    ].sort((first, second) => second - first);
    expect((values[0] + 0.05) / (values[1] + 0.05)).toBeGreaterThanOrEqual(4.5);
  });
});
