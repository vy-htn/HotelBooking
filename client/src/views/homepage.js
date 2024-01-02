import React from 'react';
import '../css/homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';
import NavbarComponent  from './navbar';



function HomePage() {
  return (
    <div>
      {/* <Navbar bg="light" expand="lg" className="navbar">
      <Navbar.Brand href="/">
    <img className="logo" src="/images/logo.jpg" alt="Logo"/>
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav>
      <Nav.Link href="/specialoffers">SPECIAL OFFERS</Nav.Link>
      <Nav.Link href="/rooms">ROOMS</Nav.Link>
      <Nav.Link href="/dining">DINING</Nav.Link>
      <Nav.Link href="/facilities">FACILITIES</Nav.Link>
      <Nav.Link href="/meetings&events">MEETINGS & EVENTS</Nav.Link>
      <NavDropdown title={<PersonCircle size={30} />} id="basic-nav-dropdown">
        <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
        <NavDropdown.Item href="/join">Join Member</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
    </Navbar> */}
    <div>
      <NavbarComponent />
    </div>

    
    <div className="content">
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/room10.jpeg" alt="First slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/hotel_image1.jpeg" alt="Second slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src="/images/hotel_image2.jpeg" alt="Third slide"/>
        </Carousel.Item>
      </Carousel>

        <div className="book-now"><a href="/availability">BOOK NOW</a></div> 

        <p>In white daylight, rainbows cascading, a spectrum of swatches cast from a trillion facets.<br></br>

            By night, dimmed shimmer and champagne flutes. Gem-red spheres of fresh roses.
            
        </p>
        <h1>Welcome to The Royal</h1>
        <div className="introduction">
          <div className="box"><p>The Royal, where luxury meets comfort. Nestled in the heart of the beautiful beaches, our hotel offers breathtaking views of the endless expanse of the ocean, providing a serene backdrop to your stay.
              With a variety of dining options, state-of-the-art facilities, and top-notch service, we ensure an unforgettable stay for our guests.<br></br>
              Experience the ultimate seaside retreat with us. <br></br>We look forward to welcoming you!</p>
          </div>
          <div className="box"> <img src="/images/hotel_image3.jpeg" /> </div>
      </div>
    </div>
  </div>
  );
};

export default HomePage;
