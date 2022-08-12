const async = require('hbs/lib/async');
const seviceUser = require('../sevice/seviceUser');
exports.login = async (email,password) => {
    const user = await seviceUser.login(email);
    if(!user) return false;
    if(user.password != password) return false;
    return true;
}
exports.datatransid = async (email) => {
    const user = await seviceUser.login(email);
    if(!user) return false;
    return user;
}
exports.register = async (email,username,password) => {
    const user = await seviceUser.register(email,username,password);
    return true;
}
exports.checkregister = async (email) => {
    const user = await seviceUser.login(email);
    if(user) return false;
}
exports.updateUser = async (id,username,phone,address,images,both,gender,admintor,con) => {
    const userid = await seviceUser.updateUser(id,username,phone,address,images,both,gender,admintor,con);
    return userid;
}
exports.getlistUser = async() => {
    return await seviceUser.getlistUser();
}
exports.findid = async(id) => {
    return await seviceUser.findIdUser(id);
}
exports.deleteUser = async(id)=>{
    const deletes = await seviceUser.deleteUser(id);
    if(deletes) return true;
}
exports.findAuthor = async() => {
    const user = await seviceUser.findAuthor();

    return user;
}
exports.loginmobile = async (email,password) => {
    const user = await seviceUser.login(email);
    if(!user) return false;
    if(user.password != password) return false;
    return user;
}
exports.findnguoiBan = async(usernames) => {
    const user = await seviceUser.findnguoiBan(usernames);
    return user;
}
exports.remmember = async (email,phone,password) => {
    const userid = await seviceUser.rememberUser(email,phone,password);
    return userid;
}


