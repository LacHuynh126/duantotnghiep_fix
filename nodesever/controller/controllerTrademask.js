
const async = require('hbs/lib/async');
const seviceTrademask = require('../sevice/seviceTrademask');

exports.getTrademask = async () => {
    return await seviceTrademask.getTrademask();
}

exports.getSector = async () => {
    return await  seviceTrademask.getSector();
}