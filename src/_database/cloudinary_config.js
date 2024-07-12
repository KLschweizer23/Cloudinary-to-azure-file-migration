const { v2 } = require('cloudinary');
require('dotenv/config');

v2.config({
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret 
})

module.exports = v2;