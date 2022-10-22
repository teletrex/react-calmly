const path = require('path');
const { DefinePlugin, BannerPlugin } = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { getHeader } = require('./config/copyright');
const configureProxy = require('./setupProxy');
const { version } = require('./package.json');

dotenv.config();


const PUBLIC_PATH = '/dist/'; //process.env.PUBLIC_PATH || '';
const WEBPACK_PUBLIC_PATH = PUBLIC_PATH ? `/${PUBLIC_PATH}/` : '/';
const WEBPACK_OPEN_PAGE = PUBLIC_PATH ? `${PUBLIC_PATH}/` : '';

const { OKTA_CLIENT_ID, OKTA_AUTHORIZATION_SERVER, CUSTOMER_API_URL } = process.env;


const commonPlugins = isModule => [
  new MiniCssExtractPlugin({
    filename: isModule ? '[name].css' : '[name].[hash].css',
  }),
  new BannerPlugin({
    banner: ({ filename }) => `${getHeader(filename)}\nv${version}`,
  }),
];

const commonConfig = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.[s]?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '*'],
    alias: {
      cldr: 'cldrjs/dist/cldr',
    },
  },
  output: {
    path: path.resolve(__dirname, 'build', 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  plugins: commonPlugins,
};

module.exports = () => {
  // const moduleConfig = {
  //   ...commonConfig,
  //   name: 'module',
  //   entry: { index: path.resolve(__dirname, 'src/index.js') },
  //   plugins: [...commonPlugins(true), new PeerDepsExternalsPlugin()],
  // };


  const applicationConfig = {
    ...commonConfig,
    stats: 'verbose',
    name: 'application',
    entry: { main: path.resolve(__dirname, 'src/index.js') },
//    entry: [
//      'webpack-dev-server/client?http://0.0.0.0:3000',
//      'webpack/hot/only-dev-server',
//      path.resolve(__dirname, 'src/index.js')
//    ],

    plugins: [
      ...commonPlugins(),
      new HtmlWebpackPlugin({
        favicon: path.resolve(__dirname, 'src/favicon-32x32.png'),
        template: path.resolve(__dirname, 'src/index.html'),
        title: 'React Calmly UI Library',
        base: WEBPACK_PUBLIC_PATH,
//        inject:false

      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets',
          to: 'assets',
        },
      ]),
    ],
    devServer: {
      clientLogLevel: 'silent',
      port: 4200,
      open: true,
      historyApiFallback: {
        index: WEBPACK_PUBLIC_PATH,
      },
      hot: true,
//      liveReload:false,
      before: configureProxy,
      openPage: WEBPACK_OPEN_PAGE,
      publicPath: WEBPACK_PUBLIC_PATH,
    },
    output: {
      ...commonConfig.output,
      filename: '[name].[hash].js',
//      publicPath: WEBPACK_PUBLIC_PATH,
    },
    externals: {
      // Use external version of React
      "react": "react",
      "react-dom": "react-dom",
    },
  };

  // return [applicationConfig, moduleConfig];
  return [applicationConfig];
};
