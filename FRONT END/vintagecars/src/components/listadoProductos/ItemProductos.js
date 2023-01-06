import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
const Card = ({
  id, 
  nombre,
  categoria,
  descripcion,
  urlImagen,
  urlTitulo,
  ubicacion,
}) => {
  return (
    <div className="cardContainer text-center" id="producto">
      <img className="cardImg" src={urlImagen} alt={urlTitulo} />
      <div className="card-body">
        <h4 className="card-title">
          <b>{nombre}</b>
        </h4>
      
        <h6 className="categoria-auto">{categoria} </h6>
        <p>
          {" "}
          <IoLocationOutline /> <span>{ubicacion}</span>
        </p>
        
        <p className="card-text listado-autos">{descripcion.substring(0,90)}...</p>
        
        <Link to={`/producto/${id}`}>
          <button>Ver detalle</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
