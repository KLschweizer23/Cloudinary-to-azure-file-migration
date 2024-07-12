const { Pool, PoolConfig } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv/config');

const localDatabase = {
    user: process.env.user2 || '',
    password: process.env.password2 || '',
    database: process.env.database2 || '',
    host: process.env.host2 || 'localhost',
    port: parseInt(process.env.db_port || '5432')
}

const ssl = process.env.ssl2 || '';
if (ssl != '') {
    localDatabase.ssl = {
        ca: fs.readFileSync(path.join(__dirname, `../../${ssl}`))
    }
}

const pool2 = new Pool(localDatabase);

module.exports = pool2;