const path = require('path');
const { version } = require('./package');

const sections = require('./styleguide/sections');

module.exports = {
  title: 'CoVende UI - Docs',
  assetsDir: './docs/assets',
  theme: './styleguide/theme.js',
  styles: './styleguide/styles.js',
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    return `import { ${name} } from '@/common/components';`;
  },
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/components/StyleGuideWrapper'),
    LogoRenderer: path.join(__dirname, 'styleguide/components/Logo')
    // StyleGuideRenderer: path.join(
    //   __dirname,
    //   'styleguide/components/StyleGuideWrapper2'
    // ),
    // SectionsRenderer: path.join(
    //   __dirname,
    //   'styleguide/components/SectionsRenderer'
    // ),
  },
  previewDelay: 1200,
  pagePerSection: true,
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/index.{js,jsx,ts,tsx}',
    '**/theme.{js,jsx,ts,tsx}',
    '**/_styles.{js,jsx,ts,tsx}',
    '**/*.styles.{js,jsx,ts,tsx}',
    '**/StyleGuideWrapper.js'
  ],
  sections,
  defaultExample: true,
  usageMode: 'expand',
  version,
  // configureServer(app) {
  //   app.get('/ui-components', (req, res) => {
  //     res.status(200).send({response: 'Server invocado'});
  //   });
  // },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          loader: 'url-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.js', 'jsx', '.ts', '.tsx', '.json']
    }
  }
};
