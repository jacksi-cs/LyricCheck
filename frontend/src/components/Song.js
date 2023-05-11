import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider"


import { getSong } from "../lib/api-helpers";


function Song() {
  const [loading, setLoading] = useState(true);
  const [song, setSong] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    getSong(id)
      .then(setSong)
      .then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <h1>Loading....</h1>;
  }
  if (!song) {
    return <h1>404</h1>;
  }

  console.log('song', song);

  const {
    album_name,
    artist_id,
    artist_name,
    description_content,
    // description_summary,
    genre,
    image_url,
    lyrics,
    name,
    profanity_identity_attack,
    profanity_profanity,
    profanity_sexually_explicit,
    profanity_toxicity,
    views,

    // album_id,
    // artist_spotify_id,
    countries_popular_in, // TODO
    // spotify_id,
    spotify_uri,
  } = song;

  const split_uri = spotify_uri?.split(":") || ['', ''];
  const embed_player = "https://open.spotify.com/embed/track/" + split_uri[2];

  // https://www.geeksforgeeks.org/how-to-create-a-read-more-component-in-reactjs/
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 700) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...show more" : " show less"}
        </span>
      </p>
    );
  };

  return (
    <Container fluid style={{ paddingBottom: '60px' }}>
      <Row className="sticky">
        {embed_player!="https://open.spotify.com/embed/track/undefined" ? (
          <div>
            <iframe
              title="Top Tracks"
              src={embed_player}
              width="100%"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />
          </div>
            ) : (
              null
        )}
      </Row>

      <header>
        <div
            className='p-5 text-center bg-image'
            style={{ backgroundImage: `url(${image_url}), url("https://images.pexels.com/photos/2117938/pexels-photo-2117938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`, height: 300, backgroundRepeat: "no-repeat, repeat-x", backgroundSize: "contain, contain", backgroundPosition: "right, left"}}
        >
          <div className='d-flex justify-content-right align-items-right h-100'>
            <div className='text-white' textAlign = "left">
              <h1 className='mb-3'>{name}</h1>
              <h4 className='mb-3'>By: <Link to={`/artist/${artist_id}`} className="text-white">{artist_name}</Link> </h4>
              <h4 className='mb-3'>Album: {album_name}</h4>
              <h5 className='mb-3'>Views: {views}</h5>
            </div>
          </div>
        </div>
      </header>

      <Row>
        <Col md="8">
          {description_content ? (
            <div>
              <Row className="my-3">
                <h3>About {name}</h3>
                <ReadMore>
                  {description_content.substring(0, description_content.length - 191)}
                </ReadMore>
              </Row>
              <Divider></Divider>
            </div>
          ) : (
            null
          )}

          {lyrics ? (
            <Row className="my-3">
              <h3>Lyrics</h3>
              <p style={{ "white-space": "pre-line" }}> {
                lyrics.substring(0, lyrics.indexOf('*******'))
                || 'No lyrics available.'
              }</p>          
            </Row>
          ) : (
            null
          )}
        </Col>

        <Col md="4">
          <Row className="my-3">
            {profanity_identity_attack ? (
              <div>
                <h3>Profanity</h3>
                <ul>
                  <li>Identity Attack: {profanity_identity_attack}</li>
                  <li>Profanity: {profanity_profanity}</li>
                  <li>Toxicity: {profanity_sexually_explicit}</li>
                  <li>Sexually Explicit: {profanity_toxicity}</li>
                </ul>
              </div>
            ) : (
              null
            )}
          </Row>
          <div className="my-3">
            <h3>Genre: {genre}</h3>
          </div>
          {countries_popular_in ? (
            <div>
              <h3>Countries Popular In: </h3>
              <ul>
                {countries_popular_in.map((country, index) => (
                  <li><Link to={`/country/${country}`}>{country}</Link></li>
                ))}
              </ul>
            </div>
          ) : (
            null
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Song;
