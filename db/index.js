const mongoose = require('mongoose')

const database_connection = 'mongodb+srv://admin:P%40ssword01@cluster0.teefr.mongodb.net/my_database?retryWrites=true&w=majority'

const db = () => {
    mongoose.connect(database_connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true // Suppress current Server Discovery and Monitoring engine is deprecated warning
    })
}

module.exports = {
    db
}