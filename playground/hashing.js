const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = 'oHYeah!';
// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log('Salt:', salt);
//         console.log(hash);
//     })
// });

var hashedPassword = '$2a$10$7oLzugtTV4O2h5FAh.gb8.EObL42WhrE7/xtm1Yw3sAO0o56apY7i';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

// var data = {
//     id: 10
// };

// // generate token based on 'data' and 'secret'
// var token = jwt.sign(data, '123abc');
// console.log(token);

// // verify that the token data has not been tampered with, using the same secret as used to encode
// var decoded = jwt.verify(token, '123abc');
// console.log('Decoded:', decoded);


// var message = 'I am user number 1';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// // man in middle changes data and token
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed');
// }

