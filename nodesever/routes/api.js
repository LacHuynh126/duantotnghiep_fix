var express = require('express');
var hbs = require('express-hbs');
var path = require('path');
var router = express.Router();
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser())
const { v4: uuidv4 } = require('uuid');
const userController = require('../controller/controllerUser');
const motoController = require('../controller/moToController');
const newsController = require('../controller/controllerNews');
const commentController = require('../controller/controllerComment');
const tradeController = require('../controller/controllerTrademask');
const hodonController = require('../controller/controllerHoadon');
const hodontongController = require('../controller/controllerHoadontong');
const chatController = require('../controller/chatController');
const replayController = require('../controller/replaychatcontroller');
const hoadonnhanController = require('../controller/hoadonnhanController');
const async = require('hbs/lib/async');
const console = require('console');
const MongoClient = require('mongodb').MongoClient;
const parmaid = require('mongodb').ObjectID;
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Hello' });
});
/*-----Login------*/
router.post('/login', async function(req, res, next) {
    const {email,password} = req.body;   
    const check = await userController.login(email,password);
    res.json({status: check});
});

/*----Home Page----*/
router.get('/admin/listmoto', async function(req, res, next) {
    const tradeMask = await tradeController.getTrademask();
    const getMoto = await motoController.listMoto();
    res.json({content:getMoto});
});

router.get('/moto/:id', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const getMoto = await motoController.findMoto(iddata);
    res.json({content:getMoto});
});
router.get('/moto/:id/comment', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const getComments = await commentController.getComment(iddata);
    res.json({content:getComments});
});
router.get('/admin/listnews', async function(req, res, next) {
    const news = await newsController.getNews();
    res.json({content:news});
});
router.get('/item_news/:id', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const getNews = await newsController.findNews(iddata);
    res.json({content:getNews});
});
router.get('/item_news/:id/comment', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const getComments = await commentController.getComment(iddata);
    res.json({content:getComments});
});
router.post('/login/comment', async function(req, res, next) {
    const {email,password} = req.body;   
    const check = await userController.loginmobile(email,password);
    res.json({status: check});
});
router.get('/:id', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const data = await userController.findid(iddata);
    res.json({status:data});
});
router.post('/hoadon/:id', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const {ngayMuahang,ngayLaphoadon,tenXe,hinhXe,suDung,giaXe,trangThai,idXe} = req.body;
    const hoaDon = await hodonController.hoaDon("Mua",ngayMuahang,ngayLaphoadon,tenXe,hinhXe,suDung,giaXe,"1",trangThai,idXe);
    res.json(hoaDon);
});
router.post('/hoadon/:id/thanhtoan', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const {idHoadon,trangThaihoadon,maXee,nguoiMua} = req.body;
    const hoadonUpdate = await hodonController.updateHoadon(idHoadon,trangThaihoadon);
    const updateMua = await motoController.updatMoto(maXee,nguoiMua); 
    res.json(hoadonUpdate);
});
router.get('/listhoadon/:id', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const data = await userController.findid(iddata);
    const data1 = await hodonController.getIdhoadon(data.username);
    res.json({content:data1});
});
router.get('/admin/listtrasmake', async function(req, res, next) {
    const tradeMask = await tradeController.getTrademask();
    res.json({content:tradeMask});
});
router.get('/admin/historys', async function(req, res, next) {
    const history = await hodonController.historyHoadon();
    res.json({contents:history});
});
router.post('/admin/huyhoadon', async function(req, res, next) {
    const {id_moto,nguoiMua,id_hoadon} = req.body;
    const updateMua = motoController.updatMoto(id_moto,nguoiMua);
    const deleteHoadon = hodonController.deleteHoadon(id_hoadon);
    res.json({staus:true});
});
router.post('/admin/thanhtoanhoadon', async function(req, res, next) {
    const {id_moto,nguoiMua,id_hoadon,trangThai} = req.body;
    const updateMua = motoController.updatMoto(id_moto,nguoiMua);
    const deleteHoadon = hodonController.updateHoadon(id_hoadon,trangThai);
    res.json({staus:true});
});
router.get('/admin/honda', async function(req, res, next) {
    const hangXe = await motoController.hangXehonda();
    res.json({content:hangXe});
});
router.get('/admin/piaggo', async function(req, res, next) {
    const hangXe = await motoController.hangXemoto("Honda");
    res.json({content:hangXe});
});
router.post('/admin/nguoiBan', async function(req, res, next) {
    const {nguoiBan1} = req.body;
    const nguoiBan = await userController.findnguoiBan(nguoiBan1);
    res.json({content:nguoiBan});
});
router.post('/moto/:id', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const {comment,dates,names,images,news} = req.body;
    const comments = await commentController.addComment(comment,dates,names,images,news);
    res.json({content:comments})
});
router.post('/chat/', async function(req, res, next) {
    const iddata = parmaid(req.params.id);
    const {dates,house,like,names_post,names_get,images_post} = req.body;
    console.log(names_post,names_get);
    const commemts = await chatController.checkComment(names_post,names_get);
    console.log(commemts);
    res.json(commemts);
    // const comments = await commentController.addComment(comment,dates,names,images,news);
});
// if(commemts==""){
    //     const addComment = await chatController.addComment(comment,dates,house,names_post,images_post,names_get);
    // } else {
    //     const insertComment = await chatController.insertsnew(commemts,uuidv4(),comment,dates,house,names_post,images_post,names_get);
    // }
router.post('/chat/chat', async function(req, res, next) {
    const {idChat,comment,dates,house,names_post,images_post,names_get} = req.body;
    if(idChat==""){
        const addComment = await chatController.addComment(comment,dates,house,names_post,images_post,names_get);
        console.log(addComment)
        res.json(addComment);
    } else {
        const insertComment = await chatController.insertsnew(idChat,uuidv4(),comment,dates,house,names_post,images_post,names_get);
        console.log(insertComment);
        res.json(insertComment);
    }
});
router.post('/chat/chat/chat', async function(req, res, next) {
    const {idChat} = req.body;
    if(idChat ==""){
        console.log("doi chut");
    } else {
        const getGet = await chatController.getGetComment(idChat);
        console.log(getGet);
        res.json(getGet);
    }
});
router.post('/chat/listchat', async function(req, res, next) {
    const {names_get} = req.body;
    const getGet = await chatController.getListComment(names_get);
    console.log(getGet);
    res.json(getGet);
});
router.post('/chat/getchatnguoiban', async function(req, res, next) {
    const {idChats} = req.body;
    const getGet = await chatController.findIdcomments(idChats);
    console.log(getGet);
    // res.json(getGet);
});
router.post('/chat/postchat', async function(req, res, next) {
    const {idChat,comment,dates,house,names_post,images_post,names_get} = req.body;
    const insertComment = await replayController.insertsnew(idChat,uuidv4(),comment,dates,house,names_post,images_post,names_get);
    console.log(insertComment);
    res.json(insertComment);
});
router.post('/chat/postcommetchat', async function(req, res, next) {
    const {id_get} = req.body;
    const getGet = await replayController.getGetComment(id_get);
    console.log("day la id_get"+getGet +id_get);
    res.json(getGet);
});
router.post('/chat/hoadonnhan', async function(req, res, next) {
    const {id_hoadon,trangThaisss} = req.body;
    console.log(id_hoadon);
    const getGet = await hoadonnhanController.addComment(id_hoadon,trangThaisss)
    res.json(getGet);
});
router.post('/chat/hoadonnhan/nhan', async function(req, res, next) {
    const {id_hoadon} = req.body;
    const getGet = await hoadonnhanController.getHoadonnhan(id_hoadon);
    res.json(getGet);
});
function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
router.post('/signup', async function(req, res, next) {
    const {email,password,username,configpassword} = req.body;
    console.log(email +  username + password + configpassword);
    const check = await userController.checkregister(email);
    if(email == ""){
        const erro = 'Chưa điền tài khoản';
        res.json(erro);
    }
    else if( username == ""){
      const erro = 'Chưa điền username';
      res.json(erro);}
    else if(password == ""){
      const erro = 'Chưa điền password';
      res.json(erro);}
    else if(configpassword == ""){
      const erro = 'Chưa xác nhận pass word';
      res.json(erro);}
     else {
        if(password !== configpassword){
          const erro = 'Mật khẩu chưa trùng khớp';
          res.json(erro);
        } else {
          if(check == null){
            if(validateEmail(email) == true){
              const check2 = await userController.register(email,username,password);
              const erro = 'Tạo Tài Khoản Thành Công';
              res.json(erro);
            } else {
              const erro = 'Email chưa đúng định dạng';
              res.json(erro);
            }
          } else {
            const erro = 'Tài khoản đã tồn tại rồi';
            res.json(erro);
          }
        }
      }
    }  
);
router.post('/remember', async function(req, res, next) {
    const {email,phone,password,configPass,username} = req.body;
    const check = await userController.checkregister(email);
    const checkNguoidoi = await userController.findnguoiBan(username);
    console.log(checkNguoidoi);
    console.log(email + phone + password + configPass);
    if(configPass == password){
        if(checkNguoidoi == null){
            const erro = 'Không phải là bạn?';
            res.json(erro);
        } else {
            if(check == null){
                if(validateEmail(email) == true){
                    const erro = 'Email chua ton tai';
                    res.json(erro);
                } else {
                    const erro = 'Email chưa đúng định dạng';
                    res.json(erro);
                }
            } else {
                const updateEmail = await userController.remmember(email,phone,password);
                const erro = 'Updapte Thành Công';
                res.json(erro);
            }
        }
    } else {
        const erro = 'Mật khẩu chưa trùng khớp';
        res.json(erro);
    }
        // if(configPass == password){
        
// else {
        //     if(check == null){
    
        //       } else {
        //         const erro = 'Updapte Thành Công';
        //         res.json(erro);
        //       }
        // }
    }  
);
module.exports = router;