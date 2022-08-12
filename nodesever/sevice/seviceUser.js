const modelUser = require('../model/modelUsers');
var bcrypt = require('bcrypt');
const async = require('hbs/lib/async');
const { set } = require('mongoose');
exports.login = async (email) => {
    const user = await modelUser.findOne({email:email});
    return user;
}
exports.findIdUser = async (id) => {
    const findIdUsers = await modelUser.findOne({_id:id});
    return findIdUsers;
}
exports.getlistUser = async () => {
    return await modelUser.find();
}
exports.register = async (email,username,password) => {
    const users = await modelUser.create({email:email,
        username:username,
        password:password,
        phone:'',
        images:'',
        address:'',
        both:'',
        gender:'',
        admintor:'',
        images:'',
        con:''
    });
    return users;
}
exports.updateUser = async(id,username,phone,address,images,both,gender,admintor,con) => {
    const userid = await modelUser.updateOne(
        {
            _id:id
        },
        { $set:
        {
            username:username,
            phone:phone,
            address:address,
            images:images,
            both:both,
            gender:gender,
            admintor:admintor,
            con:con
        }
        },
        {
            upsert:true
        });
    return userid;   
}
exports.deleteUser = async(id)=>{
    return await modelUser.findOneAndDelete(id);
}
exports.findAuthor = async (id) => {
    const author = await modelUser.find({admintor:"Employee"});
    return author;
}
exports.findnguoiBan = async (usernames) => {
    console.log("1  " + usernames)
    const authors = await modelUser.findOne({username:usernames});
    return authors;
}
exports.rememberUser = async(email,phone,password) => {
    
    const userid = await modelUser.findOneAndUpdate(
        {
            email:email
        },
        { $set:
        {
            phone:phone,
            password:password
        }
        },
        {
            upsert:true
        });
    return userid;   
}

