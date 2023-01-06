import React, { useEffect } from "react";
import "./reserva.css";
import { Container } from "react-bootstrap";
import { SlArrowLeft } from "react-icons/sl";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiTwotoneStar } from "react-icons/ai";
import Policies from "../detallesProducto/policies/Policies";
import Calendario from "../reservaCalendario/reservaCalendario";
import TimePicker from "react-time-picker";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
// import parseISO from 'date-fns/parseISO';
// import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import { FechaContext } from "../../context/UseContext";
// import { MdOutlinePanoramaPhotosphereSelect } from 'react-icons/md';
import { compareAsc, format } from "date-fns";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";


const Reserva = ({ producto, fecha }) => {
  const { startDate1 } = useContext(FechaContext);
  const { endDate1 } = useContext(FechaContext);
  const { isAuthenticated } = useContext(UserContext);
  const pathName = useLocation().pathname;
  

  const [takenDates, setTakenDates] = useState();
  const [valuehorario, onChange] = useState("10:00");
  const [reserva, setReserva] = useState(false);
  const id = producto.id;

  const accessToken = localStorage.getItem("Token");

  let navigate = useNavigate();
  function handleClick() {
    navigate(window.history.go(-1))
  }

  function parseJwt(accessToken) {
    var base64Url = accessToken.split(".")[1];
    var base64 = base64Url.replace("-", "+").replace("_", "/");

    return JSON.parse(window.atob(base64));
  }

  let datosUsuario = parseJwt(accessToken);
  console.log(datosUsuario)

  const usuarioId = datosUsuario.id;
  console.log(usuarioId)

  const datosReserva = {
    horaRetiro: `${valuehorario}`,
    inicioReserva: `${startDate1 ? format(startDate1,'yyyy-MM-dd'): ""}`,
    finReserva: `${endDate1 ? format(endDate1,'yyyy-MM-dd'): ""}`,
    producto: { id },
    usuario: {
      id: usuarioId,
    },
  };

  

  const URL_API = "http://3.14.246.73:8080/vintage/reserva";

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(URL_API, datosReserva, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setReserva(true);
          if (response.status === 200) {
            setTimeout(() => {
             
              navigate(`/`)
            }, 1000);
            Swal.fire({
              icon: "success",
              title: "¡Muchas Gracias!",
              text: `Su reserva se ha realizado con éxito `,
              footer: `fecha: ${datosReserva.inicioReserva} a ${datosReserva.finReserva} Hora de Retiro:${datosReserva.horaRetiro}`,
            });
            navigate(`/login`);
          }
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "Reserva Invalida",
              text: `Algo salio mal, por favor intente nuevamente`,
            });
          } else if (response.status >= 500) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Algo salio mal, Por favor intente nuevamente",
            });
          }
        })
        .finally(() => {
          setReserva(false);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      {reserva ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <Container className="encabezado">
            <Row className="conteinerTitulo">
              <Col xs={8} sm={8} md={8} lg={8}>
                <p className="categoriaTitulo">
                  <span>{producto.categoria.titulo}</span>
                </p>
                <h2 className="productoTitulo">{producto.titulo}</h2>
              </Col>
              <Col className="columnaFlecha" xs={4} sm={4} md={4} lg={4}>
               {/* //onClick={window.history.go(-1)} */}
               
        
                  <h2 className="flecha"
                  onClick={handleClick}>
                    <SlArrowLeft className="" />
                  </h2>
                 
              </Col>
            </Row>
          </Container>
          <Container className="bodyReserva">
            <Col className="columnaDatos" xs={8} sm={8} md={8} lg={8}>
              <Container className="datosUsuario">
                <h2>Completa tus datos</h2>
                <div className="datosPersona">
                  <h3>Nombre</h3>
                  <input type="text" value={isAuthenticated.nombre} required />
                </div>
                <div className="datosPersona">
                  <h3>Apellido</h3>
                  <input
                    type="text"
                    value={isAuthenticated.apellido}
                    required
                  />
                </div>
                <div className="datosPersona">
                  <h3>Email</h3>
                  <input type="text" value={isAuthenticated.email} required />
                </div>
              </Container>
              <Container className="datosCalendario">
                <Calendario
                  inline
                  buttonText="Iniciar reserva"
                  readOnly={true}
                  // monthsShown={isMobile ? 1 : 2}
                  excludeDateIntervals={takenDates}
                />
              </Container>
              <Container className="horaLlegada">
                <h2>Tu horario de llegada</h2>
                <div className="datosCalendario1">
                  <h4>Horario de retiro del vehiculo</h4>
                  <TimePicker
                    onChange={onChange}
                    value={valuehorario}
                    required
                  />
                </div>
              </Container>
            </Col>
            <Col className="columnaDetalle" xs={4} sm={4} md={4} lg={4}>
              <Container className="datosCalendarios">
                <h2>Detalle de la reserva</h2>
                <img
                  className="imgreserva"
                  src={producto.img_principal}
                  alt="imagen principal"
                />
                <h3 className="productoTituloDetalle">{producto.titulo}</h3>
                <div className="estrellas">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <div className="reservaContainer">
                  <form onSubmit={handleSubmit}>
                    <div className="checkin">
                      <h4>Check in</h4>
                      <input
                        value={
                          startDate1 ? format(startDate1, "yyyy-MM-dd") : ""
                        }
                      />
                    </div>
                    <div className="checkout">
                      <h4>Check out</h4>
                      <input
                        value={endDate1 ? format(endDate1, "yyyy-MM-dd") : ""}
                      />
                    </div>

                    <div className="checkout">
                      <h4>horario llegada</h4>
                      <input classname="input" value={valuehorario} />
                    </div>

                    <button className="botondetalle">Confirmar Reserva</button>
                  </form>
                </div>
              </Container>
            </Col>
          </Container>

          <h4 className="tituloStyle">¿QUE TENEMOS QUE SABER?</h4>
          <hr />
          <Policies productos={producto.politica} />
        </>
      )}
    </>
  );
};

export default Reserva;
