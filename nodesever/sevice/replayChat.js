const async = require('hbs/lib/async');
const modelComment = require('../model/modelreplayChat');
exports.commentnew = async (content,date,house,names_post,images_post,names_get) => {
    const comment = await modelComment.insertMany(
        {   
            content:{
                content:content,
                date:date,
                house:house,
                like:0,
                names_post:names_post,
                images_post:images_post,
                names_get:names_get
            }
        }
    );
   
    return comment; 
}
exports.insertsnew = async (id_cu,idnews,content,date,house,names_post,images_post,names_get) => {
    const comment = await modelComment.updateOne(
       {_id:id_cu},
       {$push:{content:{
            id:idnews,
            content:content,
            date:date,
            house:house,
            like:0,
            names_post:names_post,
            images_post:images_post,
            names_get:names_get
       }}},{
            new:true,
            upsert:true
       }

    );
   
    return comment; 
}
exports.findComments = async (names) => {
    const findCommentss = await modelComment.find({content:{$elemMatch:{names_post:names}}});
    return findCommentss;
}
exports.findPostname = async (names) => {
    const findCommentss = await modelComment.find({content:{$elemMatch:{names_post:names}}});
    return findCommentss[0]._id;
}
exports.checkComment = async (names_post,names_get) => {
    console.log("1 " + names_get,names_post);
    const checkComment = await modelComment.find({content:{$elemMatch:{names_post:names_post,names_get:names_get}}});
    console.log(checkComment);
    return checkComment[0]._id;
}
exports.findIdcomments = async (id) => {
    const findCommentss = await modelComment.find({_id:id});
    return findCommentss;
}
exports.getPostComment = async (id,names_post) => {
    const checkComment = await modelComment.find({_id:id,content:{$elemMatch:{names_post:names_post}}});
    return checkComment;
}
exports.getGetComment = async (id) => {
    const checkComment = await modelComment.find({_id:id});
    return checkComment;
}
// exports.postComment = async (names) => {
//     return await modelComment.find({names_post:names});
// }
// exports.getComment = async (names) => {
//     return await modelComment.find({names_get:names});
// }
