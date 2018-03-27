CREATE TABLE IF NOT EXISTS tracks (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  artist VARCHAR(255),
  album VARCHAR(255),
  track_id VARCHAR(255),
  playlist_id VARCHAR(255)
);
