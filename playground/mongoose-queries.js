const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var todoId = '5932d0a35b8e4175f51608f7';
var userId = '5930e22adebb788567a08ae8';

// if (!ObjectID.isValid(id)) {
//     console.log('Invalid ObjectID');
// }

// Finds all that match the query
// Todo.find({
//     _id: todoId
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Finds the first that matches the query
// Todo.findOne({
//     _id: todoId
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// When you want to find by just the ID
// Todo.findById(todoId).then(todo => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch(error => {
//     console.log(error);
// });

// User.findById
User.findById(userId).then(user => {
    if (!user) {
        return console.log('User not found!');
    }
    console.log('User By Id', user);
}).catch(error => {
    console.log(error);
});

