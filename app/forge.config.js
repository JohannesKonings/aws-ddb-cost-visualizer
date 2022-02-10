module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {},
      },
    },
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        devContentSecurityPolicy:
          "connect-src 'self' 'unsafe-eval' https://monitoring.eu-central-1.amazonaws.com/ https://api.pricing.us-east-1.amazonaws.com/ https://ce.us-east-1.amazonaws.com/",
        renderer: {
          nodeIntegration: true,
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.ts',
              name: 'main_window',
            },
          ],
        },
      },
    ],
  ],
};
