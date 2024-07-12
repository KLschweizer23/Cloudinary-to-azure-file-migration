const express = require('express');

const databaseRouters = express.Router();

const getAllUrlController = require('../controller/database-controller/get_all_url_controller');
const getAllUrlControllerFile = require('../controller/database-controller/get_all_url_controller_file');

databaseRouters.get('/get-all-url', getAllUrlController);
databaseRouters.get('/get-all-url-file', getAllUrlControllerFile);

module.exports = databaseRouters;