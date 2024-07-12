const azureContainerClient = require("../../_database/azure_config");
const cloudinaryConfig = require("../../_database/cloudinary_config");
const pool2 = require("../../_database/db_config_2");
const url = require('url');
const fs = require('fs');
const path = require('path');

const migrateSingleImageModel = async (req_body) => {
    
    const { id, old_url } = req_body;

    const parsedUrl = url.parse(old_url);
    const completePath = parsedUrl.pathname.substring(1);

    const query = "UPDATE migration_table SET new_url = $2 WHERE id = $1;";

    const returnResponse = {
        status: "",
        message: ""
    };

    try {
        const parts = completePath.split('/');
        const correctPath = parts.slice(-2).join('/');

        const parentPath = correctPath.split('/')[0];
        const fileName = correctPath.split('/')[1];
        // const publicId = correctPath.substring(0, correctPath.length - 4);

        const downloadDirectory = path.join(__dirname, `downloads/${parentPath}`);

        if (!fs.existsSync(downloadDirectory)) {
            if (!fs.existsSync(path.join(__dirname, 'downloads'))) {
                fs.mkdirSync(path.join(__dirname, 'downloads'));
            }
            fs.mkdirSync(downloadDirectory);
        }

        const filePath = path.join(__dirname, `downloads/${parentPath}`, fileName);

        const response = await fetch(old_url);
        const buffer = await response.arrayBuffer();

        const writeFilePromise = new Promise((resolve, reject) => {
            fs.writeFile(filePath, Buffer.from(buffer), (err) => {
                if (err) {
                    reject("Bad");
                } else {
                    resolve("Good");
                }
            });
        });

        const writeResponse = await writeFilePromise.then((message) => {
            return message;
        }).catch ((error) => {
            return error;
        });

        console.log("writeResponse: ", writeResponse);

        if (writeResponse == "Good") {
            const blockBlobClient = azureContainerClient.getBlockBlobClient(correctPath);
            const azureResponse = await blockBlobClient.uploadFile(filePath).then(async (response) => {
                console.log("Azure Response: Good");
                console.log("Azure API Response: ", response._response);
                return blockBlobClient.url;
            }).catch((error) => {
                console.log("Azure Response: Bad -> ", error);
                return 'Bad';
            });

            if (azureResponse != 'Bad') {
                const params = [id, azureResponse];
                const poolResponse = await pool2.query(query, params);
                if (poolResponse.rowCount != 1) {
                    returnResponse.status = "error";
                    returnResponse.message = "Failed to update the database with new url.";
                    return JSON.stringify(returnResponse);
                } else {
                    console.log("Database Response: Good");
                }
            } else {
                returnResponse.status = "error";
                returnResponse.message = "Failed to upload image to Azure.";
                return JSON.stringify(returnResponse);
            }
        } else {
            returnResponse.status = "error";
            returnResponse.message = "Failed to download image.";
            return JSON.stringify(returnResponse);
        }

        fs.unlinkSync(filePath);

        returnResponse.status = "success";
        returnResponse.message = "Image successfully migrated.";
        return JSON.stringify(returnResponse);
    } catch (error) {
        console.log('migrate single image model error says: ', error.message);
    }

}

module.exports = migrateSingleImageModel;