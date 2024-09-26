const CracoEsbuildPlugin = require("craco-esbuild");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        includePaths: [path.resolve(__dirname, '../../')],
        esbuildLoaderOptions: {
          loader: "tsx",
          target: "esnext",
        },
        esbuildMinimizerOptions: {
          target: "esnext",
          css: true,
        },
        skipEsbuildJest: false,
        esbuildJestOptions: {
          loaders: {
            ".ts": "ts",
            ".tsx": "tsx",
            ".mjs": "ts",
          },
        },
      },
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      // Existing configuration
      webpackConfig.module.rules.push(
        {
          test: /\.mjs$/,        
          exclude: [
            /node_modules\/@emotion\/react/,
            /node_modules\/@emotion\/styled/,
            /node_modules\/@emotion\/use-insertion-effect-with-fallbacks/,
          ],
          include: /node_modules/,
          type: "javascript/auto"
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              plugins: [
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-proposal-nullish-coalescing-operator'
              ]
            }
          },
          exclude: /node_modules/,
        }
      );

      // Modify the resolve configuration
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        extensionAlias: {
          '.js': ['.js', '.ts'],
          '.mjs': ['.mjs', '.mts'],
          '.cjs': ['.cjs', '.cts'],
        },
        fallback: {
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify"),
          "assert": require.resolve("assert"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "os": require.resolve("os-browserify"),
          "url": require.resolve("url"),
          "path": require.resolve("path-browserify"),
          "zlib": require.resolve("browserify-zlib"),
          "util": require.resolve("util"),
          "buffer": require.resolve("buffer"),
          "assert": require.resolve("assert/"),
          "process": require.resolve("process/browser"),
          "fs": false,
        },
        alias: {
          ...webpackConfig.resolve.alias,
          "@strata-foundation/react": path.resolve(
            "./node_modules/strata-foundation-react-2"
          ),
          "@strata-foundation/marketplace-ui": path.resolve(
            "./node_modules/strata-foundation-marketplace-ui-2"
          ),
          "@strata-foundation/spl-token-bonding": path.resolve(
            "./node_modules/strata-foundation-spl-token-bonding-2"
          ),
          "@strata-foundation/spl-token-collective": path.resolve(
            "./node_modules/strata-foundation-spl-token-collective-2"
          ),
          "@strata-foundation/spl-utils": path.resolve(
            "./node_modules/trata-foundation-spl-utils-2"
          ),
          "strata-foundation-marketplace-ui-2": path.resolve(
            "./node_modules/strata-foundation-marketplace-ui-2"
          ),
          "strata-foundation-react-2": path.resolve(
            "./node_modules/strata-foundation-react-2"
          ),
          "strata-foundation-spl-token-bonding-2": path.resolve(
            "./node_modules/strata-foundation-spl-token-bonding-2"
          ),
          "trata-foundation-spl-utils-2": path.resolve(
            "./node_modules/trata-foundation-spl-utils-2"
          ),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      };

      // Allow importing from outside src/ directory
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => plugin.constructor.name !== 'ModuleScopePlugin'
      );

      return webpackConfig;
    },
  },
};