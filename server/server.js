const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');

var app = express();

// middleware for express to parse the request to JSON
app.use(bodyParser.json());
app.post('/todos', (request, response) => {
    var todo = new Todo({
        text: request.body.text,
        completed: request.body.completed
    });

    todo.save().then((document) => {
        response.send(document);
    }, (error) => {
        response.status(400);
        response.send(error);
    });
});

app.get('/todos', (request, response) => {

    Todo.find().then(todos => {
        response.send({todos});
    }).catch(error => {
        response.status(400).send(error);
    })
})

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {
    app
};
