import React, { useState, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import FormAdmCar from "./FormAdmCar";
import "./AdminProducto.css";
import { AxiosRequest } from "../helpers/AxiosHelper";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminProducto = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [ciudad, setCiudad] = useState({
    id: "",
  });
  const [categoria, setCategoria] = useState();
  const imagenes1=[];

  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
    img_principal: "",
    latitud: "",
    longitud: "",
    urlImages:[]
    
  });

  const [caracteristicas, setCaracteristicas] = useState([]);

  // const validacion = () => {
  //   const validationErrors = {};
  //   let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  //   let regexURL = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-])\/?$/;
  //   if (!formValues.nombre) {
  //     validationErrors.name = "Este campo es obligatorio";
  //   } else if (!regexName.test(formValues.nombre)) {
  //     validationErrors.nombre = "Este campo solo acepta letras";
  //   }
  //   if (!categorias.id) {
  //     errors.categoria = "Este campo es obligatorio!";
  //   }
  //   if (!formValues.direccion) {
  //     errors.direccion = "Este campo es obligatorio!";
  //   }
  //   if (!ciudades.id) {
  //     errors.ciudad = "Este campo es obligatorio!";
  //   }
  //   if (!formValues.descripcion) {
  //     errors.descripcion = "Este campo es obligatorio!";
  //   }
  //   if (!formValues.salud) {
  //     errors.salud = "Este campo es obligatorio!";
  //   }
  //   if (!formValues.normas) {
  //     errors.normas = "Este campo es obligatorio!";
  //   }
  //   if (!formValues.cancelacion) {
  //     errors.cancelacion = "Este campo es obligatorio!";
  //   }

  //   return validationErrors;
  // };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };
  const handleCiudadChange = ({ id }) => {
    setCiudad({ id: id });
    setErrors({
      ...errors,
      ciudad: "",
    });
  };
  const handleCategoriaChange = ({ id }) => {
    setCategoria({ id: id });
    setErrors({
      ...errors,
      categoria: "",
    });
  };
  const handleSelectCaracteristicas = (caracteristicas) => {
    setCaracteristicas(caracteristicas.map((item) => ({ id: item.id })));
    setErrors({
      ...errors,
      caracteristicas: [],
    });
  };
  const handleAddUrlImage = (e) => {
    e.preventDefault();
    const imagen = {
      "titulo":formValues.titulo,
      "url":formValues.url
    }
      imagenes1.push(imagen)
      console.log(imagenes1);
  };
  console.log(imagenes1)
  

  const fileImagen = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    // setErrors({ ...errors, ...validacion(formValues) });
    const token = localStorage.getItem('Token')
    //const token = "eyJhbGciOiJIUzI1NiJ9.eyJ2ZXJpZmljYWRvIjp0cnVlLCJzdWIiOiJwYXR0OGlAaG90bWFpbC5jb20iLCJuYW1lIjoiUGF0cmljaWEiLCJsYXN0X25hbWUiOiJEZWwgQ2FzdGlsbG8iLCJpZCI6NDYsImV4cCI6MTY3MDgyNDg1MywiaWF0IjoxNjcwODIxMjUzLCJyb2wiOnsiaWQiOjEsIm5vbWJyZSI6IlJPTEVfQURNSU4ifX0.2SOP5iUY50chTJChayPCAhNeNemU_X6IYB2SUqwBYPU";
    const newProducto = {
      "titulo": formValues.nombre,
        "descripcion": formValues.descripcion,
        "img_principal": formValues.imagen,
        "latitud": parseFloat(formValues.latitud),
        "longitud": parseFloat(formValues.longitud),
        categoria,
        ciudad,
        "imagenes": imagenes1,
        caracteristicas,
        "politica": {
            "norma": formValues.norma,
            "seguridad": formValues.segurida,
            "cancelacion": formValues.cancelacion,
        }
    };
    console.log(newProducto);
    console.log(token);
    const URL_API = "http://3.14.246.73:8080/vintage/producto"
    axios.post(
      URL_API,
        newProducto,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then(()=>{
      Swal.fire({
        icon: "success",
        title: "¡Muchas Gracias!",
        text: `Su producto se ha subido con éxito `,
      });
    })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: "Lamentablemente el producto no ha podido crearse. Por favor intente más tarde",
        });
      });
  };

  return (
    <>
      {" "}
      <Container>
        <Row className="conteinerAdmTitulo">
          <Col xs={8} sm={8} md={8} lg={8}>
            <h2 className="productoAdmTitulo">ADMINISTRACION</h2>
          </Col>
          <Col className="columnaAdmFlecha" xs={4} sm={4} md={4} lg={4}>
            <Link to="/">
              <h2 className="admFlecha">
                <SlArrowLeft className="" />
              </h2>
            </Link>
          </Col>
        </Row>

        <FormAdmCar
          handleCategoriaChange={handleCategoriaChange}
          handleSubmit={handleSubmit}
          handleCiudadChange={handleCiudadChange}
          handleChange={handleChange}
          formValues={formValues}
          fileImagen={fileImagen}
          handleSelectAttribute={handleSelectCaracteristicas}
          handleAddUrlImage={handleAddUrlImage}
        />
      </Container>
    </>
  );
};

export default AdminProducto;