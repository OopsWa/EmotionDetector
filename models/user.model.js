var connection = require('./db.model');

function User(phone, password,name,gender,birth) {
    this.phone = phone;
    this.password = password;
    this.name = name;
    this.gender = gender;
    this.birth = birth;
}


 // 向数据库插入新用户
 User.prototype.insert = function (callback) {
   var time = parseInt(new Date().getTime() / 1000);
   var data = {
       phone:this.phone,
       name: this.name,
       password: this.password,
       name: this.name,
       gender:this.gender,
       birth:this.birth,
       time: time
   };
console.log(data);
   var insert = 'INSERT account SET ?';
   connection.query(insert,data, function (err, rows) {
     if (err) {
       console.error('error insert: ' + err.stack);
       return callback(err);
     }
     callback(null, rows);
   });
 };


 // 根据邮箱查找用户
 User.findUserByPhone = function (phone, callback) {

   var select = 'SELECT * FROM account WHERE phone=?';
   connection.query(select, [phone], function (err, rows) {
     if (err) {
       console.error('error select: ' + err.stack);
       return callback(err);
     }

     callback(null, rows);
   });
 };
User.reserveCode=function (phone,code,callback) {
    var insert = 'INSERT register_code SET ?';
    var data ={
        phone:phone,
        code:code,
        time:parseInt(new Date().getTime() / 1000)
    };
    connection.query(insert,data, function (err, rows) {
        if (err) {
            console.error('error insert: ' + err.stack);
            return callback(err);
        }
        callback(null, rows);
    });
};

User.findcodeByPhone = function (phone, callback) {

    var select = 'SELECT * FROM register_code WHERE phone=?';
    connection.query(select, [phone], function (err, rows) {
        if (err) {
            console.error('error select: ' + err.stack);
            return callback(err);
        }

        callback(null, rows);
    });
};
User.deletecodeByPhone = function (phone, callback) {

    var drop = 'delete FROM register_code WHERE phone=?';
    connection.query(drop, [phone], function (err, rows) {
        if (err) {
            console.error('error select: ' + err.stack);
            return callback(err);
        }

        callback(null, rows);
    });
};
User.updatecodeByPhone = function (phone, callback) {

    var update = 'update register_code accept=\'1\'  WHERE phone=?';
    connection.query(update, [phone], function (err, rows) {
        if (err) {
            console.error('error select: ' + err.stack);
            return callback(err);
        }

        callback(null, rows);
    });
};
User.findUserById = function (user_id, callback) {

    var select = 'SELECT * FROM account WHERE id=?';
    connection.query(select, [user_id], function (err, rows) {
        if (err) {
            console.error('error select: ' + err.stack);
            return callback(err);
        }

        callback(null, rows);
    });
};


// 根据邮箱更新密码
User.updatePasswordByPhone = function (phone, password, callback) {
  var sql = 'UPDATE user SET password=? WHERE email=?';
  connection.query(sql, [password, phone], function (err, rows) {
    if (err) {
      console.error('error update password by phone: ' + err.stack);
      return callback(err);
    }

    callback(null, rows);
  });

};


/**
 * 修改头像
 * @param user_id
 * @param avatar
 * @param callback
 */
User.updateAvatar = function (user_id, avatar, callback) {
  var sql = 'UPDATE user SET avatar=? WHERE id=?';
  connection.query(sql, [avatar, user_id], function (err, rows) {

    if (err) {
      console.error('error update avatar by user_id: ' + err.stack);
      return callback(err);
    }

    callback(null, rows);
  });
};


// 修改姓名
User.updateName = function (user_id, name, callback) {
  var sql = 'UPDATE user SET name=? WHERE id=?';
  connection.query(sql, [name, user_id], function (err, rows) {
    if (err) {
      console.error('error update name by user_id: ' + err.stack);
      return callback(err);
    }

    callback(null, rows);
  });
};


// 查询用户密码
User.findPasswordByUserId = function (user_id, callback) {
  var sql = 'SELECT password FROM user WHERE id=?';
  connection.query(sql, [user_id], function (err, rows) {

    if (err) {
      console.error('error select password by user_id: ' + err.stack);
      return callback(err);
    }

    return callback(null, rows);

  });
};



// 更新用户密码
User.updatePasswordByUserId = function (user_id, password, callback) {
  var sql = 'UPDATE user SET password=? WHERE id=?';
  connection.query(sql, [password, user_id], function (err, rows) {
    if (err) {
      console.error('error update password by id: ' + err.stack);
      return callback(err);
    }

    callback(null, rows);
  });
};


module.exports = User;