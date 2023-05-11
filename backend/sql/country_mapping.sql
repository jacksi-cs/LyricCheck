CREATE TABLE country_mappings (
  id varchar(50),
  name_common varchar(50),
  country_code varchar(5)
);

INSERT INTO country_mappings(id, name_common, country_code) (
	SELECT songs.id, countries.name_common, country_popular_in FROM songs,
		UNNEST(songs.countries_popular_in) AS country_popular_in
		JOIN countries ON country_popular_in = countries.country_code
);

INSERT INTO country_mappings(id, name_common, country_code) (
  SELECT artists.id, countries.name_common, country_popular_in FROM artists,
    UNNEST(artists.countries_popular_in) AS country_popular_in
  	JOIN countries ON country_popular_in = countries.country_code
);