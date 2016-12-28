var connection = require('./db.model');

function Data(id, data, time){
    this.user_id = id;
    this.data = data;
    this.time = time;
}

//插入数据
Data.prototype.insert = function(callback){
	//var time = parseInt(new Date().getTiome()  / 1000);以客户端时间为准
	var data = {
		user_id : this.user_id,
		data : this.data,
		time : this.time 
	};
	var sql = 'insert data set ?';
	connection.query(sql, data, function(err, rows){
		if(err){
			console.error('error insert: ' + err.stack);
			return callback(err);
		}
		callback(null, rows);
	});
};

//读取数据
Data.prototype.read = function(callback){
	var sql = 'select * from data where phone=?';
	var phone = this.phone;
	connection.query(sql,[phone],function(err, rows){
		if(err){
			console.error('error insert: ' + err.stack);
			return callback(err);
		}
		callback(err, rows);
	})
}
