const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {dummyTodos, populateTodos, dummyUsers, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('Should create a new TODO', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })

            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            });
    });

    it('Should not create TODO with invalid data', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(e => done(e));
            });
    });

});

describe('GET /todos', () => {
    it('Should get all TODOS', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return TODO doc', (done) => {
        request(app)
            .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(dummyTodos[0].text);
            })
            .end(done);
    });

    it('Should return 404 if TODO not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 for invalid ObjectIDs', (done) => {
        request(app)
            // passing an invalid id like 123
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('Should remove a TODO', (done) => {
        var hexId = dummyTodos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    done();
                }).catch((error) => done(error));
            });
    });

    it('Should return 404 if TODO not found', (done) => {
        request(app)
            .delete(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 if ID is invalid', (done) => {
        request(app)
            // passing an invalid id like 123
            .delete(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('GET /users/me', () => {
    it('Should return a user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            // setting a header using supertest
            .set('x-auth', dummyUsers[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(dummyUsers[0]._id.toHexString());
                expect(res.body.email).toBe(dummyUsers[0].email);
            })
            .end(done);
    });

    it('Should return a 401 if NOT authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    it('Should create a USER', (done) => {
        var email = 'example@example.com';
        var password = '123qwerty';
        
        request(app)
            .post('/users')
            .send({email, password})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
                expect(res.body._id).toExist();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }

                User.findOne({email}).then((user) => {
                    expect(user).toExist();
                    // since password should be hashed, they are no longer equal
                    expect(user.password).toNotBe(password);
                    done();
                });
            });
    });

    it('Should return validation errors if request invalid', (done) => {
        // using invalid email and password
        var email = 'example@.com';
        var password = '123';

        request(app)
            .post('/users')
            .send({email, password})
            .expect(500)
            .end(done);
    });

    it('Should not create user if email already used', (done) => {
         request(app)
            .post('/users')
            .send({
                email: dummyUsers[0].email, 
                password: dummyUsers[0].password
            })
            .expect(500)
            .end((err, res) => {
                User.find().then((users) => {
                    // check if there are still 2 users from test dummy data
                    expect(users.length).toBe(2);
                    done();
                }).catch((error) => done(error));
            });
    });
});

describe('POST /users/login', () => {
    it('Should login user and return auth token', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: dummyUsers[1].email,
                password: dummyUsers[1].password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toExist();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(dummyUsers[1]._id).then((user) => {
                    expect(user.tokens[0]).toInclude({
                        access: 'auth',
                        token: res.headers['x-auth']
                    });
                    done();
                }).catch((error) => done(error));
            });
    });

    it('Should reject invalid login', (done) => {
        request(app)
            .post('/users/login')
            .send({
                email: dummyUsers[1].email,
                password: 'password!'
            })
            .expect(401)
            .end(done);
    });
});
