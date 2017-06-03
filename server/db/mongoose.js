const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:root@ds163181.mlab.com:63181/todoapp'
|| 'mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};
