const getAllUrlModel = require('../../model/database-model/get_all_url_model');

const getAllUrlController = async (req, res) => {

    const modelResponse = await getAllUrlModel();

    try {
        return res.status(200).send(modelResponse);
    } catch (error) {
        console.log("get all url controller error says:", error.message);
    }

}

module.exports = getAllUrlController;