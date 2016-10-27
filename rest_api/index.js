var express = require('express');
var app = express();
var mysql = require('mysql');
var restResponse = require('express-rest-response');
var bodyParser = require('body-parser');
fs = require('fs');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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



app.post('/api/book', function(req, res, next) {
   var title = req.body.title;
   var author = req.body.author;
   var state = req.body.state;
   var price = req.body.price;
   var date = new Date();
   var user_id_foreign = req.body.user_id;

   var connection = connect_db();

   var sql = "INSERT INTO books(title, author, state, price, date_added, user_id_foreign) VALUES (?, ?, ?, ?, ?, ?)";
   var inserts = [title,author, state, price, date, user_id_foreign];

   sql = mysql.format(sql, inserts)
   connection.query(sql, function (error, results, fields) {
      if(error){
         res.rest.badRequest('creation failed because of bad request');
      }
      else{
         res.rest.created('creation successful');
      }

   });
   connection.end();
});


app.delete('/api/book/:id', function(req, res, next) {
   var connection = connect_db();
   var id = req.params.id;

   var sql = "DELETE FROM books WHERE book_id=?;";
   var inserts = [id];

   sql = mysql.format(sql, inserts)
   connection.query(sql, function (error, results, fields) {
      if(error){
         res.rest.badRequest('delete failed because of bad request');
      }
      else{
         res.rest.success('delete successful');
      }

   });
   connection.end();
});





// USERS
app.get('/api/user/:id', function (req, res) {
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


app.post('/api/user', function(req, res, next) {
   var image_link = req.body.image_link;
   var face_id = req.body.facebook_id;
   var first_name = req.body.first_name;
   var last_name = req.body.last_name;
   var rating = req.body.rating;
   var connection = connect_db();
   var sql = "INSERT INTO users(facebook_id, image_link, first_name, last_name, rating) VALUES (?, ?, ?, ?, ?)";

   var inserts = [face_,image_link, first_name, last_name, rating];
   sql = mysql.format(sql, inserts)
   connection.query(sql, function (error, results, fields) {
      if(error){
         res.rest.badRequest('creation failed because of bad request');
      }
      else{
         res.rest.created('creation successful');
      }

   });
   connection.end();
});

app.delete('/api/user/:id', function(req, res, next) {
   var connection = connect_db();
   var id = req.params.id;
   var sql = "DELETE FROM users WHERE user_id=?;";
   var inserts = [id];
   sql = mysql.format(sql, inserts)
   connection.query(sql, function (error, results, fields) {
      if(error){
         res.rest.badRequest('delete failed because of bad request');
      }
      else{
         res.rest.success('delete successful');
      }

   });
   connection.end();
});


app.get('/', function (req, res) {
    res.redirect('/api');
});

app.get('/api', function (req, res) {
  fs.readFile('api_doc.json', 'utf8', function (err,data) {
  res.type('application/json');
  res.send(JSON.parse(data));
  });
});



app.listen(9001, function () {
  console.log('Example app listening on port 9001!');
});
