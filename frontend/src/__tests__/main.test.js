import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from "../App";
// react-bootstrap
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// components
import { Home } from "../components/Home";
import { Navigation } from "../components/Navigation";
import About from "../components/About";
import Song from "../components/Song";
import Artist from "../components/Artist";
import Country from "../components/Country";
import SongRankings from "../components/ranking-pages/SongRankings";
import ArtistRankings from "../components/ranking-pages/ArtistRankings";
import CountryRankings from "../components/ranking-pages/CountryRankings";
import CountryTable from '../components/ranking-pages/CountryTable';
import ArtistTable from '../components/ranking-pages/ArtistTable';
import SongTable from '../components/ranking-pages/SongTable';
import { FooterContainer } from '../components/Footer';
import Footer from '../components/footer/footer-index'
import AboutLyricCheck from '../components/AboutLyricCheck';

configure({ adapter: new Adapter() })

// tests 1-19
describe("rendering components + snapshots", () => {

  // test 1
  test("renders App component without crashing", () => {
    shallow(<App />);
  });

  // test 2
  test("renders all Home component Carousel.Caption without crashing", () => {
    const wrapper = shallow(<Home />);

    const header = (<h1>Welcome to LyricCheck!</h1>);
    const text = (
      <p>
        We consolidate data on top artists, charting songs, and country
        data to analyze the profanity preferences through individual,
        community, and global scopes.
      </p>
    );

    expect(wrapper.contains(header)).toEqual(true);
    expect(wrapper.contains(text)).toEqual(true);

    const headerSlide4 = (<h1>See how countries prefer their profanity in songs!</h1>);
    const textSlide4 = (
      <p>
        Using Perspective's state-of-the-art NLP toxicity models, see how
        a country's profanity tolerance and acceptance changes overtime.
        You can also see the tolerance of profanity around the globe.
      </p>
    );
    expect(wrapper.contains(headerSlide4)).toEqual(true);
    expect(wrapper.contains(textSlide4)).toEqual(true);

    expect(wrapper).toMatchSnapshot()
  })

  // test 3
  test("renders Navigation navbar without crashing", () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper.contains(<Navbar.Brand href="/">LyricCheck</Navbar.Brand>)).toEqual(true);
    expect(wrapper.contains(<Nav className="me-auto">
      <Nav.Link href="/song">Songs</Nav.Link>
      <Nav.Link href="/artist">Artists</Nav.Link>
      <Nav.Link href="/country">Countries</Nav.Link>
      <Nav.Link href="/about">About Us</Nav.Link>
      <Nav.Link href="/search">Search</Nav.Link>
    </Nav>)).toEqual(true);
    expect(wrapper).toMatchSnapshot()
  })

  // test 4
  test("renders About component without crashing", () => {
    const wrapper = shallow(<About />);
    const header = (<h1 className="text-center">About Us</h1>);
    expect(wrapper.contains(header)).toEqual(true);
    expect(wrapper).toMatchSnapshot()
  })
  // test 5
  test("renders Song component without crashing", () => {
    const wrapper = shallow(<Song />);
    expect(wrapper).toMatchSnapshot()
  })
  // test 6
  test("renders Artist component without crashing", () => {
    const wrapper = shallow(<Artist />);
    expect(wrapper).toMatchSnapshot()
  })
  // test 7
  test("renders Country component without crashing", () => {
    const wrapper = shallow(<Country />);
    expect(wrapper).toMatchSnapshot()
  })
  // test 8
  test("renders SongRankings component without crashing", () => {
    const wrapper = shallow(<SongRankings />);
    expect(wrapper).toMatchSnapshot()
  })
  // test 9
  test("renders ArtistRankings component without crashing", () => {
    const wrapper = shallow(<ArtistRankings />);
    expect(wrapper).toMatchSnapshot()
  })
  // test 10
  test("renders CountryRankings component without crashing", () => {
    const wrapper = shallow(<CountryRankings />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 11
  test("renders AboutLyricCheck without crashing", () => {
    const wrapper = shallow(<AboutLyricCheck />);
    const headerProfanity = (<h1 class="text-center">Profanity Metrics</h1>);
    const headerViews = (<h1 class="text-center">Views</h1>);
    expect(wrapper.contains(headerProfanity)).toEqual(true);
    expect(wrapper.contains(headerViews)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  })
  // test 12
  test("renders Footer without crashing", () => {
    const wrapper = shallow(<FooterContainer />);
    const title = (<Footer.Title>10 am Group 7</Footer.Title>);
    const text = (<Footer.Text>© Copyright 2022 LyricCheck</Footer.Text>);
    expect(wrapper.contains(title)).toEqual(true);
    expect(wrapper.contains(text)).toEqual(true);
    expect(wrapper).toMatchSnapshot();
  })
  // test 13
  test("renders filtered countries without crashing", () => {
    const wrapper = shallow(<CountryTable filters={{ genres: ['rock'] }} />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 14
  test("renders filtered artist without crashing", () => {
    const wrapper = shallow(<ArtistTable filters={{ genres: ['rock'] }} />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 15
  test("renders filtered songs without crashing", () => {
    const wrapper = shallow(<SongTable filters={{ genres: ['rock'] }} />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 16
  test("renders searched countries without crashing", () => {
    const wrapper = shallow(<CountryTable filters={{ search: 'taylor swift' }} />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 17
  test("renders searched artist without crashing", () => {
    const wrapper = shallow(<ArtistTable filters={{ search: 'taylor swift' }} />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 18
  test("renders searched songs without crashing", () => {
    const wrapper = shallow(<SongTable filters={{ search: 'taylor swift' }} />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 19
  test("renders sorted countries without crashing", () => {
    const wrapper = shallow(<CountryTable filters={{ sort: 'genre' }} />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 20
  test("renders sorted artist without crashing", () => {
    const wrapper = shallow(<ArtistTable filters={{ sort: 'genre' }} />);
    expect(wrapper).toMatchSnapshot();
  })
  // test 21
  test("renders sorted songs without crashing", () => {
    const wrapper = shallow(<SongTable filters={{ sort: 'genre' }} />);
    expect(wrapper).toMatchSnapshot();
  })

})
