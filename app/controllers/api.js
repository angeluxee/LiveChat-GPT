var ApiModel = require("../models/api");

exports.apiCheck = async (req, res, next) => {
    try {
        var apiKey = await ApiModel.findOne({key: req.headers.key})
        apiKey ? next() : res.json({"error": "La key no es correcta"});

    } catch (error) {
        console.error(`Error : ${error}`);
        return null;
    }
};

exports.addApiKey = async (req, res, next) => {
    try {
        console.log(`API Key recibida: ${req.body.apikey}`);

        var apikey = new ApiModel({ key: req.body.apikey });
        
        await apikey.save();

        res.json({ message: 'Key creada correctamente' });
    } catch (error) {
        console.error(`Error : ${error}`);
        res.status(500).json({ error: 'Error al crear la key' });
    }
};
