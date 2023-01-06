import React from "react";
import CardCategoria from "./ItemsCategoria";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import ListProductosContainer from "../listadoProductos/ItemsListProductosContainer";
import axios from "axios";



function ListadoCategorias({ciudad,filtro}) {
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState([]);
  const [ciudadProducto, SetCiudadProducto] = useState(ciudad)
  const [conFiltro, setConFiltro]=useState("")
  
  useEffect(()=>{
    setConFiltro(filtro)
  },[filtro] )
  useEffect(() => {
    
    const url = `http://3.14.246.73:8080/vintage/categorias/`;
    const obtenerCategorias = async () => {
      try {
        const result = await axios.get(url);
        setCategorias(result.data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    obtenerCategorias();
  }, [id]);
  
  useEffect(()=>{
    SetCiudadProducto(ciudad)
  },[ciudad])

      const obtenerProductos = async(id)=>{

          const url = `http://3.14.246.73:8080/vintage/producto/id_categoria/${id}`;
          try {
          const result = await axios.get(url);
          setProducto(result.data)
          setConFiltro("con")
          } catch (error) {
          console.log(error.message);
          setError(error.message);
          } finally {
          setLoading(false);
        }
  }
  
  function eliminarFiltros(){
    SetCiudadProducto([])
    setProducto([])
  }

  return (
    <>
      {loading ? (
      <div className="skeletoncontainer2">
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
        <div className="skeleton"></div>
      </div>
      ) : (
        <div className="categoriacontainer">
          
          <div className="row">
            {categorias.map((categoria) => (
              <CardCategoria
                key={categoria.id} 
                id={categoria.id}
                img={categoria.url_imagen}
                nombre={categoria.titulo}
                descripcion={categoria.descripcion}
                onAction={()=>obtenerProductos(categoria.id)}
              />
            ))}
          </div>
        </div>
      )}
      <ListProductosContainer ciudad={ciudadProducto} categoria={producto} onAction={eliminarFiltros} filtro={conFiltro}/>
    </>
  );
}

export default ListadoCategorias;