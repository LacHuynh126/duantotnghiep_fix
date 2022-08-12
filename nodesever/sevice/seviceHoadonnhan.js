const async = require('hbs/lib/async');
const modelhoadonnhan = require('../model/modelhoadonnhan');
const { v4: uuidv4 } = require('uuid');
exports.commentnew = async (id_hoadon,trangthai) => {
    const comment = await modelhoadonnhan.insertMany(
        {   
            hoadon:id_hoadon,
            trangthai:trangthai
        }
    );
    return comment; 
}
exports.getHoadonnhan = async (id) => {
    const hoadonnhan = await modelhoadonnhan.find({hoadon:id});
    console.log(hoadonnhan);
    return hoadonnhan;
}