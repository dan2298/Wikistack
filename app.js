const express = require('express');
const morgan = require('morgan');
const { db, User, Page } = require('./models/index.js');
const wiki = require('./routes/wiki')
const user = require('./routes/user')
const app = express();


app.use(morgan('dev'))
app.use(express.static(__dirname + "/views"));
app.use(express.urlencoded({ extended: false }))
app.use('/wiki', wiki)
app.use('/user', user)


app.get('/', (req, res, next) => {
    res.redirect('/wiki')
});

db.authenticate().then(() => {
    console.log('connected to the database');
})
const init = async () => {
    await db.sync({ force: true })
    await User.sync()
    await Page.sync()
}

init()

app.listen('1337', () => {
    console.log('online')
})

