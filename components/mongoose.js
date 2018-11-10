const mongoose = require('mongoose');

mongoose.connect(
    process.env.mongo_connection,
    { useNewUrlParser: true }
)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB`);
});

mongoose.connection.on('error', err => {
    if(err) throw err;
});

module.exports = mongoose;