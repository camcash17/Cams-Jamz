// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));


app.use(express.static(__dirname + '/public'))
   .use(cookieParser());

require('dotenv').config();

app.use(morgan('dev'));
app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set ('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.use('/home', require('./routes/music-routes'));
app.use('/playlist', require('./routes/playlist-routes'));


//-------------------------------------------------------------//


// init Spotify API wrapper
var SpotifyWebApi = require('spotify-web-api-node');

// Replace with your redirect URI, required scopes, and show_dialog preference
var redirectUri = 'http://localhost:8888/callback';
var scopes = ['user-top-read'];
var showDialog = true;

// The API object we'll use to interact with the API
var spotifyApi = new SpotifyWebApi({
  clientId : `${process.env.CLIENT_ID}`,
  clientSecret : `${process.env.CLIENT_SECRET}`,
  redirectUri : redirectUri
});

app.get("/authorize", function (request, response) {
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);
  console.log('authorize URL', authorizeURL)
  response.send(authorizeURL);
});

// Exchange Authorization Code for an Access Token
app.get("/callback", function (request, response) {
  var authorizationCode = request.query.code;

  spotifyApi.authorizationCodeGrant(authorizationCode)
  .then(function(data) {
    response.redirect(`/home/#access_token=${data.body['access_token']}&refresh_token=${data.body['refresh_token']}`)
  }, function(err) {
    console.log('Something went wrong when retrieving the access token!', err.message);
  });
});

app.get("/logout", function (request, response) {
  response.redirect('/');
});

app.get('/myendpoint', function (request, response) {
  var loggedInSpotifyApi = new SpotifyWebApi();
  console.log('butts', request.headers['authorization'].split(' ')[1]);
  loggedInSpotifyApi.setAccessToken(request.headers['authorization'].split(' ')[1]);
  // Search for a track!
  loggedInSpotifyApi.getMyTopTracks()
    .then(function(data) {
      console.log(data.body);
      response.send(data.body);
    }, function(err) {
      console.error(err);
    });

});

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'NOPE'
  });
});


//-------------------------------------------------------------//


// listen for requests :)
console.log('Listening on 8888');
app.listen(8888);
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
