const async = require('hbs/lib/async');
const modelTrademaske = require('../model/modelTrademask');
const modelSector = require('../model/modelSector');

exports.getTrademask = async () => {
    return await  modelTrademaske.find();
}

exports.getSector = async () => {
    return await  modelSector.find();
}