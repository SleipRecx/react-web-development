var express = require('express');
var app = express();
var mysql = require('mysql');
var restResponse = require('express-rest-response');

var options = {
  showStatusCode: true,
  showDefaultMessage: true
};
app.use(restResponse(options));


function connect_db(){
  var connection = mysql.createConnection({
    host     : 'it2810-07.idi.ntnu.no',
    user     : 'gruppe7',
    password : 'brusjan07',
    database : 'book_db'
  });
   connection.connect();
   return connection
};


// BOOKS

app.get('/api/books', function (req, res) {
  connection = connect_db();
  connection.query('SELECT * from books', function(err, rows, fields) {
    if (err){
      res.rest.serverError(err);
    }
    else{
        res.rest.success(rows);
    }
  });
connection.end();
});

app.get('/api/book/:id', function (req, res) {
  connection = connect_db();
  var id = req.params.id
  var sql = "SELECT * FROM books WHERE book_id = ?";
  var inserts = [id];
  sql = mysql.format(sql, inserts)
  connection.query(sql, function(err, rows, fields) {
    if (err){
      res.rest.serverError(err);
    }
    else{
      res.rest.success(rows);
    }
  });
connection.end();
});


app.get('/api/books/user/:id', function (req, res) {
  connection = connect_db();
  var id = req.params.id
  var sql = "SELECT * FROM books WHERE user_id_foreign = ?";
  var inserts = [id];
  sql = mysql.format(sql, inserts)
  connection.query(sql, function(err, rows, fields) {
    if (err){
      res.rest.serverError(err);
    }
    else{
      res.rest.success(rows);
    }
  });
connection.end();
});



// USERS
app.get('/api/users/:id', function (req, res) {
  connection = connect_db();
  var id = req.params.id
  var sql = "SELECT * FROM users WHERE user_id = ?";
  var inserts = [id];
  sql = mysql.format(sql, inserts)

  connection.query(sql, function(err, rows, fields) {
    if (err){
      res.rest.serverError(err);
    }
    else{
      res.rest.success(rows);
    }
  });
connection.end();
});



app.get('/api/users', function (req, res) {
  connection = connect_db();
  connection.query('SELECT * from users', function(err, rows, fields) {
    if (err){
      res.rest.serverError(err);
    }
    else{
        res.rest.success(rows);
    }
  });
connection.end();
});




app.listen(9001, function () {
  console.log('Example app listening on port 9001!');
});
