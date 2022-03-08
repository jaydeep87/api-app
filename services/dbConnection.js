const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

module.exports = function (dbURL, done) {
    mongoose.connect(dbURL, { useNewUrlParser: true, bufferMaxEntries: 0, useUnifiedTopology: true });
    mongoose.connection
        .once('open', () => {
            console.log('Mongodb connection opened.')
            done("Mongodb connection opened.")
        })
        .on('error', (error) => {
            console.log('Mongodb Connection Error Occured.')
            done('error' + error);
        })
        .on('disconnected', function () {
            console.log('Mongodb connection disconnected.')
            done("Mongodb db connection is disconnected");
        })
        .on('connected', () => {
            console.log('Mongodb connected.')
            done("Mongodb connected.")
        })
}
