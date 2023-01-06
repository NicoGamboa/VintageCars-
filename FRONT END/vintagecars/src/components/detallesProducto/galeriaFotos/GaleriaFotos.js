import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import "./galeriaFotosStyle.css";

const GaleriaFotos = ({ images }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Container className="containerStyle">
        <div>
          {images.imagenes.slice(0, 1).map((item) => (
            <div className="cardLeft" key={item.id}>
              <img className="imagen-grande" src={item.url} alt="" />
            </div>
          ))}
        </div>
        <div className="containerImageRight">
          {images.imagenes.slice(1, 5).map((item) => (
            <div className="cardRight" key={item.id}>
              <img className="imageRight" src={item.url} alt="" />
            </div>
          ))}
        </div>
   
        <Nav className="linkStyles" onClick={handleShow}>
          {" "}
          Ver mas fotos
        </Nav>
      </Container>

      <Modal
        className="modalStyle"
        show={show}
        onHide={handleClose}
        
        size="lg"
       
        style={{ backgroundColor: "#2F1A10" }}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body style={{}}>
          <Carousel showArrows={true}>
            {images?.imagenes?.map((item) => (
              <div key={item.id}>
                <img src={item.url} alt="" />
              </div>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GaleriaFotos;
