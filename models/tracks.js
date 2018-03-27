const db = require('../db/config');

const Tracks = {};

Tracks.findAll = () => {
  return db.query('SELECT * FROM tracks ORDER BY id ASC');
};

Tracks.findById = (id) => {
  // console.log(db)
  return db.oneOrNone(`SELECT * FROM tracks WHERE id = $1`, [id])
}

Tracks.findByPid = (playlist_id) => {
  // console.log(db)
  return db.any(`SELECT * FROM tracks WHERE playlist_id = $1`, [playlist_id])
}


Tracks.update = (track, id) => {
  return db.none(
    `
      UPDATE tracks SET
      title = $1,
      artist = $2,
      album = $3,
      track_id = $4,
      playlist_id =$5
      WHERE id = $6
    `,
    [track.title, track.artist, track.album, track.track_id, track.playlist_id, id]
  );
};

Tracks.create = track => {
  return db.one(
    `
      INSERT INTO tracks
      (title, artist, album, track_id, playlist_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
    [track.title, track.artist, track.album, track.track_id, track.playlist_id]
  );
};

Tracks.playlistDestroy = id => {
  return db.none(
    `
    DELETE FROM tracks
    WHERE playlist_id = $1
    `,
    id
  );
};

Tracks.destroy = id => {
  return db.none(
    `
      DELETE FROM tracks
      WHERE id = $1
    `,
    id
  );
};

module.exports = Tracks;
