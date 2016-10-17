var checkLogin = {
  // 判断普通用户是否已经登陆
  checkLoginUserForm: function (req, res, next) {
    console.log(req.session);
    if (!req.session.user) {
      //req.flash('error', '未登陆');
      return res.redirect('/login');
    }
    next();
  },
  checkLoginUserJson: function (req, res, next) {
    console.log(req.session);
    if (!req.session.user) {
      return res.json({
        code: 0001,
        message: '未登陆'
      });
    }
    next();
  },

  // 判断普通用户是否未登陆
  checkNotLoginUserForm: function (req, res, next) {
    console.log(req.session);
    if (req.session.user) {
      //req.flash('error', '已登陆');
      return res.redirect('/home'); //返回主页
    }
    next();
  },
  checkNotLoginUserJson: function (req, res, next) {
    console.log(req.session);
    if (req.session.user) {
      return res.json({
        code: 0002,
        message: '已登陆'
      });
    }
    next();
  }

};


module.exports = checkLogin;
