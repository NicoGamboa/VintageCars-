import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ItemProductDetail from "./ItemProductDetail";
import Spinner from "react-bootstrap/Spinner";
import ReservaFechas from "./reservafecha";


const ItemProductDetailContainer = () => {
  const { id } = useParams();
  const [itemProducto, setItemProducto] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducto = async () => {
      const baseUrl = `http://3.14.246.73:8080/vintage/producto/${id}`;
      try {
        const respuesta = await axios.get(baseUrl);
        // console.log(respuesta);
        setItemProducto(respuesta.data);
        console.log(itemProducto)
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
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
          
            
      <ReservaFechas producto={itemProducto} />
      )}
      </>
  );
};

export default ItemProductDetailContainer;
