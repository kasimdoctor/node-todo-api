const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const dummyTodos = [{
    _id: new ObjectID(),
    text: 'First dummy todo'
}, {
    _id: new ObjectID(),
    text: 'Second dummy todo'
}];

var userIdOne = new ObjectID();
var userIdTwo = new ObjectID();

const dummyUsers = [{
    _id: userIdOne,
    email: 'kasim@doctor.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userIdOne, access: 'auth'}, 'abc123').toString()
    }]
}, {
    _id: userIdTwo,
    email: 'guddu@kabachhu.com',
    password: 'userTwoPass'
}];

const populateTodos = (done) => {
    // Good example of Promise chaining!
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos);
    }).then((docs) => done());
};

const populateUsers = (done) => {
     User.remove({}).then(() => {
        var userOne = new User(dummyUsers[0]).save();
        var userTwo = new User(dummyUsers[1]).save();

        return Promise.all([userOne, userTwo])
     }).then(() => done());
};


module.exports = {
    dummyTodos,
    populateTodos,
    dummyUsers,
    populateUsers
}