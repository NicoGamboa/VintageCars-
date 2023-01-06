import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UsuarioReserva from "./UsuarioReserva";
import Spinner from "react-bootstrap/Spinner";


const ReservaUsuarioContainer = () => {
  const { id } = useParams();
  const [itemUsuario, setItemUsuario] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsuario = async () => {
      const baseUrl = `http://3.14.246.73:8080/vintage/reserva/usuario_id/${id}`;
    
      try {
        const respuesta = await axios.get(baseUrl);
        console.log(respuesta);
        setItemUsuario(respuesta.data);
      } catch (error) {
        setError(error.message);
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } finally {
        setLoading(false);
      }
    };
    getUsuario();
  }, [id]);
  return (
    <>
    
    {loading ? (
      <div className="skeletoncontainer">
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
      </div>
      ) : (
      <UsuarioReserva  usuario={itemUsuario} />
      )}
      </>
  );
};

export default ReservaUsuarioContainer;