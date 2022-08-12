const async = require('hbs/lib/async');
const modelComment = require('../model/modelComment');
exports.commentnew = async (content,date,names,images,news) => {
    const comment = await modelComment.create(
        {
            content:content,
            date:date,
            like:0,
            names:names,
            images:images,
            news:news
        }
    );
    return comment; 
}
exports.getComment = async (news) => {
    return await modelComment.find({news:news});
}