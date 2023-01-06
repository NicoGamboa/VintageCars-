import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import ReservaFechas from "./reservafechas";


const ReservaContainer = () => {
  const { id } = useParams();
  const [itemProducto, setItemProducto] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducto = async () => {
      const baseUrl = `http://3.14.246.73:8080/vintage/producto/${id}`;
    
      try {
        const respuesta = await axios.get(baseUrl);
        setItemProducto(respuesta.data);
      } catch (error) {
        setError(error.message);
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } finally {
        setLoading(false);
      }
    };
    getProducto();
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
      <ReservaFechas producto={itemProducto} />
      )}
      </>
  );
};

export default ReservaContainer;