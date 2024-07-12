const express = require('express');

const fileRouters = express.Router();

const migrateSingleImageController = require('../controller/file-controller/migrate_single_image_controller');
const migrateSingleFileController = require('../controller/file-controller/migrate_single_file_controller');

fileRouters.post('/migrate-single-image', migrateSingleImageController);
fileRouters.post('/migrate-single-file', migrateSingleFileController);

module.exports = fileRouters;