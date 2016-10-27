var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'it2810-07.idi.ntnu.no',
  user     : 'gruppe7',
  password : 'brusjan07',
  database : 'book_db'
});
connection.connect();

connection.query('SELECT * from books', function(err, rows, fields) {
  if (err) throw err;
  console.log(rows);
});

connection.end();
