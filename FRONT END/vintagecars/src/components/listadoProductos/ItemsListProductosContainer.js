import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemsListProductos from "./ItemsListProductos";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import "./cardStyle.css";
import { UserContext } from "../../context/UserContext";
import  { useContext } from "react";
import SinProductos from "./SinProducto";


const ItemsListProductosContainer = ({ciudad,categoria,onAction,filtro}) => {
  const { id } = useParams();
  const [listProducts, setListProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [titulo, setTitulo]=useState("")
  const { isAuthenticated } = useContext(UserContext);
  const [productoCero, setProductoCero]= useState(false)
  const [categorias,setCategorias]=useState(false);
  

  const shuffleArray =(array) => {
    for (let i = array.length - 1; i> 0 ; i--) {
      let j = Math.floor(Math.random() * (i+1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      
  }
  }
  useEffect(() => {
    setCategorias(false)
  },[ciudad,categoria])
  useEffect(() => {
    setProductoCero(false)
  },[ciudad,categoria,onAction])
  useEffect(() => {
    const url = id
      ? `http://3.14.246.73:8080/vintage/categorias/${id}`
      : "http://3.14.246.73:8080/vintage/producto";
    

    // console.log(url);
    const getProductos = async () => {
      try {
        if(ciudad.length===0&&categoria.length===0){
          if(filtro==="con"&&categorias===false){
          setProductoCero(true)
          setTitulo(`Upss no se encontraron productos`)
        }else{
          const respuesta = await axios.get(url);
          if(!isAuthenticated){
            shuffleArray(respuesta.data);
            setListProducts(respuesta.data);
          } else{ 
            setListProducts(respuesta.data);
          }
          setListProducts(respuesta.data);
          setTitulo(`RECOMENDACIONES`)
        }
        }else if (categoria.length===0&&ciudad.length!==0){
          let tituloCiudad = ciudad[0].ciudad.nombre_ciudad
          setListProducts(ciudad)
          setTitulo(`CIUDAD ${tituloCiudad}`)
        }else{
          let tituloCategoria = categoria[0].categoria.titulo
          setListProducts(categoria)
          setTitulo(`CATEGORIA ${tituloCategoria}` )
      }}catch (error) {
        setError(error.message);
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } finally {
        setLoading(false);
      }
      
    };

    getProductos();
    
  }, [ciudad,categoria,isAuthenticated]); 
  
  function eliminarFiltros(){
    onAction()
    setProductoCero(false)
    setCategorias(true)
  }
  return (
    <>  
    <h3 className="tituloRecomendacion">{titulo}</h3>
      {loading ? (
      <div className="skeletoncontainer">
          <div className="skeleton2"></div>
          <div className="skeleton2"></div>
          <div className="skeleton2"></div>
          <div className="skeleton2"></div>
      </div>
      ) : (
            <>
            {productoCero ? <SinProductos onAction={eliminarFiltros}/> : <ItemsListProductos listaProductos={listProducts} />}
            </>
      )}
    </>
  );
};

export default ItemsListProductosContainer;
