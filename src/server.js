const http = require('http');
const appServer = require('./app.js')
const path = require('path');
require('dotenv/config');

const server = http.createServer(appServer);
const PORT = 8080;

const publicPath = path.resolve(__dirname, 'public');

appServer.get('/migrate-images', async (req, res) => {
    res.sendFile(path.resolve(publicPath, 'image_page.html'));
});

appServer.get('/migrate-files', async (req, res) => {
    res.sendFile(path.resolve(publicPath, 'file_page.html'));
});

appServer.get('/', async (req, res) => {
    res.send("Still working on it...");
});

server.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})