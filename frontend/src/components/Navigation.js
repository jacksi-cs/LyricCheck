import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(()=>{
    setUrl(location.pathname);
  }, [location]);
  return (
    <Navbar>
      <Container fluid className="bg-transparent">
        <Navbar.Brand href="/">LyricCheck</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse> */}{" "}
        {/* Used for resizing on different screens, unsure if needed*/}
        <Nav className="me-auto">
          <Nav.Link href="/song" className={"underline" + (url==="/song"?" active": "")}>Songs</Nav.Link>
          <Nav.Link href="/artist" className={"underline" + (url==="/artist"?" active": "")}>Artists</Nav.Link>
          <Nav.Link href="/country" className={"underline" + (url==="/country"?" active": "")}>Countries</Nav.Link>
          <Nav.Link href="/search" className={"underline" + (url==="/search"?" active": "")}>Search</Nav.Link>
          <Nav.Link href="/ourd3visuals" className={"underline" + (url==="/search"?" active": "")}>Visualizations</Nav.Link>
          <Nav.Link href="/theird3visuals" className={"underline" + (url==="/search"?" active": "")}>Provider Visualizations</Nav.Link>
          <Nav.Link href="/about" className={"underline" + (url==="/about"?" active": "")}>About Us</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
