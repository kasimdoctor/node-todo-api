// const MongoClient = require('mongodb').MongoClient;

// Using object destructuring from ES6
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    // 1. deleteMany - delete multiple documents
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    
    // 2. deleteOne - delete just one document
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    
    // 3. findOneAndDelete - deletes and returns the document back
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // Challenge
    // db.collection('Users').deleteMany({name: 'Kasim'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('592e32621c4b0914b9fc1f58')})
        .then((result) => {
            console.log(result);
    });
    
    // db.close();
});

