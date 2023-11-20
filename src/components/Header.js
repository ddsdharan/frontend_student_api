import React from "react";
import "./header.css";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header() {
    return (
        <>
            <Navbar className="navbar" bg="dark" data-bs-theme="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="#home">CRUD Student Management</Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;