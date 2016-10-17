var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var checkLogin = require('../passport/checkLogin');
var myfun = require('../passport/myfun');
var User = require('../models/user.model')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var routes = function (app) {
  app.post('/login', checkLogin.checkNotLoginUserForm);
  app.post('/login', function (req, res) {
    var phone = req.body.phone;
    var password = req.body.password;
    if (!myfun.checkPhone(phone)) {
      console.log("手机号码格式错误");
      return res.json({code: 1001});
    }
    if (!myfun.checkPhone(password)) {
      console.log('密码格式错误!');
      return res.json({code: 1002});
    }

    User.findUserByPhone(phone, function (err, rows) {
      if (err) {
        return res.json({code: 1003});
      }

      if (rows.length === 0) {

        console.log('用户不存在!');
        return res.json({code: 1004});
      }

      if (rows.length != 1) {
        console.log('账号异常!');
        return res.json({code: 1005});
      }

      // 将密码加密
      var md5 = crypto.createHash('md5');
      password = md5.update(req.body.password).digest('hex');
      console.log(password);
      if (password != rows[0].password) {

        console.log('密码错误!');
        return res.json({code: 1006});
      }
      // 登陆成功,将用户信息存入 session
      req.session.user = rows[0];
      console.log('登录成功!');
      return res.json({code: 1000});
    });
  });
  // 注册操作
  app.post('/register', checkLogin.checkNotLoginUserForm);
  app.post('/register', function (req, res) {

    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;
    var gender =req.body.gender;
    var birth =req.body.birth;
    var re_password = req.body.re_password;
    if (!name) {
    console.log( '姓名不能为空!');
      return res.json({code: 2001});
    }
    if (!myfun.checkPhone(phone)) {
      console.log( '手机号码格式错误!');
      return res.json({code: 2002});
    }
    if (!myfun.checkpassWord(password)) {
      console.log('密码长度不能小于6位');
      return res.json({code: 2003});
    }
    if (password != re_password) {
      console.log( '两次密码不一致');
      return res.json({code: 2004});
    }

    // 将密码加密
    var md5 = crypto.createHash('md5');
    password = md5.update(req.body.password).digest('hex');
    var newUser = new User(phone, password,name,gender,birth);
    // 检查是否已经注册过
    //noinspection JSUnresolvedFunction
    User.findUserByPhone(newUser.phone, function (err, rows) {
      if (err) {
        console.log('error 检查是否已经注册过', err);
       return res.json({code:2005});
      }
      if (rows.length > 0) {
        req.flash('error', '该号码已注册, 您可以直接登陆!');
        return res.json({code:2006});
      }
      console.log('注册...将用户信息写入数据库...');
      newUser.insert(function (err, inserted) {
        if (err) {
          console.log('error newUser.insert', err);
          return res.json({code:2007});
        }

        // 注册成功，将用户信息写入session
        console.log('注册成功, id 为: ', inserted.insertId);
        req.session.user = {
          id: inserted.insertId,
          name: name,
          phone:phone,
          password: password,
          gender:gender,
          birth:birth
        };
        return res.json({code:2007});
      });
    });
  });
};
module.exports = router;
