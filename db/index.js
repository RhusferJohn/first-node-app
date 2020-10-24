const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const database_connection = process.env.MONGODB_URI

const db = () => {
    mongoose.connect(database_connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true // Suppress current Server Discovery and Monitoring engine is deprecated warning
    })
}

module.exports = {
    db
}