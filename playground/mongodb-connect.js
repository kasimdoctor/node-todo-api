// const MongoClient = require('mongodb').MongoClient;

// Using object destructuring from ES6
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         console.log('Unable to insert todo', error);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    db.collection('Users').insertOne({
        name: 'Kasim',
        age: 27,
        location: 'Montreal'
    }, (error, result) => {
        if (error) {
            console.log('Unable to insert todo', error);
        }

        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    });

    db.close();
});

