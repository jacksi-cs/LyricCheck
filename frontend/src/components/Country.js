import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { getCountry } from "../lib/api-helpers";
import { Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


function Country() {
  const [loading, setLoading] = useState(true);
  const [country, setCountry] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getCountry(id).then(setCountry).then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <h1>Loading....</h1>;
  }
  if (!country) {
    return <>
      <h1>Country not available</h1>;
    </>;
  }

  console.log(country)

  const {
    continents,
    country_code,
    flags_svg,
    languages,
    name_common,
    name_official,
    profanity_identity_attack,
    profanity_profanity,
    profanity_sexually_explicit,
    profanity_toxicity,
    // region,
    subregion,
    top_artists_ids,
    top_artists_names,
    top_tracks_ids,
    top_tracks_names
  } = country;

  const profanityAverage = profanity_identity_attack ? (
    (profanity_identity_attack + profanity_profanity + profanity_sexually_explicit + profanity_toxicity) / 4
  ) : 0;

  return (
    <Container fluid>
      <header>
        <div
            className='p-5 text-center bg-image'
            style={{ backgroundImage: `url(${flags_svg}), url("https://images.pexels.com/photos/2117938/pexels-photo-2117938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`, height: 300, backgroundRepeat: "no-repeat, repeat-x", backgroundSize: "contain, contain", backgroundPosition: "right, left"}}
        >
          <div className='d-flex justify-content-right align-items-right h-100'>
            <div className='text-white' textAlign = "left">
              <h1 class="text-center">{name_common}</h1>
              <h4 class="text-center">Official Name: {name_official}</h4>
              <h5 class="text-center">Country Code: {country_code}</h5>
              <h5 class="text-center">Located in {subregion}</h5>
              <h5 class="text-center">Continent: {continents[0]} </h5>
            </div>
          </div>
        </div>
      </header>

      <Row className="m-2">
        <iframe
          title={name_common}
          height="450"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAy_1LtpV0tyDKPi9-COEdnxj3SDUfy3yM
                &q=${name_common}`}
        />
      </Row>

      <Row className="m-2">
        {profanity_identity_attack ? (
          <Col md="3">
            <h3>Profanity score: </h3>
            <ul>
              <li>Average: {profanityAverage}</li>
              <li>Identity Attack: {profanity_identity_attack}</li>
              <li>Profanity: {profanity_profanity}</li>
              <li>Toxicity: {profanity_toxicity}</li>
              <li>Sexually Explicit: {profanity_sexually_explicit}</li>
            </ul>
          </Col>
        ) : (
          null
        )}

        {languages.length > 0 ? (
          <Col md="3">
            <h3>Languages</h3>
              <ul>
                {Object.values(languages).map((language) => (
                  <li>{language}</li>
                ))}
              </ul>
          </Col>
        ) : (
          null
        )}

        {top_tracks_names.length > 0  ? (
          <Col md="3">
            <h3>Top Songs</h3>
            <ul>
              {top_tracks_names.map((trackName, index) => (
                top_tracks_ids[index]
                  ? <li><Link to={`/song/${top_tracks_ids[index]}`}>{trackName}</Link></li>
                  : <li>{trackName}</li>
              ))}
            </ul>
          </Col>
        ) : (
          null
        )}

        {top_artists_names.length > 0 ? (
          <Col md="3">
            <h3>Top Artists</h3>
            <ul>
              {top_artists_names.map((artistName, index) => (
                top_artists_names[index]
                  ? <li><Link to={`/song/${top_artists_ids[index]}`}>{artistName}</Link></li>
                  : <li>{artistName}</li>
              ))}
            </ul>
          </Col>
        ) : (
          null
        )}
      </Row>
    </Container>
  );
}

export default Country;
