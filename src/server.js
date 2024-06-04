require('@babel/register');

const express = require('express');
const React = require('react');
const ReactDomServer = require('react-dom/server');

const App = require('./App').default;

const fs = require('fs');
const app = express();
const port = process.env.PORT || 9000;

app.use(express.static('./build'));

const createReactApp = async (location) => {
  try {
    const reactApp = ReactDomServer.renderToString(
      React.createElement(App, { location })
    );

    const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8');

    const reactHtml = html.replace(
      '<div id="app"></div>',
      `<div id="app">${reactApp}</div>`
    );
    return reactHtml;
  } catch (error) {
    console.log(error);
  }
};

app.get('*', async (req, res) => {
  const indexHtml = await createReactApp(req.url);
  res.status(200).send(indexHtml);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
