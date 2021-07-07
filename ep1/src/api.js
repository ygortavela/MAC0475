const express = require('express');
const cors = require('cors');

const createUserService = require('./service/createUserService');
const deleteUserService = require('./service/deleteUserService');

module.exports = function (corsOptions, context) {
  const api = express();

  api.use(express.json());
  api.use(cors(corsOptions));

  api.get('/', (req, res) => res.json('Hello, World!'));

  api.post('/users', async (req, res) => createUserService(req, res, context));

  api.delete('/users/:uuid', (req, res) => deleteUserService(req, res, context));

  return api;
};
