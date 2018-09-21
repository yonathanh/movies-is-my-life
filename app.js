
require('dotenv').config(); // whats this?

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const favicon       = require('serve-favicon');
const hbs           = require('hbs');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const path          = require('path');
const app           = express();
// for login passport
const session       = require("express-session");
const bcrypt        = require("bcryptjs");
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// for the flash messeges
const flash = require("connect-flash");

// User model
const User = require("./models/User");


//for login passport
app.use(flash());

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user, { message: "Logged In" });
  });
}));

app.use(passport.initialize());
app.use(passport.session());
// end login passport

//.connect('mongodb://localhost/movies-is-my-life-app', {useNewUrlParser: true})  
mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'I Live In A Movie App';

// to use the user logged in, information in every page
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


//------------------  All Routs

//--------  Main rout
const index = require('./routes/index');
app.use('/', index);

//--------  cinema routs
const cinema = require('./routes/cinema');
app.use('/', cinema);

// --------  Movies routs
const movies = require('./routes/movies');
app.use('/', movies);

//--------- user rout
const user = require('./routes/user');
app.use('/', user);

//--------- Api rout
// const apiRoute = require('./routes/api')
// app.use('/api', apiRoute)

//--------  login routs
const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);




module.exports = app;
