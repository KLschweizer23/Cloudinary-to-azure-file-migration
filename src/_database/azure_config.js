const { BlobServiceClient } = require('@azure/storage-blob');
require('dotenv/config');

const connectionString = process.env.connectionString;
const containerName = process.env.containerName;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const containerClient = blobServiceClient.getContainerClient(containerName);

module.exports = containerClient;