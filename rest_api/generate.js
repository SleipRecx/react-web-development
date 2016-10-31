var faker = require('faker');
var FormData = require('form-data');
var fetch = require('node-fetch');
var queryString = require('query-string');
var users = []

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function generate_user_data(number) {
    var array = [];
    for (var i = 0; i < number; i++) {
        var object = {};
        object.image = faker.image.avatar();
        object.f_name = faker.name.firstName();
        object.l_name = faker.name.lastName();
        object.userRating = Math.floor((Math.random() * 6));
        var run = true;
        while (run) {
            run = false;
            var word = faker.random.words();

            if (word.length > 24) {
                run = true;
            }
            if (word.length < 14) {
                run = true;
            }
        }
        object.title = toTitleCase(word);
        array.push(object);
    }
    return array;
}


function get_all_users(){
  var url = "http://localhost:9001/api/users"
  fetch(url).then(r => r.json())
  .then(data => users = data)
  .catch(e => console.log("async function failed"))
}

function insert_db_users(array){
  for (var i = 0; i < array.length; i++){
      var payload = {
      "image_link": array[i].image,
      "facebook_id": "0",
      "first_name": array[i].f_name,
      "last_name": array[i].l_name,
      "rating":array[i].userRating};

      var data = queryString.stringify(payload)
        fetch("http://localhost:9001/api/user",
        {
            method: "POST",
            body: data,
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
        .then(function(res){})
        .then(function(data){})
      }
}


function generate_book_data(array) {
  var books = [];
  for (var y = 0; y < array.length; y++) {
    how_many = Math.floor((Math.random() * 13)) + 3;
    for(var i = 0; i < how_many; i++){
      var object = {};
      object.price = Math.round(faker.commerce.price());
      object.added = faker.date.past().toDateString();
      object.state = Math.floor((Math.random() * 4));
      object.author = faker.name.firstName() + " " + faker.name.lastName() ;
      object.foreign = array[y];
      var run = true;
      while (run) {
          run = false;
          var word = faker.random.words();

          if (word.length > 24) {
              run = true;
          }
          if (word.length < 14) {
              run = true;
          }
      }
      object.title = toTitleCase(word);
      books.push(object);

    }
  }
  return books
}


function insert_db_books(array){
  for (var i = 0; i < array.length; i++){
      var payload = {
      "title": array[i].title,
      "author": array[i].author,
      "state": array[i].state,
      "price": array[i].price,
      "user_id_foreign":array[i].foreign};

      var data = queryString.stringify(payload)
        fetch("http://localhost:9001/api/book",
        {
            method: "POST",
            body: data,
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        })
        .then(function(res){})
        .then(function(data){})
      }
}

module.exports = {
up: function generate_mockup_data(number){
  var array = generate_user_data(number)
  insert_db_users(array);
  setTimeout(function(){
    get_all_users();
    console.log("inserted users");
    setTimeout(function(){
      var ids = []
      for(var i=0; i< users.length;i++){
        ids.push(users[i].user_id);
      }
      var books = generate_book_data(ids);
      insert_db_books(books)
        console.log("inserted books");
    }, 10000);

  },2000)
}
};
