/** @type {import("snowpack").SnowpackUserConfig}*/
module.exports = {
  mount: {
    "src/html": "/",
    "src/js": "/renexmoe_assets/js",
    "src/css": "/renexmoe_assets/css",
    //"./package.json":"/renexmoe_assets/package.json",
  },
  plugins: [
    [
      "@snowpack/plugin-optimize",
      {
        minifyJS: true,
        minifyCSS: true,
        minifyHTML: false,
        preloadModules: false,
        preloadCSS: true,
        preloadCSSFileName: "css/app.css",
        //target: ["chrome49"]
      },
    ],
    [
      "@snowpack/plugin-webpack",
      {
        sourceMap: false,
        htmlMinifierOptions: false,
        manifest: true,
        extendConfig: (config) => {
          config.optimization.usedExports = true;
          config.optimization.splitChunks = {
            chunks: "async",
            minSize: 100000,
            maxSize: 300000,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: "@",
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              },
            },
          };
          return config;
        },
      },
    ],
  ],
};