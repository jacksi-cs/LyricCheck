import os
from flask import Flask
from flask_restless import APIManager
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

from dotenv import load_dotenv
from flask_cors import CORS


app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

load_dotenv()
postgres_uri = f'{os.getenv("DB")}://{os.getenv("DB_USER")}:{os.getenv("DB_PASSWORD")}@{os.getenv("DB_HOST")}:{os.getenv("DB_PORT")}/postgres'
app.config["SQLALCHEMY_DATABASE_URI"] = postgres_uri

db = SQLAlchemy(app)


@app.route("/")
def hello_world():
    return "Lyriccheck API provides profanity information regarding charting songs and artists around the world!"


class Songs(db.Model):
    id = db.Column(
        db.String(50),
        ForeignKey("country_mappings.id"),
        primary_key=True,
        unique=True,
        nullable=False,
    )
    spotify_id = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    artist_name = db.Column(db.String(100), nullable=False)
    artist_id = db.Column(db.String(50), nullable=False)
    artist_spotify_id = db.Column(db.String(50), nullable=False)

    genre = db.Column(db.String(50), nullable=False)
    album_name = db.Column(db.String(100), nullable=False)
    album_id = db.Column(db.String(50), nullable=False)

    countries_popular_in = db.Column(db.ARRAY(db.String(2)), nullable=False)

    views = db.Column(db.Integer, nullable=False)
    profanity_toxicity = db.Column(db.Float, nullable=True)
    profanity_profanity = db.Column(db.Float, nullable=True)
    profanity_identity_attack = db.Column(db.Float, nullable=True)
    profanity_sexually_explicit = db.Column(db.Float, nullable=True)
    profanity_average = db.Column(db.Float, nullable=True)

    lyrics = db.Column(db.Text, nullable=True)
    description_summary = db.Column(db.Text, nullable=True)
    description_content = db.Column(db.Text, nullable=True)

    image_url = db.Column(db.String(100), nullable=False)
    spotify_uri = db.Column(db.String(50), nullable=False)
    search = db.Column(db.Text, nullable=False)

    # toString
    def __repr__(self):
        return f"Song('{self.name}', '{self.album_name}', '{self.artist_id}')"


class Artists(db.Model):
    id = db.Column(
        db.String(50),
        ForeignKey("country_mappings.id"),
        primary_key=True,
        unique=True,
        nullable=False,
    )
    name = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.String(50), nullable=False)

    top_tracks_ids = db.Column(db.ARRAY(db.String(50)), nullable=False)
    top_tracks_names = db.Column(db.ARRAY(db.String(100)), nullable=False)
    top_track = db.Column(db.String(100), nullable=False)

    similar_artists = db.Column(db.ARRAY(db.String(50)), nullable=False)
    countries_popular_in = db.Column(db.ARRAY(db.String(2)), nullable=False)

    views = db.Column(db.Integer, nullable=False)
    followers = db.Column(db.Integer, nullable=False)
    popularity = db.Column(db.Integer, nullable=False)
    profanity_toxicity = db.Column(db.Float, nullable=True)
    profanity_profanity = db.Column(db.Float, nullable=True)
    profanity_identity_attack = db.Column(db.Float, nullable=True)
    profanity_sexually_explicit = db.Column(db.Float, nullable=True)
    profanity_average = db.Column(db.Float, nullable=True)

    image_url = db.Column(db.String(250), nullable=False)
    spotify_uri = db.Column(db.String(50), nullable=False)
    bio_summary = db.Column(db.Text, nullable=True)
    bio_content = db.Column(db.Text, nullable=True)
    search = db.Column(db.Text, nullable=False)

    # toString
    def __repr__(self):
        return f"Artist('{self.name}', '{self.genres}')"


class Countries(db.Model):
    country_code = db.Column(
        db.String(5), primary_key=True, unique=True, nullable=False
    )
    name_common = db.Column(db.String(50), nullable=False)
    name_official = db.Column(db.String(200), nullable=False)

    region = db.Column(db.String(10), nullable=False)
    subregion = db.Column(db.String(50), nullable=False)
    continents = db.Column(db.ARRAY(db.String(50)), nullable=False)
    languages = db.Column(db.ARRAY(db.String(50)), nullable=False)

    profanity_toxicity = db.Column(db.Float, nullable=True)
    profanity_profanity = db.Column(db.Float, nullable=True)
    profanity_identity_attack = db.Column(db.Float, nullable=True)
    profanity_sexually_explicit = db.Column(db.Float, nullable=True)
    profanity_average = db.Column(db.Float, nullable=True)

    top_tracks_ids = db.Column(db.ARRAY(db.String(50)), nullable=False)
    top_tracks_names = db.Column(db.ARRAY(db.String(200)), nullable=False)
    top_track = db.Column(db.String(100), nullable=False)

    top_artists_ids = db.Column(db.ARRAY(db.String(50)), nullable=False)
    top_artists_names = db.Column(db.ARRAY(db.String(200)), nullable=False)
    top_artist = db.Column(db.String(100), nullable=False)

    flags_svg = db.Column(db.String(100), nullable=False)
    search = db.Column(db.Text, nullable=False)

    # toString
    def __repr__(self):
        return f"Country('{self.country_code}', '{self.name_common}', '{self.region}')"


manager = APIManager(app, session=db.session)

manager.create_api(Countries, methods=["GET"], url_prefix="")
manager.create_api(Artists, methods=["GET"], url_prefix="")
manager.create_api(Songs, methods=["GET"], url_prefix="")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
