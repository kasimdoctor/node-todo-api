const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// 'mongodb://admin:root@ds163181.mlab.com:63181/todoapp'
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};

