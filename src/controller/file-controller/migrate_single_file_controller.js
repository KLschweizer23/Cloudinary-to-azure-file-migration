const migrateSingleFileModel = require("../../model/file-model/migrate_single_file_model");

const migrateSingleFileController = async (req, res) => {

    const modelResponse = await migrateSingleFileModel(req.body);

    try {
        return res.status(200).send(modelResponse);
    } catch (error) {
        console.log('migrate single file controller error says: ', error.message);
    }

}

module.exports = migrateSingleFileController;