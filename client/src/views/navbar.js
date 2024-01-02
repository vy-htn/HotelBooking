import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { PersonCircle } from 'react-bootstrap-icons';

function NavbarComponent() {
  const isAuthenticated = window.localStorage.getItem('token');
  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem('token');

    // Perform any other logout-related actions if needed
    // ...

    // Redirect the user to the login page or another appropriate page
    window.location.href = '/login';
  };
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Navbar.Brand href="/">
        <img className="logo" src="/images/logo.jpg" alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link href="/specialoffers">SPECIAL OFFERS</Nav.Link>
          <Nav.Link href="/rooms">ROOMS</Nav.Link>
          <Nav.Link href="/dining">DINING</Nav.Link>
          <Nav.Link href="/facilities">FACILITIES</Nav.Link>
          <Nav.Link href="/meetings&events">MEETINGS & EVENTS</Nav.Link>
          {isAuthenticated ? (
            <>
              <NavDropdown  role='drop-down' title={<PersonCircle size={30} />} id="basic-nav-dropdown">
                <NavDropdown.Item role="view-bookings" href="/viewbookings">View Bookings</NavDropdown.Item>
                <NavDropdown.Item  onClick={handleLogout}>Log out</NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <>
              <NavDropdown role='drop-down' title={<PersonCircle size={30} />} id="basic-nav-dropdown">
                <NavDropdown.Item role="login"  href="/login">Log in</NavDropdown.Item>
                <NavDropdown.Item href="/join">Join Member</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
