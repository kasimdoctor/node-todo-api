var user = {
    name: 'Kasim',
    age: 27,
    likes: [
        'Poutine',
        'Ice-cream'
    ],
    country: 'Canada'
};

// ES5
let es5Country = user.country;
console.log('ES5 country:', es5Country);

// ES6
let {country} = user;
console.log('ES6 country:', country);

// Another ES6 example
var {likes} = user;
console.log('ES6 Likes:', likes);
