// const MongoClient = require('mongodb').MongoClient;

// Using object destructuring from ES6
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({_id: new ObjectID('592cef19b57378807e906bae')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch Todos');
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (error) => {
    //     console.log('Unable to fetch Todos');
    // });

    // challenge
    db.collection('Users').find({name: 'Kasim'}).toArray().then((docs) => {
        console.log(`Todos:`);
        console.log(JSON.stringify(docs, undefined, 2));
    }, (error) => {
        console.log('Unable to fetch Todos');
    });
    // db.close();
});

