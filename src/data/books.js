/**
 * This file generates data to populate the application.
 */

let faker = require('faker');
const books = generate_data();

/**
 * Converts a string to Title Case (capital letters to start the principal words)
 * @param str
 * @returns {*|string|XML|void}
 */
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

/**
 * Generates book data by using Faker
 * @returns {Array} --> array of entries
 */
function generate_data() {
    let array = [];
    let book_states = ['New', 'As New', "Normal Use", "Readable"];
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
