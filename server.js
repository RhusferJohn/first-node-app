const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { db } = require('./db/index')
const organization = require('./routes/organization.route')
const user = require('./routes/user.route')

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello Wooorld!!!')
})

db()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(organization)
app.use(user)

app.listen(port, () => {
    console.log('Node server running @ port ', port)
})
