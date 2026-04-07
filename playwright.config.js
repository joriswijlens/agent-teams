const { defineConfig } = require('@playwright/test');

const port = process.env.PLAYWRIGHT_PORT || 4173;

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: `http://localhost:${port}`,
  },
  webServer: {
    command: `PORT=${port} npm start`,
    port: Number(port),
    reuseExistingServer: false,
  },
});
