import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser, launchOptions) => {
        if (browser.family === "chromium" && browser.isHeadless) {
          launchOptions.args.push("--window-size=1600,1200");
        }
        return launchOptions;
      });
      return config;
    },
  },
});
