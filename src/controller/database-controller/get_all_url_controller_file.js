const getAllUrlModelFile = require('../../model/database-model/get_all_url_model_file');

const getAllUrlControllerFile = async (req, res) => {

    const modelResponse = await getAllUrlModelFile();

    try {
        return res.status(200).send(modelResponse);
    } catch (error) {
        console.log("get all url controller file error says:", error.message);
    }

}

module.exports = getAllUrlControllerFile;