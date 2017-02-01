var connection = require('./connection.js');


function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		if (Object.hasOwnProperty.call(ob,key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}

//MySQL queries 

var orm = {
	all: function(tableInput, cb) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	create: function(table, cols, vals, cb) {
		var queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += ' ?, 0';
		queryString += ') ';

		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},

	update: function(table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table;

		queryString +=  ' SET ';
		queryString += objToSql(objColVals);
		queryString +=  ' WHERE ';
		queryString += condition;

		connection.query(queryString, function(err, result) {
			if(err) {
				throw err;
			}
			cb(result);
		});
	}
};

module.exports = orm;