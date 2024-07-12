const { Pool, PoolConfig } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv/config');

const localDatabase = {
    user: process.env.user || '',
    password: process.env.password || '',
    database: process.env.database || '',
    host: process.env.host || 'localhost',
    port: parseInt(process.env.db_port || '5432')
}

const ssl = process.env.ssl || '';
if (ssl != '') {
    localDatabase.ssl = {
        ca: fs.readFileSync(path.join(__dirname, `../../${ssl}`))
    }
}

const pool = new Pool(localDatabase);

module.exports = pool;