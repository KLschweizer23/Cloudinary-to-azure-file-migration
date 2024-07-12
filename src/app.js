const express = require('express');
const cors = require('cors');

const databaseRouters = require('./router/database_router');
const fileRouters = require('./router/file_router');

const app = express();

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static('public'));
app.use(cors());

app.use('/database', databaseRouters);
app.use('/file', fileRouters);

module.exports = app;