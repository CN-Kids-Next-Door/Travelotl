const express = require('express');
const path = require('path');

const setupMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'client')));
  app.use(express.urlencoded({ extended: true }));
};

const startServer = (app, PORT, HOST) => {
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}.`);
  });
};

module.exports = { setupMiddlewares, startServer };