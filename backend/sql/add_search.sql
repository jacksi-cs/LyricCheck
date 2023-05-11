ALTER TABLE songs ADD search text;
UPDATE songs SET search =
   COALESCE(name,'') || '-----' || COALESCE(artist_name,'') || '-----' || COALESCE(album_name,'') || '-----' || COALESCE(genre,'');


ALTER TABLE artists ADD search text;
UPDATE artists SET search =
   COALESCE(name, '') || '-----' || COALESCE(top_track, '') || '-----' || COALESCE(genre, '');


ALTER TABLE countries ADD search text;
UPDATE countries SET search =
  COALESCE(name_common, '') || '-----' || COALESCE(region, '') || '-----' || COALESCE(top_track, '') || '-----' || COALESCE(top_artist, '');
