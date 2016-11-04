var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var checkLogin = require('../passport/checkLogin');
var myfun = require('../passport/myfun');
var User = require('../models/user.model');
var sms_config= require('../config/sms');
var App = require('alidayu-node');
var app = new App(sms_config.app_key, sms_config.app_secret);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/send_sms', function(req, res){
  console.log(123);
  var phone = req.body.phone;
    User.findUserByPhone(phone,function (err,rows) {
        if (err) {
            return res.json({
                "code": "3003",

            });
        }
        if (rows.length > 0) {
            return res.json({
                "code": "3004",

            });
        }
        User.findcodeByPhone(phone, function (err2, rows2) {
            if (err2) {
                return res.json({
                    "code": "3003",

                });
            }
            if (rows.length > 0) {
                User.deletecodeByPhone(phone, function (err3, rows3) {
                    if (err2) {
                        return res.json({
                            "code": "3003",

                        });
                    }
                    var code = Math.random().toString().substr(2, 6);
                    //console.log(sms_config);
                    app.smsSend({
                        sms_free_sign_name: sms_config.sms_free_sign_name, //!!!!!用sms_config会报错签名不合法
                        sms_param: {"code": code, "product": 'EmotionDetector'},
                        rec_num: phone,
                        sms_template_code: sms_config.sms_template_code
                    }, function (response) {
                        if (!response) {
                            console.log(response);
                            console.log("11");
                            return res.json({
                                "code": "3003",

                            });
                        }
                        if (response.error_response) {
                            console.log(response);
                            return res.json({
                                "code": "3002",

                            });
                        }
                        console.log(response);

                        User.reserveCode(phone, code, function (err4, rows4) {
                            if(err4)
                            {
                                return res.json({
                                    "code": "3003",

                                });
                            }
                            
                            return res.json({
                                "code": "3000"

                            });
                        });


                    });

                });


            }
            else
            {
                var code = Math.random().toString().substr(2, 6);
                //console.log(sms_config);
                app.smsSend({
                    sms_free_sign_name: sms_config.sms_free_sign_name, //!!!!!用sms_config会报错签名不合法
                    sms_param: {"code": code, "product": 'EmotionDetector'},
                    rec_num: phone,
                    sms_template_code: sms_config.sms_template_code
                }, function (response) {
                    if (!response) {
                        console.log(response);
                        console.log("11");
                        return res.json({
                            "code": "3003",

                        });
                    }
                    if (response.error_response) {
                        console.log(response);
                        return res.json({
                            "code": "3002",

                        });
                    }
                    console.log(response);

                    User.reserveCode(phone, code, function (err4, rows4) {
                        if(err4)
                        {
                            return res.json({
                                "code": "3003",

                            });
                        }

                        return res.json({
                            "code": "3000"

                        });
                    });


                });
            }
        });

    });   


});
  router.post('/login', checkLogin.checkNotLoginUserForm);
router.post('/login', function (req, res) {
    var phone = req.body.phone;
    var password = req.body.password;
    console.log(password);
    if (!myfun.checkPhone(phone)) {
      console.log("手机号码格式错误");
      return res.json({code: 1001});
    }
    if (!myfun.checkpassWord(password)) {
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
// 退出登录
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});
// 注册操作
router.post('/register', checkLogin.checkNotLoginUserForm);
router.post('/register', function (req, res) {

    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;
    var gender =req.body.gender;
    var birth =req.body.birth;
    var re_password = req.body.re_password;
    var code =req.body.code;
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
    User.findUserByPhone(phone, function (err, rows) {
        if (err) {
            console.log('error ', err);
            return res.json({code:2005});
        }
        if (rows.length > 0) {
            req.flash('error', '该号码已注册, 您可以直接登陆!');
            return res.json({code:2006});
        }
    User.findcodeByPhone(phone,function (err1,rows1) {
        if (err1) {
            console.log('error ', err1);
            return res.json({code:2005});
        }
        if(rows1[0].code!=code)
        {
            return res.json({code:2008});
        }
        var timenow=new Date().getTime()/1000;
        if((timenow-rows1[0].time)>1800)
        {
            return res.json({code:2009});
        }
        // 将密码加密
        var md5 = crypto.createHash('md5');
        password = md5.update(req.body.password).digest('hex');
        var newUser = new User(phone, password,name,gender,birth);
        // 检查是否已经注册过
        //noinspection JSUnresolvedFunction

        console.log('注册...将用户信息写入数据库...');
        newUser.insert(function (err3, inserted) {
            if (err3) {
                console.log('error newUser.insert', err);
                return res.json({code:2005});
            }
            User.updatecodeByPhone(phone,function (err4,rows4) {
                if (err3) {
                    console.log('error newUser.insert', err);
                    return res.json({code:2005});
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
    });
  });

module.exports = router;
