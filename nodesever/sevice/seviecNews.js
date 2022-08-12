const modelNews = require('../model/modelNews');
var bcrypt = require('bcrypt');
const async = require('hbs/lib/async');

exports.addnews = async (title,content,images,date,author) => {
    const news = await modelNews.create({
        title:title,
        content:content,
        date:date,
        images:images,
        like:0,
        author:author
    });
    return news; 
}
exports.getNews = async () => {
    return await modelNews.find();
}
exports.findNews = async (id) => {
    return await modelNews.find({_id:id});
}
exports.updateNews = async (id,title,content,images,date,author) => {
    const news = await modelNews.updateOne(
        {_id:id},
        {
            $set : {
                title:title,
                content:content,
                images:images,
                date:date,
                author:author
            }
        }, {
            upsert:true
        }
    );
    return news;
}

