import { Container, Image, Carousel, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import bg1 from "./images/lyriccheck-bg.jpg";
import bg2 from "./images/song-bg.jpg";
import bg3 from "./images/artist-bg.jpg";
import bg4 from "./images/country-bg.jpg";
import bg5 from  "./images/lp.jpg";
import bg6 from  "./images/songwriter.jpg";
import bg7 from  "./images/countriesmap.png";

export const Home = () => {
  return (
    <>
      <Container fluid>
        <Carousel>
          <Carousel.Item>
            <Image
              class="img-fluid"
              className="d-block w-100 h-100"
              src={bg1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h1>Welcome to LyricCheck!</h1>
              <p>
                We consolidate data on top artists, charting songs, and country
                data to analyze the profanity preferences through individual,
                community, and global scopes.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Image className="d-block w-100 h-100" src={bg2} alt="Second slide" />
            <Carousel.Caption>
              <h1>Check the profanity on your favorite songs!</h1>
              <p>
                Using Perspective's state-of-the-art NLP toxicity models, see how
                your favorite songs stack up profanity-wise.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Image className="d-block w-100 h-100" src={bg3} alt="Third slide" />
            <Carousel.Caption>
              <h1>Check the profanity on charting artists!</h1>
              <p>
                Using Perspective's state-of-the-art NLP toxicity models, see how
                the current top artists stack up profanity-wise.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <Image className="d-block w-100 h-100" src={bg4} alt="Fourth slide" />
            <Carousel.Caption>
              <h1>See how countries prefer their profanity in songs!</h1>
              <p>
                Using Perspective's state-of-the-art NLP toxicity models, see how
                a country's profanity tolerance and acceptance changes overtime.
                You can also see the tolerance of profanity around the globe.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>

      <Container fluid className="bg-gray" style={{ paddingTop: '25px', paddingBottom: '25px' }}>
        <Row align="center">
          <Col>
            <Card style={{ width: '25rem' }}>
              <Card.Img variant="top" src={bg5} className="card-img" />
              <Card.Body>
                <Card.Text>Search from our list of songs!</Card.Text>
                <Link to="/song">
                  <Button variant="outline-dark">Songs</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '25rem' }}>
              <Card.Img variant="top" src={bg6} className="card-img" />
              <Card.Body>
                <Card.Text>Search from our list of artists!</Card.Text>
                <Link to="/artist">
                  <Button variant="outline-dark">Artists</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: '25rem' }}>
              <Card.Img variant="top" src={bg7} className="card-img" />
              <Card.Body>
                <Card.Text>Search from our list of countries!</Card.Text>
                <Link to="/country">
                  <Button variant="outline-dark">Countries</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
