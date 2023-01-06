import React from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import { BsFacebook } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import "./footer.css";
function Footer() {
  return (
        <Container fixed="top" fluid className="footer">
          <Col lg="6" md={"auto"}>
            <div className="copyFooter">
              © 2022 Copyright :
              <a className="text-white m-2" href="/">
                VintageCars.com
              </a>
            </div>
          </Col>
          
            <Navbar >
                  <Col lg="4" md={4}>
                    <Nav.Link
                      href="https://www.instagram.com/"
                      className="listaRedesSocial"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <BsInstagram style={{ color: "white" }}  />
                    </Nav.Link>
                  </Col>
                  <Col lg="4" md={4}>
                    <Nav.Link
                      href="https://www.facebook.com/"
                      className="listaRedesSocial"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <BsFacebook style={{ color: "white" }} />{" "}
                    </Nav.Link>
                  </Col>
                  <Col lg="4" md={4}>
                    <Nav.Link
                      href="https://www.twitter.com/"
                      className="listaRedesSocial"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      <BsTwitter style={{ color: "white" }} />{" "}
                    </Nav.Link>
                  </Col>
            </Navbar>
        </Container>
  );
}
export default Footer;
