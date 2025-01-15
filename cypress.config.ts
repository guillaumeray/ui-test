import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,

  e2e: {
    chromeWebSecurity: false,
    testIsolation: false,
    retries: 1,
    specPattern: 'cypress/e2e/*.cy.ts',

    setupNodeEvents(on, config) { 
      on('task', {
        // log message in console
        log(message) {
          console.log(message); // Logs the message to the terminal
          return null; // Return null to avoid test failures
        },
      });
      on("before:browser:launch", (browser, launchOptions) => {
        if (["chrome", "edge"].includes(browser.name)) {
          if (browser.isHeadless) {
            launchOptions.args.push("--no-sandbox");
            launchOptions.args.push("--disable-gl-drawing-for-tests");
            launchOptions.args.push("--disable-gpu");
          }
          launchOptions.args.push("--js-flags=--max-old-space-size=3500");
        }
        return launchOptions;
      });
    },
  },
});
