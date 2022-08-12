
var express = require('express');
var hbs = require('express-hbs');
var path = require('path');
const { v4: uuidv4 } = require('uuid');
var router = express.Router();
var app = express();
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser())
const userController = require('../controller/controllerUser');
const motoController = require('../controller/moToController');
const newsController = require('../controller/controllerNews');
const commentController = require('../controller/controllerComment');
const tradeController = require('../controller/controllerTrademask');
const hodonController = require('../controller/controllerHoadon');
const hodontongController = require('../controller/controllerHoadontong');
const chatController = require('../controller/chatController');
const async = require('hbs/lib/async');
const console = require('console');
const MongoClient = require('mongodb').MongoClient;
const parmaid = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Hello' });
});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Hello' });
});
/*--------Login---------*/
router.post('/login', async function(req, res, next) {
  const {email,password} = req.body;   
  const check = await userController.login(email,password);
  const data = await userController.datatransid(email);
  
  if(check){
   
    res.cookie('Id', data._id, { expires: new Date(Date.now() + 900000)});
    res.cookie('UserName',data.username, { expires: new Date(Date.now() + 900000)});
    res.cookie('Email', data.email, { expires: new Date(Date.now() + 900000)});
    res.cookie('Phone', data.phone, { expires: new Date(Date.now() + 900000)});
    res.cookie('Images', data.images, { expires: new Date(Date.now() + 900000)});
    res.cookie('Email', data.email, { expires: new Date(Date.now() + 900000)});
    res.redirect('/admin/' + data._id);
  } else {
    const erro = 'Sai tên đăng nhập hoặc mật khẩu';
    res.render('login',{Erro:erro});
  }
  // res.json({status: check});
});
function validateEmail(email) 
  {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
/*--------SignUp---------*/
router.post('/signup', async function(req, res, next) {
  const {email,username,password,config_password} = req.body;
  const check = await userController.checkregister(email);
 
  
  if(email == ""){
      const erro = 'Chưa điền tài khoản';
      res.render('signup',{Erro:erro});
  } else if( username == ""){
    const erro = 'Chưa điền username';
    res.render('signup',{Erro:erro});
  } else if(password == ""){
    const erro = 'Chưa điền password';
    res.render('signup',{Erro:erro});
  }else if(config_password == ""){
    const erro = 'Chưa xác nhận pass word';
    res.render('signup',{Erro:erro});
  } else {
      if(password !== config_password){
        const erro = 'Mật khẩu chưa trùng khớp';
        res.render('signup',{Erro:erro});
      } else {
        if(check == null){
          if(validateEmail(email) == true){
            const check2 = await userController.register(email,username,password);
            res.redirect('/login');
          } else {
            const erro = 'Email chưa đúng định dạng';
            res.render('signup',{Erro:erro});
          }
        } else {
          const erro = 'Tài khoản đã tồn tại rồi';
          res.render('signup',{Erro:erro});
        }
      }
    }
  }  
);
/*--------Profile + Edit ---------*/
router.get('/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const data = await userController.findid(iddata);
  res.render('index1', {IP:Idn,UserName:Username,data});
});
router.post('/admin', async function(req, res, next){
  const {id,username,phone,address,images,both,gender,admintor,con} = req.body;
  const updateUser = userController.updateUser(id,username,phone,address,images,both,gender,admintor,con);
  res.redirect('/admin/listuser');
});
/*--------ListUser---------*/
router.get('/admin/listuser', async function(req, res, next) {
  const data = await userController.getlistUser();
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  res.render('listuser', {UserName:Username,data,IP:Idn});

  
});
/*--------Delete User---------*/
router.post('/delete/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const data = await userController.deleteUser(iddata);
 
  res.redirect('/admin/listuser');
});

/*------- ADD NEWS --------*/
router.get('/admin/listnews', async function(req, res, next) {
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const news = await newsController.getNews();
  res.render('listnews',{UserName:Username,IP:Idn,news});
});
router.get('/admin/dangbai', async function(req, res, next) {
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const {title,content,image,date,author} = req.body;
  const getAuthors = await userController.findAuthor();
  res.render('dangbai',{IP:Idn,UserName:Username,getAuthors});
});
router.post('/admin/listnews', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const {title,content,images,date,author} = req.body;
  const insertNews = await newsController.addNews(title,content,images,date,author);
  res.redirect('/admin/listnews');
});

/* ---------------Get  News------------------- */

router.get('/news/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const {title,content,image,date,author} = req.body;
  const getAuthors = await userController.findAuthor();
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const getNews = await newsController.findNews(iddata);

 
  res.render('editNews',{IP:Idn,UserName:Username,getAuthors,getNews});
});

/* ---------------Update News------------------- */

router.post('/admin/admin', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const {idnews,title,content,images,date,author} = req.body;
  const updateNews = await newsController.updateNews(idnews,title,content,images,date,author);
  res.redirect('/admin/listnews');
});

/* ---------------Get News Item + Comment ------------------- */
router.get('/item_news/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const {title,content,image,date,author} = req.body;
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const getAuthors = await userController.findAuthor();
  const getNews = await newsController.findNews(iddata);
  const User = await userController.findid(Idn);
  const getComments = await commentController.getComment(iddata);
  res.render('news',{getComments,IDNEWS:iddata,IP:Idn,UserName:Username,getAuthors,getNews,User});
});

router.post('/item_news/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const {comment,dates,names,images,news} = req.body;
  const comments = await commentController.addComment(comment,dates,names,images,news);
  res.redirect('/item_news/' + iddata);
});

/* -------- MotoCrycrle ---------- */

router.get('/admin/listmoto', async function(req, res, next) {
  const tradeMask = await tradeController.getTrademask();
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const getMoto = await motoController.getMoto();
  
  res.render('listmoto',{getMoto,tradeMask,IP:Idn,UserName:Username});
});

/* -------- ADD MotoCrycrle ---------- */  


router.get('/admin/dangban', async function(req, res, next) {
  const tradeMask = await tradeController.getTrademask();
  const secTor = await tradeController.getSector();
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  const getAuthors = await userController.findAuthor();
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  res.render('dangban',{secTor,tradeMask,IP:Idn,UserName:Username});
});

router.post('/admin/dangban', async function(req, res, next) {
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const {tenXe,giaXe,hinhXe,hinhXe1,hinhXe2,hinhXe3,hinhXe4,hinhXe5,hinhXe6,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe} = req.body;
  const addMoto = motoController.addMoto(tenXe,giaXe,hinhXe,hinhXe1,hinhXe2,hinhXe3,hinhXe4,hinhXe5,hinhXe6,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,
    mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe,Username);

  res.redirect('/admin/listmoto');
});
router.get('/moto/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const getAuthors = await userController.findAuthor();
  const getMoto = await motoController.findMoto(iddata);
  const User = await userController.findid(Idn);

  const getComments = await commentController.getComment(iddata);
  res.render('moto',{getMoto,IDNEWS:iddata,IP:Idn,UserName:Username,getAuthors,User,getComments});
});
router.post('/moto/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const {comment,dates,names,images,news} = req.body;
  const comments = await commentController.addComment(comment,dates,names,images,news);
  res.redirect('/moto/' + iddata);
});
router.get('/editmoto/:id', async function(req, res, next) {
  const tradeMask = await tradeController.getTrademask();
  const secTor = await tradeController.getSector();
  const iddata = parmaid(req.params.id);
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const getMoto = await motoController.findMoto(iddata);
  const User = await userController.findid(Idn);
  res.render('editmot',{tradeMask,secTor,getMoto,IDNEWS:iddata,IP:Idn,UserName:Username,User});
});

router.post('/admin/editdangban', async function(req, res, next) {
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const {idXe,tenXe,giaXe,hinhXe,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe} = req.body;
  const editMoto = motoController.editMoto(idXe,tenXe,giaXe,hinhXe,namSanxuat,namSudung,tinhTrang,loaiHinhban,phanKhoi,
    mauSac,ngayKiemdinh,soKm,ngayBan,hangXe,loaiXe,Username);
  res.redirect('/admin/listmoto');
});
router.post('/deleteMoto/:id', async function(req, res, next) {
  const Idn = req.cookies.Id;
  const iddata = parmaid(req.params.id);
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const deletes = await motoController.deleteMoto(iddata);
  res.redirect('/admin/listmoto');
});
router.get('/admin/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const Idn = req.cookies.Id;
  const getMoto = await motoController.listMoto();
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const data = await userController.findid(iddata);
  res.render('admin', {getMoto,IP:Idn,UserName:Username,data});
});

router.get('/admin/hoadon/:id', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const Idn = req.cookies.Id;
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  res.render('laphoadon', {IP:Idn,UserName:Username});
});
router.get('/hoadon/laphoadon', async function(req,res,next){
 
  res.render('laphoadon',{title:'hello'});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const Idn = req.cookies.Id;
  const dates = new Date(Date.now());

  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
})
router.post('/hoadon/:id', async function(req, res, next) {
  const Idn = req.cookies.Id;
  const iddata = parmaid(req.params.id);
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const {idXe,tenXe,hinhXe,giaXe,suDung} = req.body;
  const dates = new Date(Date.now());
  res.cookie('maXe',idXe, { expires: new Date(Date.now() + 900000)});
  const hoaDon = hodonController.hoaDon("Mua",dates,dates,tenXe,hinhXe,suDung,giaXe,"1");
  res.redirect('/hoadon/' + Idn );
});
router.get('/hoadon/:id', async function(req,res,next){
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const Idn = req.cookies.Id;
  const dates = new Date(Date.now());
  const getHoadon = await hodonController.gethoaDon();
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  res.render('laphoadon',{getHoadon});
})

router.post('/chotdon/chotdon', async function(req, res, next) {
  const Idn = req.cookies.Id;
  const iddata = parmaid(req.params.id);
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const {totals} = req.body;
  const maXee = req.cookies.maXe;
  const dates = new Date(Date.now());
  const hoadonTong = await hodontongController.hoaDon("Mua",dates,totals,Username);
  const updateMua = await motoController.updatMoto(maXee,Username);
  res.redirect('/admin/' + Idn );
});

router.post('/deletehoadon/:id', async function(req, res, next) {
  const Idn = req.cookies.Id;
  const iddata = parmaid(req.params.id);
  res.cookie('Id', Idn, { expires: new Date(Date.now() + 900000)});
  const Username = req.cookies.UserName;
  res.cookie('UserName',Username, { expires: new Date(Date.now() + 900000)});
  const deletes = hodonController.deleteHoadon(iddata);
  res.redirect('/hoadon/' + Idn );
});

router.get('/chotdon/chotdon', function(req, res, next) {
  const Username = req.cookies.UserName;
  res.render('chotdon', { UserName: Username });
});

router.post('/moto/:id/chat', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  console.log(iddata + "");
  // ---------date
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = today.getMonth() + 1;
    const dd = today.getDate();
    const hh = today.getHours();
    const minu = today.getMinutes();
    const formdate = dd + '/' + mm + '/' + yyyy;
    const formhouse = hh + minu;
    const {valuecontent,nguoiNhan,images_post,id_cu} = req.body;
    const Username = req.cookies.UserName;
    const findChat = await chatController.findComments(Username);
    res.cookie('idchat',id_cu, { expires: new Date(Date.now() + 900000)});
    if(findChat==''){
      const chatComment = await chatController.addComment(valuecontent,formdate,formhouse,Username,images_post,nguoiNhan);
    } else {
      const chatComment = await chatController.insertsnew(id_cu,uuidv4(),valuecontent,formdate,formhouse,Username,images_post,nguoiNhan);
    }
  res.redirect("/admin/chatapp/" +iddata)
});
router.get('/admin/chatapp/:id', async function(req, res, next) {
  const Username = req.cookies.UserName;
  const iddata = parmaid(req.params.id);
  
  const getMoto = await motoController.findMoto(iddata);
  const userProfile = await userController.findnguoiBan(Username);
  const findChats = await chatController.findCommentsget(Username);
  const findId = await chatController.findPost(Username);

  const findIds = await chatController.findIdcomments(findId);
  console.log(findIds);
  const chuoi = JSON.stringify(findId);
  console.log(chuoi);
  res.render('chat', { UserName: Username,getMoto,userProfile,findChats });
});
router.post('/admin/hinhanh', async function(req, res, next) {
  const iddata = parmaid(req.params.id);
  const {firebasehinh} = req.body;
  console.log(firebasehinh +"----------------------");
  
  res.redirect('/admin/dangban');
});
module.exports = router;
