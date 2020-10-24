const express = require('express')
const app = express()
const port = 3000;

// mongodb+srv://admin:P%40ssword01@cluster0.teefr.mongodb.net/my_database?retryWrites=true&w=majority
// mongodb+srv://admin:P%40ssword01@cluster0.teefr.mongodb.net/my_database?retryWrites=true&w=majority

app.get('/', (req, res) => {
    res.send('Hello Wooorld!!!')
});

app.listen(port, () => {
    console.log('Node server running @ port ', port)
});