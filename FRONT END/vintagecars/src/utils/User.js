import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./utils.css";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import { AiFillCloseSquare, AiOutlineUser } from "react-icons/ai";
import { BsFillCalendarEventFill, BsGear } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import NavItem from "react-bootstrap/NavItem";
import NavLink from "react-bootstrap/NavLink";
const User = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(UserContext);
  const [noAdministrador, setNoAdministrador] = useState(false);
  localStorage.setItem("isAuthenticated1",JSON.stringify(isAuthenticated));

  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    setIsAuthenticated(false);
    localStorage.clear();
    navigate("/");
  };

  const accessToken = localStorage.getItem("Token");
  function parseJwt(accessToken) {
    var base64Url = accessToken.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");

    return JSON.parse(window.atob(base64));
  }

  let datosUsuario = parseJwt(accessToken);

  const usuarioId = datosUsuario.rol.id;
  const noesAdministrador = () => {
    if (datosUsuario.rol.id !== 1) {
      setNoAdministrador(true);
    }

    return noAdministrador;
  };

  useEffect(() => {
    noesAdministrador();
  }, []);

 
  return (
    <>
      {" "}
      <Link
        className="perfil-usuario"
        style={{ textDecorationLine: "none" }}>
        <div className="styleDivName">
          <p className="styleP">
            {`${isAuthenticated?.nombre[0]}`.toUpperCase()}
            {`${isAuthenticated?.apellido[0]}`.toUpperCase()}
          </p>
        </div>
        
          <div className="perfil-utils">
          <Link to={`/admin`}>
            <button hidden={noAdministrador}>Administrar Producto</button>
            </Link>
          <Dropdown as={ButtonGroup}>
        <h6 className="  d-inline-block align-top parrafo">
              Hola,
              <span>
              {" "}
                {`${isAuthenticated?.nombre} ${isAuthenticated?.apellido}`}
              </span>
            </h6>
            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" className="desplegable1" />


      <Dropdown.Menu >
        <Dropdown.Item href="#/action-1"><AiOutlineUser/> Perfil</Dropdown.Item>
        <Link to={`/reserva/usuario_id/${datosUsuario.id}`} href="#/action-2" className="dropdown-item"><BsFillCalendarEventFill/> Mis Reservas </Link>
        <Dropdown.Item href="#/action-3"> <BsGear/> Ajustes</Dropdown.Item>
        <Dropdown.Item href="#/action-4" onClick={handleLogOut}> <AiFillCloseSquare/> Cerrar</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>

      </Link>
       
      
    </>
  );
};


export default User;
