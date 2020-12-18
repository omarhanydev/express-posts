const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  // uri: 'mongodb://localhost:27017/sarahah',
  uri: 'mongodb+srv://admin:admin@cluster0.xnab1.mongodb.net/test',
  collection: 'sessions'
})
const flash = require('connect-flash')

// config
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false, // keep sessions after expiry,
    store
}))
app.use(flash())

// routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/signup.routes'))
app.use(require('./routes/feed.routes'))
app.use(require('./routes/account.routes'))
app.use(require('./routes/profile.routes'))

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

// database
mongoose.connect('mongodb://localhost:27017/linkedin', { useNewUrlParser: true, useUnifiedTopology: true })

// port
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
})