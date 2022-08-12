const async = require('hbs/lib/async');
const seviceComment = require('../sevice/replayChat');
const { commentnew } = require('../sevice/seviceComment');
exports.addComment = async (content,date,house,names_post,images_post,names_get,images_get) => {
    const comment = await seviceComment.commentnew(content,date,house,names_post,images_post,names_get,images_get);
    return true;
}
exports.insertsnew = async (id_cu,idnews,content,date,house,names_post,images_post,names_get,images_get) => {
    const comment = await seviceComment.insertsnew(id_cu,idnews,content,date,house,names_post,images_post,names_get,images_get);
    return comment;
}
exports.findComments = async (names) => {
    const findCommentss = await seviceComment.findComments(names);
    
    return findCommentss;
}
exports.findCommentsget = async (names) => {
    const findCommentss = await seviceComment.findComments(names);
    return findCommentss;
}
exports.postComment = async (names) => {
    return await seviceComment.postComment(names);
}
exports.getComment = async (names) => {
    return await seviceComment.getComment(names);
}
exports.findIdcomments = async (id) => {
    const findCommentss = await seviceComment.findIdcomments(id);
    return findCommentss;
}
exports.findPost = async (names) => {
    console.log(names);
    const findCommentss = await seviceComment.findPostname(names);
    console.log(findCommentss);
    return findCommentss;
}
exports.checkComment = async (names_get,names_post) => {
    const checkComment = await seviceComment.checkComment(names_get,names_post);
    return checkComment;
}
exports.getGetComment = async (id) => {
    const checkComment = await seviceComment.getGetComment(id);
    return checkComment;
}
exports.getPostComment = async (id,names_post) => {
    const checkComment = await seviceComment.getPostComment(id,names_post);
    return checkComment;
}