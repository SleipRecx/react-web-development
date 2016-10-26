let faker = require('faker');
const books = generate_data();


function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function generate_data() {
    let array = [];
    let book_states = ['1', '2', "3", "4"];
    for (let i = 0; i < 24; i++) {
        let object = {};
        object.id = i;
        object.image = faker.image.avatar();
        object.user = faker.name.firstName();
        object.price = Math.round(faker.commerce.price()) + " kr";
        object.added = faker.date.past().toDateString();
        object.userRating = Math.floor((Math.random() * 6));
        object.state = book_states[Math.floor((Math.random() * 4))];
        let run = true;
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

export default books;
