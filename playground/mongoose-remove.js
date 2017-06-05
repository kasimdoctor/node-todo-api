const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// 1. Todo.remove({}) - removes everything, however you dont get the docs back
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// 2. Removes one, and also returns that removed document
Todo.findOneAndRemove({text: 'Eat healthy'}).then((todo) => {
    console.log('findOneAndRemove:', todo);
}); 

// 3. Finds by the ObjectID, then removes it and returns the removed dosument
// Todo.findByIdAndRemove('5934ae14fb4d5cf81700b6b1').then((todo) => {
//     console.log('findByIdAndRemove:', todo);
// });
