const express = require('express')
const app = express()
const { db } = require('./db/index')
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello Wooorld!!!')
})

db()

app.listen(port, () => {
    console.log('Node server running @ port ', port)
})