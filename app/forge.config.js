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
        devContentSecurityPolicy: "connect-src 'self' https://monitoring.eu-central-1.amazonaws.com/ 'unsafe-eval'",
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
