const async = require('hbs/lib/async');
const seviceComment = require('../sevice/seviceComment');
exports.addComment = async (content,date,names,images,news) => {
    const comment = await seviceComment.commentnew(content,date,names,images,news);
    return true;
}
exports.getComment = async (news) => {
    return await seviceComment.getComment(news);
}
