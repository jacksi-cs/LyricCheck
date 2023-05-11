import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Divider from "@mui/material/Divider"

import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";

import React from 'react';

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getArtist } from "../lib/api-helpers";
import { ClassNames } from "@emotion/react";

import HeaderImage from "./images/artist_header.jpeg"

function Artist() {
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getArtist(id).then(setArtist).then(() => setLoading(false));
  }, [id]);


  if (loading) {
    return <h1>Loading....</h1>;
  }
  if (!artist) {
    return <>
      <h1>Artist not available</h1>;
    </>;
  }

  console.log(artist);

  const {
    name,
    genre,

    top_tracks_ids,
    top_tracks_names,

    similar_artists,
    countries_popular_in,
    views,
    followers,
    popularity,
    profanity_toxicity,
    profanity_profanity,
    profanity_identity_attack,
    profanity_sexually_explicit,
    image_url,
    spotify_uri,
    // bio_summary,
    bio_content,
  } = artist;

  const profanityAverage = profanity_identity_attack ? (
    (profanity_identity_attack + profanity_profanity + profanity_sexually_explicit + profanity_toxicity) / 4
  ) : 0;

  const split_uri = spotify_uri.split(":");
  const embed_player = "https://open.spotify.com/embed/artist/" + split_uri[2];


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
    <Container fluid>
      <header>
        <div
          className='p-5 text-center bg-image'
          style={{ backgroundImage: `url(${image_url}), url("https://images.pexels.com/photos/2117938/pexels-photo-2117938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`, height: 300, backgroundRepeat: "no-repeat, repeat-x", backgroundSize: "contain, contain", backgroundPosition: "right, left"}}
        >
            <div className='d-flex justify-content-right align-items-right h-100'>
              <div className='text-white' textAlign = "left">
                <h1 className='mb-3'>{name}</h1>
                <h4 className='mb-3'>Views: {views}</h4>
                <h4 className='mb-3'>Followers: {followers}</h4>
                <h5 className='mb-3'>Rank: #{popularity}</h5>
              </div>
            </div>
          {/* </div> */}
        </div>
      </header>

      <Row>
        <div className="mx-3 mt-4 mb-3">
          <h3>About {name}</h3>
          <ReadMore>
            {bio_content}
          </ReadMore>
        </div>
      </Row>
      <Divider></Divider>

      <Row className="my-5">
        <Col md="8">
          <Row>
            <iframe
                  title="Top Tracks"
                  src={embed_player}
                  width="100%"
                  height="400"
                  frameBorder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
            />
          </Row>
        </Col>

        <Col md="4">
          <Row>
            {profanity_identity_attack ? (
              <div>
                <h3>Profanity</h3>
                <ul>
                  <li>Average: {profanityAverage}</li>
                  <li>Identity Attack: {profanity_identity_attack}</li>
                  <li>Profanity: {profanity_profanity}</li>
                  <li>Toxicity: {profanity_sexually_explicit}</li>
                  <li>Sexually Explicit: {profanity_toxicity}</li>
                </ul>
              </div>
            ) : (
              null
            )}
            <Col>
              <h3>Similar Artists: </h3>
              <ul>
                {similar_artists.map((similar) => (
                  <li>{similar}</li>
                ))}
              </ul>

              <h3>Genre: {genre}</h3>
            </Col>
          </Row>
        </Col>
      </Row>

      <Tabs defaultActiveKey="Top-songs">
        <Tab eventKey="Top-songs" title="Top Songs" className="m-4">
          <h3>Top Songs: </h3>
          <ul>
            {top_tracks_names.map((trackName, index) => (
              top_tracks_ids[index] && top_tracks_ids[index] !== 'undefined'
                ? <li><Link to={`/song/${top_tracks_ids[index]}`}>{trackName}</Link></li>
                : <li>{trackName}</li>
            ))}
          </ul>
        </Tab>
        <Tab eventKey="Countries-popular" title="Countries Popular In" className="m-4">
          <ul>
            {countries_popular_in.map((country, index) => (
              <li><Link to={`/country/${country}`}>{country}</Link></li> // TODO: potentially have the common name portrayed rather than country code
            ))}
          </ul>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default Artist;
