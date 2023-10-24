const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { DefinePlugin } = require('webpack');
const DotEnvPlugin = require('dotenv');
DotEnvPlugin.config();

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const fileName = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimizationConfig = () => {
  const config = {};

  if (isProd) {
    config.minimize = true;
    config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [require('postcss-preset-env')],
        },
      },
    },
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const createWebpackConfig = () => {
  const config = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: fileName('js'),
    },
    devServer: {
      port: 4200,
      hot: isDev,
      watchFiles: ['src/*.html'],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.html',
        minify: {
          collapseWhitespace: isProd,
        },
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css'),
      }),
      new DefinePlugin({
        'process.env': JSON.stringify(process.env),
      }),
      new CopyPlugin({
        patterns: [{ from: './assets', to: './assets' }],
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: optimizationConfig(),
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: cssLoaders(),
        },
        {
          test: /\.s[ac]ss$/i,
          use: cssLoaders('sass-loader'),
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        { test: /\.(png|jpg|svg|gif)$/i, type: 'asset/resource' },
      ],
    },
  };

  if (isDev) {
    config.devtool = 'source-map';
  }

  return config;
};

module.exports = createWebpackConfig();
