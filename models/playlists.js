const db = require('../db/config');

const Playlists = {};

Playlists.findAll = () => {
  return db.query('SELECT * FROM playlists ORDER BY id ASC');
};

Playlists.findById = (id) => {
  return db.oneOrNone(`SELECT * FROM playlists WHERE playlist_id = $1`, [id])
}

Playlists.findByTitle = (title) => {
  return db.oneOrNone(`SELECT * FROM playlists WHERE title = $1`, [title])
}

Playlists.update = (playlist, id) => {
  console.log("this is playlists.update: ", playlist,id)
  return db.none(
    `
      UPDATE playlists SET
      title = $1,
      playlist_id =$2
      WHERE id = $3
    `,
    [playlist.title, playlist.playlist_id, id]
  );
};

Playlists.create = playlist => {
  return db.one(
    `
      INSERT INTO playlists
      (title, playlist_id)
      VALUES ($1, $2) RETURNING *
    `,
    [playlist.title, playlist.playlist_id]
  );
};

Playlists.destroy = id => {
  return db.none(
    `
      DELETE FROM playlists
      WHERE id = $1
    `,
    [id]
  );
};

module.exports = Playlists;
