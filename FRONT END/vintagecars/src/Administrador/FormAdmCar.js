import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { AxiosRequest } from "../helpers/AxiosHelper";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import "./formAdmCar.css";
const FormAdmCar = ({
  handleCategoriaChange,
  handleSubmit,
  handleCiudadChange,
  formValues,
  handleChange,
  fileImagen,
  handleSelectAttribute,
  handleAddUrlImage,
}) => {
  const [ciudades, setCiudades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [features, setFeatures] = useState([]);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  useEffect(() => {
    AxiosRequest.get("/categorias").then((respon) => {
      setCategorias(respon.data);
    });

    AxiosRequest.get("/ciudad").then((respon) => {
      setCiudades(respon.data);
    });

    AxiosRequest.get("/caracteristica").then((respon) => {
      setFeatures(respon.data);
    });
  }, []);
  const handleLimpiarUrlImage = (e) => {
    console.log("limpiar");
    firstRef.current.value = "";
    lastRef.current.value = "";
  };
  return (
   
     
      <Form className=" formAdm" onSubmit={handleSubmit}>
        <div>
          <h3 className="mb-3">Crear un Auto</h3>
        </div>
        <Row>
          <Col sm md lg>
            <FloatingLabel controlId="floatingInputGrid" label="Nombre">
              {" "}
              <Form.Control
                name="nombre"
                value={formValues.nombre}
                type="text"
                placeholder="Nombre del Automovil"
                required
                className="mb-3"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col sm md lg>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label=""
              className="mb-3 "
            >
              <Select
                size="md"
                name="categoria"
                defaultValue={{
                  label: "Seleccione una categoria",
                  value: "DEFAULT",
                }}
                options={categorias.map((item) => ({
                  label: item.titulo,
                  value: item.titulo,
                  id: item.id,
                }))}
                onChange={handleCategoriaChange}
              />
            </FloatingLabel>
          </Col>
          <Col sm md lg>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label=""
              className="mb-3"
            >
              <Select
                size="md"
                name="ciudad"
                defaultValue={{
                  label: "Seleccione una ciudad",
                  value: "DEFAULT",
                }}
                options={ciudades.map((item) => ({
                  label: item.nombre_ciudad,
                  value: item.nombre_ciudad,
                  id: item.id,
                }))}
                onChange={handleCiudadChange}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col sm md lg>
            <FloatingLabel controlId="floatingInputGrid" label="Logitud">
              <Form.Control
                name="longitud"
                value={formValues.longitud}
                type="numero"
                placeholder="Longitud"
                className="mb-3"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>

          <Col sm md lg>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label="Latitud"
              className="mb-3"
            >
              <Form.Control
                name="latitud"
                value={formValues.latitud}
                type="numero"
                placeholder="Latitud"
                className="mb-3"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col sm md lg>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Descripcion"
              className="mb-3"
            >
              <Form.Control
                name="descripcion"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>{" "}
        </Row>

        <Row>
          <div>
            <h4 className="mb-3">Agregar Caracteristicas</h4>
          </div>
          <Col sm md lg>
            <FloatingLabel
              controlId="floatingSelectGrid"
              label=""
              className="mb-3"
            >
              <Select
                size="md"
                name="caracteristicas"
                options={features.map((item) => ({
                  label: item.nombre,
                  value: item.nombre,
                  id: item.id,
                }))}
                onChange={handleSelectAttribute}
                isMulti
                required
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <div>
            <h4 className="mb-3">Políticas de productos</h4>
          </div>
          <Col sm md lg>
            <div>
              <h6 className="mb-3">Normas de la Casa</h6>
            </div>
            <FloatingLabel controlId="floatingTextarea2" className="mb-3">
              <Form.Control
                name="norma"
                value={formValues.norma}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>{" "}
          <Col lg md sm>
            
            <div>
              <h6 className="mb-3">Salud y Seguridad</h6>
            </div>
            <FloatingLabel controlId="floatingTextarea2" className="mb-3">
              <Form.Control
                name="seguridad"
                value={formValues.seguridad}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>{" "}
          <Col sm md lg>
            <div>
              <h6 className="mb-3">Política y Cancelación</h6>
            </div>
            <FloatingLabel controlId="floatingTextarea2" className="mb-3">
              <Form.Control
                name="cancelacion"
                value={formValues.cancelacion}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>{" "}
        </Row>
        <div>
          <h4 className="mb-4">Carga de Imagen Principal</h4>
        </div>

        <Row>
          <Col sm md lg>
            <FloatingLabel controlId="floatingInputGrid">
              {" "}
              <Form.Control
                name="imagen"
                type="text"
                value={formValues.imagen}
                size="md"
                className="mb-3"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <div>
          <h4 className="mb-4">Carga de Imagenes Secundarias</h4>
        </div>

        <Row className="mb=4">
          <Col sm md lg>
            <FloatingLabel controlId="floatingInputGrid" label="Titulo">
              {" "}
              <Form.Control
                ref={firstRef}
                name="titulo"
                value={formValues.titulo}
                type="text"
                placeholder="Titulo"
                size="md"
                className="mb-3"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
          <Col sm md lg>
            <FloatingLabel
              controlId="floatingInputGrid"
              label="Insertar https://"
            >
              {" "}
              <Form.Control
                ref={lastRef}
                name="url"
                value={formValues.url}
                type="text"
                placeholder="Insertar https:// "
                size="md"
                className="mb-3"
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
          <Col sm md lg className='mt-2'>
            <Button onClick={handleAddUrlImage} className="botonProducto">
              <AiOutlinePlus className="icon " />
            </Button>
            <Button onClick={handleLimpiarUrlImage} className="botonProducto">
              <AiOutlineClose className="icon " />
            </Button>
          </Col>
        </Row>
        <Row>
          <Button variant="primary" type="submit" className=" botonPrincipal ">
            Confirmar Reserva
          </Button>
        </Row>
      </Form>
   
  );
};

export default FormAdmCar;

