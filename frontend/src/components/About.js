import axios from "axios";
import React, { useState, useEffect } from "react";
import christopher_img from "./images/christopher.png";
import stacy_img from "./images/stacy.png";
import kenji_img from "./images/kenji.jpg";
import jack_img from "./images/jack.png";
import hassan_img from "./images/hassan.jpg";
import aws from "./images/about/aws.png";
import docker from "./images/about/docker.png"
import elastic_beanstalk from "./images/about/elastic_beanstalk.jpg";
import eslint from "./images/about/eslint.png";
import flask_restless from "./images/about/flask_restless.png";
import gitlab from "./images/about/gitlab.jpg";
import gitlablogo from  "./images/about/gitlablogo.jpg"
import namecheap from "./images/about/namecheap.png";
import postgresql from "./images/about/postgresql.png";
import postman from "./images/about/postman.jpg";
import prettier from "./images/about/prettier.png";
import react512 from "./images/about/react512.png";
import lastfm from "./images/about/last.fm.png";
import mui from "./images/about/mui.png";
import musixmatch from "./images/about/musixmatch.png";
import perspective from "./images/about/perspective.png";
import RESTcountries from "./images/about/RESTcountries.png";
import spotify from "./images/about/spotify.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import Divider from "@mui/material/Divider"

export const scrape = async (url) => {
  return await axios.get(url);
};

const team = [
  {
    name: "Hassan Khan",
    email: "hakhan0301@utexas.edu",
    username: "hakhan0301",
    image: hassan_img,
    bio: "I'm a Junior in CS at UT Austin. I moved to Texas when I was 5 and have been here since. I like playing Minecraft.",
    responsibilities: "Backend | Phase I Leader",
    commits: 0,
    issues: 0,
    tests: 12,
  },
  {
    name: "Stacy Jong",
    email: "stacyjong817@gmail.com",
    username: "stacyvjong",
    image: stacy_img,
    bio: "I am a third-year CS major at UT Austin, and am from Seattle, WA. In my free-time I enjoy playing board games with friends, playing tennis, and hiking.",
    responsibilities: "Backend | Phase IV Leader",
    commits: 0,
    issues: 0,
    tests: 6,
  },
  {
    name: "Jack Si",
    email: "jacksi@utexas.edu",
    username: "jacksi1",
    image: jack_img,
    bio: "I'm an avid music listener who plays basketball and golf whenever possible. Currently in my third year, I'm a CS major at UT Austin.",
    responsibilities: "Frontend | Phase III Leader",
    commits: 0,
    issues: 0,
    tests: 26,
  },
  {
    name: "Kenji Nakachi",
    email: "kenjinakachi@utexas.edu",
    username: "kenjinakachi",
    image: kenji_img,
    bio: "I moved to Texas when I was 8 and have lived in Kyle ever since. I'm a third year CS major at UT Austin, and enjoy playing basketball and video games in my free time.",
    responsibilities: "Backend",
    commits: 0,
    issues: 0,
    tests: 0,
  },
  {
    name: "Christopher Carrasco",
    email: "chris.carrasco@att.net",
    username: "guymanpersonboy",
    image: christopher_img,
    bio: "I'm a third year CS major at UT Austin. I'm from Midland, TX and enjoy making music, gaming, watching anime, and podcasting with friends.",
    responsibilities: "Frontend | Phase II Leader",
    commits: 0,
    issues: 0,
    tests: 15,
  },
];

function About() {
  const [teamInfo, setTeamInfo] = useState([]);
  const [totalCommits, setTotalCommits] = useState([]);
  const [totalIssues, setTotalIssues] = useState([]);
  const [totalTests, setTotalTests] = useState([]);

  const getCommits = async () => {
    let totalCommits = 0;

    const commitInfo = await scrape(
      "https://gitlab.com/api/v4/projects/33830147/repository/contributors"
    );

    commitInfo.data.forEach((element) => {
      team.forEach((member) => {
        if (
          member.name.includes(element.name) ||
          member.email === element.email
        ) {
          member.commits += element.commits;
        }
      });
      totalCommits += element.commits;
    });
    setTotalCommits(totalCommits);
  };

  const getIssues = async () => {
    let totalIssues = 0;

    const issueList = await scrape(
      "https://gitlab.com/api/v4/projects/33830147/issues"
    );

    issueList.data.forEach((element) => {
      let assigned = 0;
      element.assignees.forEach((a) => {
        team.forEach((member) => {
          if (member.username === a.username) {
            member.issues += 1;
            assigned += 1;
          }
        });
      });

      team.forEach((member) => {
        if (!assigned && element.assignee != null && member.username === element.assignee.username) {
          member.issues += 1;
        }
      });
      totalIssues += 1;
    });
    setTotalIssues(totalIssues);
    setTeamInfo(team);
  };

  const getTests = async () => {
    let totalTests = 0;
    team.forEach((member) => {
      totalTests += member.tests
    });
    setTotalTests(totalTests);
  };

  useEffect(() => {
    const getData = async () => {
      getCommits();
      getIssues();
      getTests();
    };
    getData();
  }, []);

  return (
    <Container style={{ paddingBottom: '25px' }}>
      <Row style={{ paddingTop: '50px', paddingBottom: '25px' }}>
        <h1 className="text-center">About Us</h1>
        <h2>What is LyricCheck?</h2>
        <p>
          LyricCheck is a website that consolidates data on top artists (monthly
          listeners), charting songs, artist bios, song lyrics, and profanity
          scores. Using Perspective's NLP model to grade song lyrics, our project
          will also provide insight on the profanity preferences over time, based
          on location, and based on artists. It will additionally have a Spotify
          playlist analyzer that will grade the profanity level of Spotify
          playlists, allowing for a bulk solution to children-safe songs. There
          are sites that tackle one or even part of one responsibility that we
          hope our project to accomplish, but there are severe patches of
          information missing from each. By also making use of a profanity grade,
          our project can provide valuable insight into the worrying NSFW trend of
          modern day pop culture.
        </p>

        <h2>What has been found?</h2>
        <p>
          Of the 207 country instances, Palau has the highest profanity
          average while Denmark has the lowest. Of the 1239 song instances
          we have, "Under Ground Kings" by Drake has the highest profanity average
          while "Dreams" by The Cranberries has the lowest profanity average. Hip hop
          and Rap genres tend to have high profanity averages. Of the 776 artist
          instances, A$AP Rocky has the highest profanity average while Bastille has
          the lowest profanity average.
        </p>
      </Row>

      <Divider></Divider>

      <Row style={{ paddingTop: '50px', paddingBottom: '25px' }}>
        <h1 className="text-center">Our Team</h1>
        <Row>
          {teamInfo.map((member) => (
            <Col>
              <Card>
                <Card.Img variant="top" src={member.image} className="card-img" />
                <Card.Body>
                  <Card.Title>
                    {member.name} - {member.responsibilities}
                  </Card.Title>
                  <Card.Text>
                    Responsibilities: {member.responsibilities}
                    <br />
                    Bio: {member.bio}
                    <br />
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  Commits: {member.commits}
                  <br />
                  Issues: {member.issues}
                  <br />
                  Unit Tests: {member.tests}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <h5 className="text-center">Total number of commits: {totalCommits}</h5>
          </Col>
          <Col>
            <h5 className="text-center">Total number of issues: {totalIssues}</h5>
          </Col>
          <Col>
            <h5 className="text-center">Total number of tests: {totalTests}</h5>
          </Col>
        </Row>
      </Row>

      <Divider></Divider>

      <Row style={{ paddingTop: '50px', paddingBottom: '25px' }}>
        <Row>
          <Col align="center"><h2>Data Sources</h2></Col>
        </Row>

        <Row>
          <Col>
            <div onClick = {() => (window.location.href = "https://restcountries.com/")}>
              <Card>
                <Card.Img variant="top" src={RESTcountries} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    REST Countries
                  </Card.Title>
                  <Card.Text>
                    Was scraped using node-fetch. We got out a list of all the
                    countries.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div onClick = {() => (window.location.href = "https://www.last.fm/api/intro")}>
              <Card>
                <Card.Img variant="top" src={lastfm} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    last.fm
                  </Card.Title>
                  <Card.Text>
                    Was scraped using node-fetch. We input a country, and got out top
                    songs and artists. We also input song and artist names to get data
                    about those.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div onClick = {() => (window.location.href = "https://developer.musixmatch.com/")}>
              <Card>
                <Card.Img variant="top" src={musixmatch} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Musicxmatch
                  </Card.Title>
                  <Card.Text>
                    Was scraped using node-fetch. We input a song name, and got out the
                    lyrics.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg md={3} sm={4} xs={4}>
            <div onClick = {() => (window.location.href = "https://perspectiveapi.com/")}>
              <Card>
                <Card.Img variant="top" src={perspective} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Perspective
                  </Card.Title>
                  <Card.Text>
                    Was scraped using node-fetch. We gave lyrics and got the profanity
                    score.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg md={3} sm={4} xs={4}>
            <div onClick = {() => (window.location.href = "https://developer.spotify.com/documentation/web-api/")}>
              <Card>
                <Card.Img variant="top" src={spotify} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Spotify
                  </Card.Title>
                  <Card.Text>
                    Was scraped using node-fetch. We initially used this to get song and
                    artist info, but we later only used it for getting media links.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        <Row>
          <Col align="center"><h2>Tools</h2></Col>
        </Row>

        <Row>
          <Col>
            <div onClick = {() => (window.location.href = "https://reactjs.org")}>
              <Card>
                <Card.Img variant="top" src={react512} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    React
                  </Card.Title>
                  <Card.Text>
                    A Javascript library used for web application development.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div onClick = {() => (window.location.href = "https://www.postman.com")}>
              <Card>
                <Card.Img variant="top" src={postman} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Postman
                  </Card.Title>
                  <Card.Text>
                    An API platform used for building APIs.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div onClick = {() => (window.location.href = "https://aws.amazon.com")}>
              <Card>
                <Card.Img variant="top" src={aws} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    AWS
                  </Card.Title>
                  <Card.Text>
                    A cloud platform used for hosting the React app.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg md={4} sm={5} xs={4}>
            <div onClick = {() => (window.location.href = "https://aws.amazon.com/elasticbeanstalk/")}>
              <Card>
                <Card.Img variant="top" src={elastic_beanstalk} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Elastic Beanstalk
                  </Card.Title>
                  <Card.Text>
                    Cloud tool used to host our API.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg md={4} sm={4} xs={4}>
            <div onClick = {() => (window.location.href = "https://www.postgresql.org")}>
              <Card>
                <Card.Img variant="top" src={postgresql} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    PostgreSQL
                  </Card.Title>
                  <Card.Text>
                    Database used to store and search model data.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div onClick = {() => (window.location.href = "https://flask-restless-ng.readthedocs.io/en/latest/")}>
              <Card>
                <Card.Img variant="top" src={flask_restless} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Flask-Restless-NG
                  </Card.Title>
                  <Card.Text>
                    Simple generation of ReSTful APIs for database models defined using SQLAlchemy (or Flask-SQLAlchemy).
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div onClick = {() => (window.location.href = "https://www.docker.com")}>
              <Card>
                <Card.Img variant="top" src={docker} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Docker
                  </Card.Title>
                  <Card.Text>
                    Uses OS-level virtualization to deliver software in packages called containers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col>
            <div onClick = {() => (window.location.href = "https://gitlab.com")}>
              <Card>
                <Card.Img variant="top" src={gitlab} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Gitlab
                  </Card.Title>
                  <Card.Text>
                    An open source code repository and DevOps platform.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg md={3} sm={5} xs={4}>
            <div onClick = {() => (window.location.href = "https://www.namecheap.com")}>
              <Card>
                <Card.Img variant="top" src={namecheap} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Namecheap
                  </Card.Title>
                  <Card.Text>
                    A domain name registrar.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col lg md={4} sm={4} xs={4}>
            <div onClick = {() => (window.location.href = "https://eslint.org")}>
              <Card>
                <Card.Img variant="top" src={eslint} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    ESLint
                  </Card.Title>
                  <Card.Text>
                    An open source JavaScript linting tool.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>  

        <Row>
          <Col xl={3} lg={3} md={4} sm={4} xs={4}>
            <div onClick = {() => (window.location.href = "https://prettier.io")}>
              <Card>
                <Card.Img variant="top" src={prettier} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Prettier
                  </Card.Title>
                  <Card.Text>
                    A code formatter.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col xl={3} lg={3} md={4} sm={4} xs={4}>
            <div onClick = {() => (window.location.href = "https://mui.com")}>
              <Card>
                <Card.Img variant="top" src={mui} className="tool-img" />
                <Card.Body>
                  <Card.Title>
                    Material UI
                  </Card.Title>
                  <Card.Text>
                    A comprehensive suite of UI tools.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Row>

      <Divider></Divider>

      <Row style={{ paddingTop: '50px', paddingBottom: '10px' }}>
        <Row>
          <Col align="center"><h2>Our Repository</h2></Col>
          <Col align="center"><h2>API Documentation</h2></Col>
        </Row>
        
        <Row>
          <Col>
            <Row>
              <Col align="center" xs={5}>
                <Image src={gitlablogo} alt="tool image" className="tool-img"></Image>
              </Col>
              <Col>
                <li><a href="https://gitlab.com/kenjinakachi/lyriccheck">GitLab Repository</a></li>
                <p>
                  GitLab respository containing our source code.
                </p>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col align="center" xs={5}>
                <Image src={postman} alt="tool image" style={{height: 92}}></Image>
              </Col>
              <Col>
                <li><a href="https://documenter.getpostman.com/view/19683184/UVksKDAj">Postman API</a></li>
                <p>Postman documentation of LyricCheck's API</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}

export default About;
