var express = require('express');
var app = express();
var mysql = require('mysql');
var restResponse = require('express-rest-response');
var bodyParser = require('body-parser');
fs = require('fs');
var generate = require('./generate');

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
    database : 'book_db',
    multipleStatements: true
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
  var sql = "SELECT * FROM books WHERE user_id_foreign = ? order by book_id ";
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


app.get('/api/all/books/users', function (req, res) {
  connection = connect_db();
  var sql = "SELECT * FROM books JOIN users on user_id_foreign=user_id order by book_id ";
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

app.get('/api/all/books/users/limit/:length', function (req, res) {
  connection = connect_db();
  var length = req.params.length
  var sql = "SELECT * FROM books JOIN users on user_id_foreign=user_id order by book_id DESC limit ?, 20";
  var length =  parseInt(length)
  var inserts = [length];
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

app.get('/api/all/books/user/:id', function (req, res) {
  connection = connect_db();
  var id = req.params.id
  var sql = 'select * from books join users on books.user_id_foreign = users.user_id where user_id_foreign = ? order by book_id DESC'
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
   var user_id_foreign = req.body.user_id_foreign;

   if(req.body.date != null){
      // TODO: fix dates
      date = new Date()
   }
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

app.get('/api/user/face/:face_id', function (req, res) {
  connection = connect_db();
  var id = req.params.face_id
  var sql = "SELECT * FROM users WHERE facebook_id = ?";
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
   var email = req.body.email;
   var rating = req.body.rating;
   var connection = connect_db();
   var sql = "INSERT INTO users(facebook_id, image_link, first_name, last_name, rating, email) VALUES (?, ?, ?, ?, ?, ?)";

   var inserts = [face_id,image_link, first_name, last_name, rating, email];
   sql = mysql.format(sql, inserts)
   connection.query(sql, function (error, results, fields) {
      if(error){
         res.rest.badRequest('creation failed because of bad request');
      }
      else{

        res.rest.success(results);
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


app.delete('/api/down', function (req, res) {
  var connection = connect_db();
  var sql = "DELETE FROM books; DELETE FROM users;ALTER TABLE users AUTO_INCREMENT = 1;ALTER TABLE books AUTO_INCREMENT = 1;";
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

app.post('/api/up', function (req, res) {
  var connection = connect_db();
  var number = req.body.number;
  generate.up(number);
  res.rest.success('Wait 15 seconds');
});



app.get('/api', function (req, res) {
  fs.readFile('api_doc.json', 'utf8', function (err,data) {
  res.type('application/json');
  res.send(JSON.parse(data));
  });
});

app.get('/', function (req, res) {
    res.redirect('/api');
});


app.listen(9001, function () {
  console.log('Example app listening on port 9001!');
});
