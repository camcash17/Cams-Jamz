const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');
let spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(`${process.env.API_KEY}`);

const pController = {};
const tracks = require('../models/tracks');
const playlists = require('../models/playlists');

pController.show = (req,res) => {
  console.log(`show playlist`);
  playlists.findAll()
  .then(playlistz => {
    console.log(`playlist findAll`);
    playlists.findById(req.params.id)
    .then(playlists => {
        tracks.findByPid(req.params.id)
        .then(tracks => {
          console.log(tracks);
          res.render('crud-playlists/show-p', {
            tracks: tracks,
            playlists: playlists,
            playlistz: playlistz
          })
        })
        .catch(err => {
          console.log('tracks findby pid error', err)
          res.status(400).json(err);
        });
      })
    .catch(err => {
      console.log('playlist find by id error', err)
      res.status(400).json(err);
    });
  })
  .catch(err => {
    res.status(400).json(err);
  });
};

pController.edit = (req, res) => {
  console.log(`playlist edit`);
  playlists.findAll()
  .then(playlistz => {
    console.log(`playlist findAll`);
    playlists.findById(req.params.id)
    .then(playlists => {
      res.render('crud-playlists/edit-p', {
        playlists: playlists,
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
};

pController.update = (req, res) => {
  console.log(`updating playlist`)
  spotifyApi.changePlaylistDetails('12152445064', `${req.body.playlist_id}`, {
     name: `${req.body.title}`
  })
  .then(function(data) {
     console.log('Playlist name updated!');
     playlists.update({
       title: req.body.title,
       playlist_id: req.body.playlist_id
     }, req.params.id)
     .then(() => {
         res.redirect(`/playlist/${req.body.playlist_id}`)
     })
     .catch(err => {
         res.status(400).json(err);
     });
  }, function(err) {
    console.log('Something went wrong!', err);
  });

};

pController.new = (req, res) => {
  console.log(`new playlist`)
  playlists.findAll()
  .then(playlistz => {
    res.render('crud-playlists/new-p', {
      playlistz: playlistz
    })
  })
  .catch( err => {
    console.log(err)
    res.status(400).json(err)
  })
};

pController.create = (req, res) => {
  console.log(`creating new playlist`)
    spotifyApi.createPlaylist('12152445064', `${req.body.playlist}`, { 'public' : false })
      .then(function(data) {
        console.log(data);
        playlists.create({
          title: req.body.playlist,
          playlist_id: data.body.id
        })
        .then(playlists => {
        res.redirect(`/playlist/${playlists.playlist_id}`)
        })
        .catch(err => {
          res.status(400).json(err);
        })
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  };

pController.destroy = (req, res) => {
  let playlistId = req.params.id
  playlists.destroy(playlistId)
  .then(() => {
    tracks.playlistDestroy(playlistId)
    res.redirect(`/home`)
  })
  .catch(err => {
    res.status(400).json(err);
  });
};


module.exports = pController;
