import React from "react";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import UseFormLogin from "../../hook/UseFormLogin";
import CloseButton from "react-bootstrap/CloseButton";
import Spinner from "react-bootstrap/Spinner";
import "./login.css";
const Login = () => {
  const { formValues, handleChange, handleSubmit, formErrors, loaded} =
    UseFormLogin();
  return (
    <>
      {loaded ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container
          style={{
            marginTop: "15%",
            marginBottom: "15%",
            paddingBottom: "40px",
            backgroundColor: "#f4edcb",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <h2 className="titulo_cuenta">Iniciar Sesion</h2>
          <Link to="/" className="closeBoton">
            <CloseButton className="closeBoton" />
          </Link>
          <Form className="formulario" sm={12} lg="8" onSubmit={handleSubmit}>
            <Row className="justify-content-md-center">
              <Col sm={12} lg="8">
                {" "}
                <Form.Group className="mb-3 " controlId="formBasicNombre">
                  <Form.Label className="formularioLabel">Username</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="formularioInput"
                    value={formValues.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text">{formErrors?.email}</Form.Text>
                </Form.Group>
              </Col>

              <Col sm={12} lg="8">
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="formularioLabel">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="formularioInput"
                    value={formValues.password}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text">{formErrors?.password}</Form.Text>
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              type="submit"
              className="formularioButton"
            >
              Ingresar
            </Button>
            <Form.Text className="formularioTextarea">
              Aun no tenes cuenta? <Link to="/signup"> Registrate</Link>
            </Form.Text>
          </Form>
        </Container>
      )}
    </>
  );
};

export default Login;
