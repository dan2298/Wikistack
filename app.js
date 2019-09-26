const express = require('express');
const morgan = require('morgan');
const { db } = require('./models/index.js');

const app = express();

app.use(morgan('dev'))
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
    res.send('hello world')
});

db.authenticate().then(() => {
    console.log('connected to the database');
})

app.listen('1337', () => {
    console.log('online')
})