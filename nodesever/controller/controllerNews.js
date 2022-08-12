const async = require('hbs/lib/async');
const seviceNews = require('../sevice/seviecNews');
exports.addNews = async (title,content,images,date,author) => {
    const user = await seviceNews.addnews(title,content,images,date,author);
    return true;
}
exports.getNews = async () => {
    return await seviceNews.getNews();
}
exports.findNews = async (id) => {
    return await seviceNews.findNews(id);
}
exports.updateNews = async (id,title,content,images,date,author) => {
    const news = await seviceNews.updateNews(id,title,content,images,date,author);
    return news;
}