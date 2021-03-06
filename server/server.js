require('./config/config')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo.js');
const {User} = require('./models/user.js');
const {authenticate} = require('./middleware/authenticate')

const port = process.env.PORT;
var app = express();

// middleware for express to parse the request to JSON
app.use(bodyParser.json());

// POST /todos - create a TODO
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

// GET /todos - Get all TODOs
app.get('/todos', (request, response) => {

    Todo.find().then(todos => {
        response.send({todos});
    }).catch(error => {
        response.status(400).send(error);
    });
});

// GET /todos/1234 - 
app.get('/todos/:id', (request, response) => {
    // The ID will be inside req.params object
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send('Invalid Id.');
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            response.status(404).send('No Todo found for Id.');
        } else {
            // success path
            response.send({todo});
        }
    }).catch(error => {
        response.status(400).send('');
    });
});

app.delete('/todos/:id', (request, response) => {
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send('Invalid Id.');
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            response.status(404).send("No Todo found for Id.");
        } else {
            // success path
            response.send({todo});
        }
    }).catch((error) => {
        response.status(500).send();
    });
});

app.patch('/todos/:id', (request, response) => {
    var id = request.params.id;
    var body = _.pick(request.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return response.status(404).send('Invalid Id.');
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            response.status(404).send('No Todo found for Id.');
        } else {
            response.send({todo});
        }
    }).catch((error) => {
        response.status(500).send();
    });
});

// POST /users
app.post('/users', (request, response) => {
    var body = _.pick(request.body, ['email', 'password']);

    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        response.header('x-auth', token).send(user);
    }).catch((error) => {
        response.status(500).send(error);
    });
});

// using middleware 'Authentication' in this route:
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', (request, response) => {
    var body = _.pick(request.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            response.header('x-auth', token).send(user);
        });
    }).catch((error) => {
        response.send(401).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};
