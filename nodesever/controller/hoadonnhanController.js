const async = require('hbs/lib/async');
const seviceComment = require('../sevice/seviceHoadonnhan');
exports.addComment = async (id_hoadon,trangthai) => {
    const comment = await seviceComment.commentnew(id_hoadon,trangthai);
    return comment;
}
exports.getHoadonnhan = async (id) => {
    const hoadonnhan = await seviceComment.getHoadonnhan(id);
    return hoadonnhan;
}