const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// 'mongodb://admin:root@ds163181.mlab.com:63181/todoapp'
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose
};
