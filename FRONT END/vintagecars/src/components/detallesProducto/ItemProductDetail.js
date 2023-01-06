import React, { useEffect, useState } from "react";
import "./styleDetalleProducto.css";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { AiTwotoneStar } from "react-icons/ai";
import { FaCar } from "react-icons/fa";
import { TfiDashboard } from "react-icons/tfi";
import { GiCarDoor, GiRingingAlarm } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { MdPets } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl";
import { BiShareAlt } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Policies from "./policies/Policies";
import Calendario from "../reservaCalendario/reservaCalendario";
import Map from "./map/Map";
import Spinner from "react-bootstrap/Spinner";
import GaleriaFotos from "./galeriaFotos/GaleriaFotos";
import { useLocation,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import { FechaContext } from "../../context/UseContext";
import { UserContext } from "../../context/UserContext";
import Swal from 'sweetalert2';

import "./reservaAlertSwift.css";


const ItemProductDetail = ({producto,fecha}) => {
  const {startDate1}=useContext(FechaContext);
  const {endDate1}=useContext(FechaContext);


  const {setDesabilitar}=useContext(FechaContext)
  const { isAuthenticated } = useContext(UserContext);
  const [takenDates, setTakenDates] = useState();
  const [loaded, setLoaded] = useState(true);
  const [showShare, setShowShare] = useState(false);



  

  const isToggle = () => {
    setShowShare(!showShare);
  };
  const pathName=useLocation().pathname
  const navigate=useNavigate()

  const accessToken = localStorage.getItem("Token");

  const Reserva=()=>{
    if(accessToken === null){
      setTimeout(() => {
        navigate(`/login`)
      }, 1000)
      Swal.fire('Inicie sesión para continuar.');

    } else {
      navigate(`${pathName}/reserva`)
    }
  }

  
  useEffect(()=>{
    const fechas=[...fecha]
    setDesabilitar(fechas) 

  },[] )

  return (
    <>
      {!loaded || !producto ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container fluid>
          <Row className="conteinerTitulo">
            <Col xs={8} sm={8} md={8} lg={8}>
              <p className="categoriaTitulo">
                <span>{producto.categoria.titulo}</span>
              </p>
              <h2 className="productoTitulo">{producto.titulo}</h2>
            </Col>
            <Col className="columnaFlecha" xs={4} sm={4} md={4} lg={4}>
              <Link to="/">
                <h2 className="flecha">
              
                  <SlArrowLeft className="" />
                </h2>
              </Link>
            </Col>
          </Row>
          <Row className="conteinerUbicacion">
            <Col xs={8} sm={8} md={8} lg={8} className="ubicacion">
              <IoLocationOutline
                style={{
                  color: "#5b3b2c",
                  fontSize: "19px",
                  fontWeight: "bold",
                }}
              />{" "}
              <span>{producto.ciudad.nombre_ciudad}</span> ,{" "}
              <span>{producto.ciudad.provincia}</span> ,{" "}
              <span>{producto.ciudad.pais}</span>
            </Col>

            <Col className="columnaEstrellas">
              <h6 className="textoEstrella">Muy Bueno</h6>
              <span className="estrellas">
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
                <AiTwotoneStar />
              </span>
            </Col>
          </Row>
          <section >
            <div>
              <div className="shareStyle" style={{ cursor: "pointer" }}>
                <BiShareAlt onClick={isToggle} />
              </div>
              <GaleriaFotos
                images={producto}
              
              />
            </div>
          </section>
          <Row style={{ marginTop: "15px" }}>
            <Col lg={12}>
              <h4 className="tituloStyle">
                <span>{`VIAJA CON ESTILO POR ${producto.ciudad.nombre_ciudad}`}</span>
              </h4>
              <hr />
              <p style={{ padding: "0 0 0 20px"}}>
                {producto.descripcion}
              </p>
            </Col>
          </Row>
          <h4 className="tituloStyle">{`¿QUE OFRECE ESTE${producto.categoria.titulo}?`}</h4>

          <hr />
          <div style={{ marginTop: "15px" }} className="featuresStyle">
            <div className="featurescolumns">
            
              <li>
                {" "}
                <h5>
                  <TfiDashboard /> 220 Km/h
                </h5>
              </li>
              <li>
                {" "}
                <h5>
                  <GiCarDoor /> Dos Puertas
                </h5>
              </li>
            
            </div>
            <div className="featurescolumns">
            
              <li>
                {" "}
                <h5>
                  <MdPets /> Apto mascotas
                </h5>
              </li>
            
              <li>
                {" "}
                <h5>
                  <FaCar /> 4 personas
                </h5>
              </li>
            
            </div>
            <div className="featurescolumns">
            
              <li>
                {" "}
                <h5 >
                  <TbManualGearbox /> Manual
                </h5>
              </li>
              <li>
                {" "}
                <h5>
                  <GiRingingAlarm /> Alarma
                </h5>
              </li>
           
            </div>
          </div>
<section className='contendorDetalleCalendario'>
                
        <h3 className='tituloCalendario'>FECHAS DISPONIBLES</h3>
        <div className='detalleCalendario' >
        <Calendario
                   
                   
                   inline
                   buttonText="Iniciar reserva"
                   readOnly={true}
                   // monthsShown={isMobile ? 1 : 2}
                   excludeDateIntervals={takenDates}
                 />
          <div className='contenedorReservaBoton' id='elemento'>
                
                <p>Agregá tus fechas de viaje para obtener precios exactos.</p>
                <Button className='botonReservaCalendario' onClick={Reserva}>
                    Iniciar Reserva
                </Button>
                
            </div>
            </div>
            </section>
          
          <h4 className="tituloStyle">¿DONDE NOS VAMOS A ENCONTRAR?</h4>
          <hr />
          <h6 style={{ paddingLeft: "20px" }}>
            {producto.ciudad.nombre_ciudad},{producto.ciudad.pais}
          </h6>

          <Map producto={producto} />

          <h4 className="tituloStyle">¿QUE TENEMOS QUE SABER?</h4>
          <hr />
          <Policies productos={producto.politica} />
        </Container>
      )}
    </>
  );
};

export default ItemProductDetail;

