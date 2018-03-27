const express = require('express');
const authRouter = express.Router();
const passport = require('../services/auth/local');
const authHelpers = require('../services/auth/auth-helpers');
// const usersController = require('../controllers/users-controller');
var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    swig = require('swig'),
    SpotifyStrategy = require('passport-spotify').Strategy;

var consolidate = require('consolidate');
// authRouter.set('views', __dirname + '/views');
// authRouter.set('view engine', 'ejs');
//
// authRouter.use(cookieParser());
// authRouter.use(bodyParser());
// authRouter.use(methodOverride());
// authRouter.use(session({ secret: 'go_green' }));
// // Initialize Passport!  Also use passport.session() middleware, to support
// // persistent login sessions (recommended).
// authRouter.use(passport.initialize());
// authRouter.use(passport.session());
//
// authRouter.use(express.static(__dirname + '/public'));

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login');
}



authRouter.get('/account', ensureAuthenticated, function(req, res){
  res.render('auth/account.ejs', { user: req.user });
});

authRouter.get('/login', function(req, res){
  res.render('auth/login.ejs', { user: req.user });
});

// GET /auth/spotify
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in spotify authentication will involve redirecting
//   the user to spotify.com. After authorization, spotify will redirect the user
//   back to this authRouterlication at /auth/spotify/callback
authRouter.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

// GET /auth/spotify/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request. If authentication fails, the user will be redirected back to the
//   login page. Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
authRouter.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/home');
  });

authRouter.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = authRouter;
