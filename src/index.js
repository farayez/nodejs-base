const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');
const path = require('path');

// Configure .env file parser
const dotenv = require('dotenv');
dotenv.config();

// Configure Express and EJS
app.use(express.json());
app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure Session
const session = require('express-session');
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET',
    }),
);

// Define routes
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);
app.get('/auth', function (req, res) {
    res.render('pages/auth');
});

/*  PASSPORT SETUP  */

const passport = require('passport');
var userProfile;
app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) =>
    res.render('pages/success', { user: userProfile }),
);
app.get('/error', (req, res) => res.send('error logging in'));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            userProfile = profile;
            return done(null, userProfile);
        },
    ),
);

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        // Successful authentication, redirect success.
        res.redirect('/success');
    },
);

// Initialize application
db.init()
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log('Listening on port ' + port));
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

// Teardown application
const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
