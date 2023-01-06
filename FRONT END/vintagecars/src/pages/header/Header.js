import React, { useEffect,useState,useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Logo from "../../assets/logo.png";
import Nav from "react-bootstrap/Nav";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import User from "../../utils/User";
import "./header.css";

const Header = () => {
  const { isAuthenticated,setIsAuthenticated } = useContext(UserContext);
  
 const local = localStorage.getItem('Token')



  const location = useLocation();
  useEffect(
    ()=>{
      const isAutenticated1= JSON.parse(localStorage.getItem("isAuthenticated1"))
      
     if (isAutenticated1){
      
       setIsAuthenticated(isAutenticated1)
      }
   },[]
  );

  const buttonRenderizar = () => {
    if (location.pathname === "/login") {
      return (
        <NavLink className="nav-link px-5 " to="/signup">
          Crear Cuenta
        </NavLink>
      );
    } else if (location.pathname === "/signup") {
      return (
        <NavLink className="nav-link px-5" to="/login">
          Iniciar Sesion
        </NavLink>
      );
    } else {
      return (
        <>
          <NavLink className="nav-link px-5" to="/signup">
            {" "}
            Crear Cuenta
          </NavLink>
          <NavLink className="nav-link px-5" to="/login">
            Iniciar Sesion
          </NavLink>{" "}
        </>
      );
    }
  };

  return (
    <>
      {[false, "lg", "md", "sm"].map((expand) => (
        <Navbar fixed="top" key={expand} expand={expand} id="navbar">
          <Container fluid>
            <Link to="/">
              <img alt="" src={Logo} width="150" className="logo" />
              <Navbar.Brand className=" d-inline-block align-top title">
                Viajar con Estilo
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              { isAuthenticated ? (
                <>
                  <Offcanvas.Header
                    style={{ backgroundColor: "#f4edcb", paddingTop: "20%" }}
                  ></Offcanvas.Header>
                  <Offcanvas.Body
                    style={{
                      boxSizing: "content-box",
                      height: "100px",

                      position: "relative",
                      bottom: "15%",
                      right: "1px",
                    }}
                  >
                    <Nav
                      id={`offcanvasNavbarLabel-expand-${expand}`}
                      className="justify-content-end flex-grow-1 "
                      style={{
                        position: "relative",
                        right: "30px",
                        top: "30px",
                      }}
                    >
                      <User />
                    </Nav>
                  </Offcanvas.Body>
                </>
              ) : (
                <>
                  <Offcanvas.Header
                    closeButton
                    style={{ backgroundColor: "#f4edcb", paddingTop: "13%" }}
                  >
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pt-4 pb-4">
                      <>{buttonRenderizar()}</>
                    </Nav>
                  </Offcanvas.Body>
                </>
              )}
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;
