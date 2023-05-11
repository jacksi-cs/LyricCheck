# Python unit tests
import unittest

import flask_unittest

# import flask_api.App
import app
import json

# https://dev.to/totally_chase/a-guide-to-testing-flask-applications-using-unittest-2k4n


class UnitTests(flask_unittest.ClientTestCase):

    # app = flask_api.App.app
    app = app.app

    # /songs
    def test_get_songs_list(self, client):
        res = client.get("/songs")
        songs_list = json.loads(res.data)
        assert songs_list["meta"]["total"] > 0

    # /songs/id
    def test_get_song_by_id(self, client):
        res = client.get("/songs/a6fab057-cf3a-4456-950e-d3edaf219326")
        song = json.loads(res.data)
        assert song["data"]["attributes"]["name"] == "All I Want for Christmas Is You"

    # /artists
    def test_get_artists_list(self, client):
        res = client.get("/artists")
        artists_list = json.loads(res.data)
        assert artists_list["meta"]["total"] > 0

    # /artists/id
    def test_get_artist_by_id(self, client):
        res = client.get("/artists/cc197bad-dc9c-440d-a5b5-d52ba2e14234")
        artist = json.loads(res.data)
        assert artist["data"]["attributes"]["name"] == "Coldplay"

    # /countries
    def test_get_country_list(self, client):
        res = client.get("/countries")
        country_list = json.loads(res.data)
        assert country_list["meta"]["total"] > 0

    # /countries/code
    def test_get_country_by_code(self, client):
        res = client.get("/countries/HK")
        country = json.loads(res.data)
        assert country["data"]["attributes"]["name_common"] == "Hong Kong"


if __name__ == "__main__":
    unittest.main()
