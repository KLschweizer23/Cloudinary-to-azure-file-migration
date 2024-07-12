const migrateSingleImageModel = require("../../model/file-model/migrate_single_image_model");

const migrateSingleImageController = async (req, res) => {

    const modelResponse = await migrateSingleImageModel(req.body);

    try {
        return res.status(200).send(modelResponse);
    } catch (error) {
        console.log('migrate single image controller error says: ', error.message);
    }

}

module.exports = migrateSingleImageController;