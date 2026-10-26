/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, Plugin } from "vite";
import { fileURLToPath, URL } from "node:url";
import { readFileSync } from "node:fs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(
    mode,
    fileURLToPath(new URL(".", import.meta.url)),
    "VITE_",
  );
  const { version } = JSON.parse(
    readFileSync(new URL("./package.json", import.meta.url), "utf8"),
  ) as { version: string };
  const configuredSiteUrl = env.VITE_SITE_URL?.trim();
  const siteUrl = configuredSiteUrl ? new URL(configuredSiteUrl) : undefined;
  if (
    siteUrl &&
    (!/^https?:$/.test(siteUrl.protocol) ||
      siteUrl.username ||
      siteUrl.password ||
      siteUrl.search ||
      siteUrl.hash)
  ) {
    throw new Error(
      "VITE_SITE_URL must be an absolute HTTP(S) application URL without credentials, query, or fragment.",
    );
  }
  if (siteUrl && !siteUrl.pathname.endsWith("/")) siteUrl.pathname += "/";
  const socialMetadata: Plugin = {
    name: "imedica-social-metadata",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        if (!siteUrl) return html;
        const image = new URL(
          "branding/social-card.png",
          siteUrl,
        ).href.replaceAll("&", "&amp;");
        return {
          html: html.replace(
            /(<meta\s+(?:property="og:image"|name="twitter:image")\s+content=")[^"]*(")/g,
            (_match, prefix: string, suffix: string) =>
              `${prefix}${image}${suffix}`,
          ),
          tags: [
            {
              tag: "meta",
              attrs: { property: "og:url", content: siteUrl.href },
            },
            { tag: "link", attrs: { rel: "canonical", href: siteUrl.href } },
          ],
        };
      },
    },
  };
  return {
    base: mode === "production" ? "/imedica-login/" : "/",
    plugins: [
      react(),
      socialMetadata,
      ...(env.VITE_LEGACY_BUILD === "true" ? [legacy()] : []),
    ],
    resolve: {
      alias: {
        "@public": fileURLToPath(new URL("./public", import.meta.url)),
        "@src": fileURLToPath(new URL("./src", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
    },
    define: {
      "process.env": {},
      __APP_VERSION__: JSON.stringify(version),
    },
    build: {
      target: "es2020",
      sourcemap: false,
      minify: "esbuild",
      reportCompressedSize: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules\/(react|react-dom|scheduler)\//.test(id))
              return "react-runtime";
          },
        },
      },
    },
  };
});
