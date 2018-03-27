const axios = require('axios');
const controller = {};
const SpotifyWebApi = require('spotify-web-api-node');
let spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(`${process.env.API_KEY}`);
const tracks = require('../models/tracks');
const playlists = require('../models/playlists');

// var express = require('express');
// var app = express();
// var request = require('request'); // "Request" library
// var querystring = require('querystring');
// var cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const path = require('path');
// const methodOverride = require('method-override');
//
// // http://expressjs.com/en/starter/static-files.html
// // app.use(express.static('public'));
//
//
// app.use(express.static(__dirname + '/public'))
//    .use(cookieParser());
//
// require('dotenv').config();
//
// app.use(morgan('dev'));
// app.use(methodOverride('_method'));
//
//
// app.set('views', path.join(__dirname, 'views'));
// app.set ('view engine', 'ejs');
//
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
//
// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/views/index.html');
// });
//
// // app.use('/home', require('./routes/music-routes'));
// // app.use('/playlist', require('./routes/playlist-routes'));
//
//
// //-------------------------------------------------------------//
//
//
// // init Spotify API wrapper
// var SpotifyWebApi = require('spotify-web-api-node');
//
// // Replace with your redirect URI, required scopes, and show_dialog preference
// var redirectUri = 'http://localhost:8888/callback';
// var scopes = ['user-top-read'];
// var showDialog = true;
//
// // The API object we'll use to interact with the API
// var spotifyApi = new SpotifyWebApi({
//   clientId : `${process.env.CLIENT_ID}`,
//   clientSecret : `${process.env.CLIENT_SECRET}`,
//   redirectUri : redirectUri
// });
//
// app.get("/authorize", function (request, response) {
//   var authorizeURL = spotifyApi.createAuthorizeURL(scopes, null, showDialog);
//   console.log('authorize URL', authorizeURL)
//   response.send(authorizeURL);
// });
//
// // Exchange Authorization Code for an Access Token
// app.get("/callback", function (request, response) {
//   var authorizationCode = request.query.code;
//
//   spotifyApi.authorizationCodeGrant(authorizationCode)
//   .then(function(data) {
//     response.redirect(`/home/#access_token=${data.body['access_token']}&refresh_token=${data.body['refresh_token']}`)
//   }, function(err) {
//     console.log('Something went wrong when retrieving the access token!', err.message);
//   });
// });
//
// app.get("/logout", function (request, response) {
//   response.redirect('/');
// });
//
// app.get('/myendpoint', function (request, response) {
//   var loggedInSpotifyApi = new SpotifyWebApi();
//   console.log('butts', request.headers['authorization'].split(' ')[1]);
//   loggedInSpotifyApi.setAccessToken(request.headers['authorization'].split(' ')[1]);
//   // Search for a track!
//   loggedInSpotifyApi.getMyTopTracks()
//     .then(function(data) {
//       console.log(data.body);
//       response.send(data.body);
//     }, function(err) {
//       console.error(err);
//     });
//
// });
//
// app.get('*', (req, res) => {
//   res.status(404).json({
//     message: 'NOPE'
//   });
// });
//
//
// //-------------------------------------------------------------//
//
// //
// // // listen for requests :)
// // console.log('Listening on 8888');
// // app.listen(8888);

controller.playlist = (req, res) => {
  tracks.findAll()
  .then(tracks => {
    playlists.findAll()
    .then(playlists => {
      res.render('tracks/playlist', { tracks: tracks, playlists: playlists })
    })
    .catch(err => {
      res.status(400).json(err);
    });
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

// controller.artist = (req, res) => {
//   console.log('inside artist method', req.body.artist)
//   var loggedInSpotifyApi = new SpotifyWebApi();
//   console.log('butts', request.headers['authorization'].split(' ')[1]);
//   loggedInSpotifyApi.setAccessToken(request.headers['authorization'].split(' ')[1]);
//   spotifyApi.searchArtists(`${req.body.artist}`)
//   .then( artistData => {
//     let artistId = artistData.data.artists.items[0].id;
//     spotifyApi.getArtistAlbums(`${artistId}`, {limit: 10, offset: 20})
//     .then (data => {
//       tracks.findAll()
//       .then(tracks => {
//         playlists.findAll()
//         .then(playlistz => {
//           res.render('tracks/artist', {
//             tracks: tracks,
//             playlistz: playlistz,
//             data: data.data.items
//           })
//         })
//         .catch( err => {
//           console.log(err)
//           res.status(400).json(err)
//         })
//       })
//       .catch( err => {
//         console.log(err)
//         res.status(400).json(err)
//       })
//     })
//     .catch( err => {
//       console.log(err)
//       res.status(400).json(err)
//     })
//   })
//   .catch( err => {
//     console.log(err)
//     res.status(400).json(err)
//   })
// };

controller.artist = (req, res) => {
  console.log('inside artist method', req.body.artist)
  axios.get(`https://api.spotify.com/v1/search?q=${req.body.artist}&type=artist&market=US&limit=1`, { 'headers': { 'Authorization': `Bearer ${process.env.API_KEY}` } })
  .then( artistData => {
  let artistId = artistData.data.artists.items[0].id;
    axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums?&market=US&limit=50`, { 'headers': { 'Authorization': `Bearer ${process.env.API_KEY}` } })
    .then (data => {
      tracks.findAll()
      .then(tracks => {
        playlists.findAll()
        .then(playlistz => {
          res.render('tracks/artist', {
            tracks: tracks,
            playlistz: playlistz,
            data: data.data.items
          })
        })
        .catch( err => {
          console.log(err)
          res.status(400).json(err)
        })
      })
      .catch( err => {
        console.log(err)
        res.status(400).json(err)
      })
    })
    .catch( err => {
      console.log(err)
      res.status(400).json(err)
    })
  })
  .catch( err => {
    console.log(err)
    res.status(400).json(err)
  })
};

controller.album = (req, res) => {
  console.log(`inside album method`,req.body.album)
  axios.get(`https://api.spotify.com/v1/albums/${req.body.album}/tracks?&limit=30`, { 'headers': { 'Authorization': `Bearer ${process.env.API_KEY}` } })
  .then( data => {
    playlists.findAll()
    .then(playlistz => {
      res.render('tracks/album', {
        data: data.data.items,
        playlistz: playlistz
      })
    })
    .catch( err => {
      console.log(err)
      res.status(400).json(err)
    })
  })
  .catch( err => {
    console.log(err)
    res.status(400).json(err)
  })
};

controller.show = (req, res) => {
  console.log('track show method');
  playlists.findAll()
  .then(playlistz => {
    tracks.findById(req.params.id)
    .then(tracks => {
      if (tracks.playlist_id) {
        playlists.findById(tracks.playlist_id)
        .then(playlists => {
          res.render('crud-tracks/show', {
            tracks: tracks,
            playlists: playlists,
            playlistz: playlistz
          })
        })
        .catch(err => {
          res.status(400).json(err);
        });
      } else {
        res.render('crud-tracks/show', {
          tracks: tracks, playlists: undefined
        })
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

controller.edit = (req, res) => {
  tracks.findById(req.params.id)
  .then(tracks => {
    playlists.findAll()
    .then(playlists => {
      res.render('crud-tracks/edit', {
        tracks: tracks, playlists: playlists
      })
    })
    .catch(err => {
      res.status(400).json(err);
    });
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

controller.update = (req, res) => {
  console.log(`updating track`)
  tracks.update({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      track_id: req.body.track_id,
      playlist_id: parseInt(req.body.playlist_id)
  }, req.params.id)
  .then(() => {
    res.redirect(`/home/${req.params.id}`)
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

controller.new = (req, res) => {
  console.log(`inside track method`,req.body.track)
  tracks.findAll()
  .then(tracks => {
    axios.get(`https://api.spotify.com/v1/tracks/${req.body.track}?market=ES`, { 'headers': { 'Authorization': `Bearer ${process.env.API_KEY}` } })
    .then( data => {
      playlists.findAll()
        .then(playlistz => {
          res.render('crud-tracks/new', {
            tracks: tracks,
            data: data.data,
            playlistz: playlistz
          })
        })
        .catch(err => {
          res.status(400).json(err);
        });
      })
    .catch(err => {
      res.status(400).json(err);
    });
  })
  .catch( err => {
    console.log(err)
    res.status(400).json(err)
  })
};

controller.create = (req, res) => {
  console.log(`creating new track`)
  tracks.create({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      track_id: req.body.track_id,
      playlist_id: req.body.playlist_id
  })
  .then(tracks => {
    playlists.findAll()
    .then(playlists => {
      spotifyApi.addTracksToPlaylist('12152445064', `${req.body.playlist_id}`, [`spotify:track:${tracks.track_id}`])
        .then(function(data) {
          console.log('Added tracks to playlist!');
          res.redirect(`/home/${tracks.id}`)
        }, function(err) {
          console.log('Something went wrong!', req.body.playlist_id);
        });
    })
    .catch(err => {
      res.status(400).json(err);
    });
  });
};

controller.destroy = (req, res) => {
  tracks.findById(req.params.id)
  .then(tracks => {
    let trackz = [{ uri : `spotify:track:${tracks.track_id}` }];
    spotifyApi.removeTracksFromPlaylist('12152445064', `${tracks.playlist_id}`, trackz)
    .then(function(data) {
      console.log('Tracks removed from playlist!');
      res.redirect(`/playlist/${tracks.playlist_id}`)
    }, function(err) {
      console.log('Something went wrong!', err);
    });
  })
  .catch(err => {
    res.status(400).json(err);
  });
  tracks.destroy(req.params.id)
  .then(() => {
    // res.redirect(`/playlist/${playlists.playlist_id}`)
    console.log('Tracks removed from my playlist!');
  })
  .catch(err => {
    res.status(400).json(err);
  })
};

module.exports = controller;
