// const MongoClient = require('mongodb').MongoClient;

// Using object destructuring from ES6
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, db) => {
    if (error) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to MongoDB server');

    // 1. finds a document and then updates it
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('592f753b4c385b70b62fa1f1')
    // }, 
    
    // // takes one or more mongoDb operators, e.g. $set used here
    // {
    //     $set: {
    //         completed: true
    //     }
    // }, 
    
    // // options Object - optional settings
    // {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('592cf0017c2fb5817fda68a1')
    }, 
    
    // takes one or more mongoDb operators, e.g. $set used here
    {
        $set: {
            name: 'Guddu ka Guddu'
        },
        $inc: {
            age: -1
        }
    }, 
    
    // options Object - optional settings
    {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});

