// Importando o React
import React from "react";
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

const Header = () => (
	<Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Blog</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="/login">Login</Nav.Link>
    </Nav>
  </Navbar>
);

export default Header;