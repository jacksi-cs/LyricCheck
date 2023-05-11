ALTER TABLE artists ADD top_track varchar(100);

UPDATE artists
  SET top_track = top_tracks_names[1]
  WHERE top_tracks_names IS NOT NULL;


ALTER TABLE countries ADD top_track varchar(100);
UPDATE countries
  SET top_track = top_tracks_names[1]
  WHERE top_tracks_names IS NOT NULL;
  
ALTER TABLE countries ADD top_artist varchar(100);
UPDATE countries
  SET top_artist = top_artists_names[1]
  WHERE top_artists_names IS NOT NULL;