import React  from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";
import "./signup.css";
import UseFormSignup from "../../hook/UseFormSignup";
import Spinner from "react-bootstrap/Spinner";

const Signup = () => {
  const { formValues, handleChange, handleSubmit, formErrors, loaded } =
    UseFormSignup();

  return (
    <>
      {loaded ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container
          style={{
            marginTop: "12%",
            marginBottom: "15%",
            paddingBottom: "120px",
            backgroundColor: "#f4edcb",
            textAlign: "center",

            flexDirection: "column",
          }}
        >
          <h2 className="titulo_cuenta">Registro</h2>
          <Link to="/" className="closeBoton">
            <CloseButton className="closeBoton" />
          </Link>
          <Form className="formulario" sm={12} onSubmit={handleSubmit}>
            <Row className="justify-content-md-center">
              <Col sm={8} lg="4">
                {" "}
                <Form.Group className="mb- " controlId="formBasicNombre">
                  <Form.Label className="formularioLabel">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    className="formularioInput"
                    name="nombre"
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text">{formErrors?.nombre}</Form.Text>
                </Form.Group>
              </Col>
              <Col sm={8} lg="4">
                <Form.Group className="mb-3" controlId="formBasicApellido">
                  <Form.Label className="formularioLabel">Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apellido"
                    className="formularioInput"
                    name="apellido"
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text">{formErrors?.apellido}</Form.Text>
                </Form.Group>
              </Col>
              <Col sm={8} lg="8">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="formularioLabel">
                    Correo Electronico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="formularioInput"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text">{formErrors?.email}</Form.Text>
                </Form.Group>
              </Col>
              <Col sm={8} lg="8">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="formularioLabel">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="formularioInput"
                    name="password"
                    onChange={handleChange}
                    required=""
                  />
                  <Form.Text className="text">{formErrors?.password}</Form.Text>
                </Form.Group>
              </Col>
              <Col sm={8} lg="8">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="formularioLabel">
                    Confirmar Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=" Confirmar Contraseña"
                    className="formularioInput"
                    name="repeatPassword"
                    value={formValues.repeatPassword}
                    onChange={handleChange}
                    required=""
                  />
                  <Form.Text className="text">
                    {formErrors?.repeatPassword}
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="primary"
              type="submit"
              className="formularioButton"
            >
              Crear Cuenta
            </Button>
            <Form.Text className="formularioTextarea">
              Si ya tenes cuenta ? <Link to="/login"> Iniciar Sesion</Link>
            </Form.Text>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Signup;
