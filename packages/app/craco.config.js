const CracoEsbuildPlugin = require("craco-esbuild");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildLoaderOptions: {
          loader: "tsx",
          target: "esnext",
        },
        esbuildMinimizerOptions: {
          target: "esnext",
          css: true,
        },
        skipEsbuildJest: true, // Optional. Set to true if you want to use babel for jest tests,
      },
    },
  ],
  webpack: {
    configure: (webpackConfig) => {
      // Ensure the rules array exists
      webpackConfig.module.rules = webpackConfig.module.rules || [];

      // Update the .mjs handling rule
      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        rule => !(rule.test && rule.test.toString() === '/\\.mjs$/')
      );
      webpackConfig.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/babel-eslint/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-nullish-coalescing-operator',
            ],
          },
        },
      });

      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }]
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-private-methods"
            ]
          }
        }
      });

      // Add rpc-websockets to the list of modules to be transpiled
      const modulesToTranspile = [
        // ... existing modules ...
        /node_modules\/rpc-websockets/,
        /node_modules\/.pnpm\/rpc-websockets/,
      ];

      // Update the existing rule for transpiling specific modules
      const babelLoaderRule = webpackConfig.module.rules.find(
        rule => rule.use && rule.use.loader === "babel-loader"
      );
      if (babelLoaderRule) {
        babelLoaderRule.include = Array.isArray(babelLoaderRule.include)
          ? babelLoaderRule.include.concat(modulesToTranspile)
          : [babelLoaderRule.include].concat(modulesToTranspile);
      }

      // Handle .mjs files
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });

      // Use esbuild-loader for JS and TS files excluding node_modules
      webpackConfig.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "esbuild-loader",
          options: {
            loader: "tsx",
            target: "esnext",
          },
        },
      });

      // Extend resolved extensions
      webpackConfig.resolve.extensions = webpackConfig.resolve.extensions || [];
      webpackConfig.resolve.extensions.push(".mjs", ".ts", ".tsx");

      // Add necessary aliases (if any)
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        // Add aliases here if needed
      };

      // Add Babel loader for specific node_modules that need transpilation
      webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: [



          /node_modules\/@solana\/web3\.js/,
          /node_modules\/@noble\/curves/,
          /node_modules\/@metaplex-foundation/,
          /node_modules\/@google\/model-viewer/,
          /node_modules\/@strata-foundation/,
          /node_modules\/@solana\/wallet-adapter-react/,
          /node_modules\/@metamask\/rpc-errors/,
          /node_modules\/@solana\/.+/,
          /node_modules\/.pnpm\/@solana\/.+/,
          /node_modules\/@noble\/curves/,
          /node_modules\/.pnpm\/@noble\/curves/,
          /node_modules\/@metaplex-foundation/,
          /node_modules\/@google\/model-viewer/,
          /node_modules\/@toruslabs/,
          /node_modules\/micro-ftch/,
          /node_modules\/.pnpm\/@toruslabs/,
          /node_modules\/.pnpm\/micro-ftch/,
          /node_modules\/@strata-foundation/,
          /node_modules\/.pnpm\/@strata-foundation/,
          /node_modules\/.pnpm\/@strata-foundation\/spl-utils/,
          /node_modules\/.pnpm\/@solana\/web3\.js/,
          /node_modules\/.pnpm\/@noble\/curves/,
          /node_modules\/rpc-websockets/,
          /node_modules\/.pnpm\/rpc-websockets/,
          /node_modules\/.pnpm\/@metaplex-foundation/,
          /node_modules\/.pnpm\/@google\/model-viewer/,
          /node_modules\/.pnpm\/@strata-foundation/,
          /node_modules\/superstruct/,
          /node_modules\/.pnpm\/@strata-foundation\+spl.*/,
          /node_modules\/.pnpm\/superstruct/,
          /node_modules\/.pnpm\/@ethereumjs/,

          // Include other modules as needed
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: { browsers: "last 2 versions" } }],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-nullish-coalescing-operator",
              "@babel/plugin-proposal-logical-assignment-operators",
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-object-rest-spread",
            ],
          },
        },
      });

      // Remove duplicate rules (optional cleanup)
      const uniqueRules = [];
      webpackConfig.module.rules.forEach((rule) => {
        if (
          !uniqueRules.some(
            (existingRule) =>
              existingRule.test &&
              rule.test &&
              existingRule.test.toString() === rule.test.toString() &&
              existingRule.include &&
              rule.include &&
              existingRule.include.toString() === rule.include.toString()
          )
        ) {
          uniqueRules.push(rule);
        }
      });
      // Remove unnecessary aliases to prevent conflicts
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        // Only add aliases if absolutely necessary
        "@metaplex-foundation/umi-signer-wallet-adapters": path.resolve(__dirname, "./node_modules/@metaplex-foundation/umi-signer-wallet-adapters/dist/cjs/index.cjs"),
        "@metaplex-foundation/umi/serializers": path.resolve(__dirname, "./node_modules/@metaplex-foundation/umi/dist/cjs/serializers.cjs"),
        "@metaplex-foundation/umi": path.resolve(__dirname, "./node_modules/@metaplex-foundation/umi/dist/cjs/index.cjs"), 
        "@metaplex-foundation/umi-bundle-defaults": path.resolve(__dirname, "./node_modules/@metaplex-foundation/umi-bundle-defaults/dist/cjs/index.cjs"),
        "@metaplex-foundation/umi-web3js-adapters": path.resolve(__dirname, "./node_modules/@metaplex-foundation/umi-web3js-adapters/dist/cjs/index.cjs"),
        "@metaplex-foundation/umi-uploader-irys": path.resolve(__dirname, "./node_modules/@metaplex-foundation/umi-uploader-irys/dist/cjs/index.cjs"),
        "@metaplex-foundation/umi-rpc-chunk-get-accounts": path.resolve(__dirname, "./node_modules/@metaplex-foundation/umi-rpc-chunk-get-accounts/dist/cjs/index.cjs"),
      };
      webpackConfig.module.rules = uniqueRules;

      // Add specific rule for @strata-foundation/spl-token-collective
      webpackConfig.module.rules.push({
        test: /\.js$/,
        include: /node_modules\/.pnpm\/@strata-foundation\+spl-token-collective/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-private-methods',
            ],
          },
        },
      });

      return webpackConfig;
    },
  },
  eslint: {
    enable: false,
  },
  typescript: {
    enableTypeChecking: false
  },
};
