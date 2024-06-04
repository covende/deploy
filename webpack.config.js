const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const fs = require('fs');
const dotenv = require('dotenv');

const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = (env, args) => {
  let mode = args.mode || 'development';
  const currentPath = path.join(__dirname);
  const basePath = `${currentPath}/.env`;
  const envPath = `${basePath}.${mode}`;
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  const fileEnv = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  const module = {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/i,
        // use: [MiniCssExtractPlugin.loader, 'css-loader', "style-loader"]
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  };

  const resolve = {
    alias: {
      '@CVTemplate/core': path.resolve(
        __dirname,
        './',
        'src',
        'common',
        'CovendeTemplate'
      ),
      '@CVTemplate/core/*': path.resolve(
        __dirname,
        './',
        'src',
        'common',
        'CovendeTemplate'
      ),
      '@CVApi/core': path.resolve(
        __dirname,
        './',
        'src',
        'app',
        'api',
        'graphql'
      ),
      '@CVApi/core/*': path.resolve(
        __dirname,
        './',
        'src',
        'app',
        'api',
        'graphql'
      ),
      '@CVPages/core': path.resolve(__dirname, './', 'src', 'app', 'main'),
      '@CVPages/core/*': path.resolve(__dirname, './', 'src', 'app', 'main'),
      '@/*': path.resolve(__dirname, './', 'src')
    }
  };

  const config = {
    resolve,
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].covende.js',
      chunkFilename: '[name].chunk.js',
      publicPath: '/'
    },
    module,
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html'),
        favicon: path.join(__dirname, 'src/public', 'Covende.ico'),
        favicon: path.join(__dirname, 'src/public', 'Covende.ico')
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/sitemap.xml', to: 'sitemap.xml' },
          { from: 'src/robots.txt', to: 'robots.txt' }
        ]
      })
    ],
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    watchOptions: {
      stdin: true,
      ignored: [
        path.posix.resolve(__dirname, 'build'),
        path.posix.resolve(__dirname, 'node_modules')
      ]
    },
    devtool: false,
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
      usedExports: true,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 10000,
        maxSize: 250000,
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

  const configServer = {
    entry: path.join(__dirname, 'src', 'server.js'),
    target: 'node',
    externals: [nodeExternals()],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'server.bundle.js'
    },
    module,
    resolve
  };

  if (mode == 'development') {
    config.devServer = {
      compress: true,
      historyApiFallback: true
      // hot: true,
      // port: 9000
    };

    config.mode = 'development';
    configServer.mode = 'development';
  }
  if (mode == 'production') {
    // config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    // config.mode = 'production';
    // configServer.mode = 'production';
  }

  // return config;

  return [config, configServer];
};
