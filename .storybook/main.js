const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.story.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-knobs", // deprecated, but let's see, yes it works.
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "@storybook/preset-scss",
    "storybook-react-i18next"
  ],
  "framework": "@storybook/react",

  "core": {
    "builder": {
      name: "@storybook/builder-webpack5",
      "options": {
        "fsCache": true,
      },
    }
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.


    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: ['style-loader', 'css-loader', 'postcss-loader','sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: ['file-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(jpg|jpeg|png|gif|ico)$/,
      use: ['file-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.module.rules.push({
      test: /\.md$/,
      use: ['html-loader','markdown-loader']
    });

    config.module.rules =  config.module.rules.filter(rule => {
      if (!rule.use) return true;
      return !rule.use.find(
        useItem => typeof useItem.loader === 'string' && useItem.loader.includes('eslint-loader'),
      );
    });

    // Return the altered config
    return config;
  },
  babel: async (options) => ({
    ...options,
    plugins: [
      ...options.plugins,'@babel/plugin-proposal-export-default-from'
      ]

  // any extra options you want to set
  }),
}
