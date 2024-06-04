const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const dotenv = require('dotenv');
const fs = require('fs');

function exportMainConfig(env, context) {
  const { mode } = context;

  const currentPath = path.join(__dirname);
  const basePath = `${currentPath}/.env`;
  const envPath = `${basePath}.${env.ENVIRONMENT}`;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  const baseConfig = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].covende.js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
              '@babel/react',
              {
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            ]
          }
        },
        {
          test: /\.svg$/,
          use: 'file-loader'
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                mimetype: 'image/png'
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        } /*
        {
          test: /\.css$/,
          loader: [MiniCssExtractPlugin.loader, 'css-loader']
        },*/,
        {
          test: /\.scss$/,
          loader: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      // new CopyPlugin({
      //   patterns: [{from: 'src/robots.txt', to: 'build/robots.txt'}],
      // }),
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        appMountId: 'app',
        template: 'src/index.html',
        favicon: './src/Covende.ico'
      }),
      new LodashModuleReplacementPlugin(),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   openAnalyzer: false,
      // }),
      new MiniCssExtractPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: "[name].css",
      //   chunkFilename: "[id].css"
      // }),
      new CleanWebpackPlugin()
      // new CompressionWebpackPlugin(),
    ],
    optimization: {
      usedExports: true,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace('@', '')}`;
            }
          }
        }
      }
    }
  };

  if (mode === 'development') {
    // Dev
    // baseConfig.devtool = 'inline-source-map';
    baseConfig.devServer = {
      compress: true,
      historyApiFallback: true,
      hot: true,
      port: 9000
    };
  } else {
    // Prod
    baseConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  }

  return baseConfig;
}
module.exports = (env, argv) => {
  const mode = typeof argv.mode === 'undefined' ? 'development' : argv.mode;
  const config = { mode };
  return exportMainConfig(env, config);
};
