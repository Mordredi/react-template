import express from 'express';
import fs from 'fs';
import path from 'path';
import http2 from 'spdy';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './app/App';

const handleRender = (req, res) => {
  const context = {};
  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )

  const manifest = JSON.parse(fs.readFileSync('./dist/webpack-manifest.json', 'utf8'));
  res.send(`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Pendragon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" media="all">
        <base href="/">
        <link rel="manifest" href="manifest.json">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="theme-color" content="#001357">
        <link href="${manifest['vendor.css']}" rel="stylesheet" media="all">
        <link href="${manifest['main.css']}" rel="stylesheet" media="all">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').then(function(registration) {
              console.log('ServiceWorker registration successful with scope: ', registration.scope);
              }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
              }).catch(function(err) {
                console.log(err)
              });
            });
          } else {
            console.log('service worker is not supported');
          }
        </script>
        <script src="${manifest['manifest.js']}"></script>
        <script src="${manifest['vendor.js']}"></script>
        <script src="${manifest['main.js']}"></script>
      </body>
    </html>
  `);
}

const app = express();

app.use('/', express.static(path.join(__dirname, '/')));

app.get('*.js', (req, res, next) => {
  if (req.url === '/sw.js') {
    next();
    return
  }
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

app.get('*', handleRender)

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
};

http2
  .createServer(options, app)
  .listen(3000, () => {
    console.log('server is running on port 3000');
  });
