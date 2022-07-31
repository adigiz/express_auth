const express = require('express');
const session = require('express-session');
const passport = require('./lib/passport')
const morgan = require('morgan')
const cloudinary = require('cloudinary').v2;
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const router = require('./router');

const port = process.env.PORT;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'rahasia',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session())

app.set('view engine', 'ejs');

app.use(morgan('combined'))
app.use(router)
  
app.listen(port, () => {
    console.log('Server is Running')
})