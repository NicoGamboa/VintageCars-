import React from "react";
import Item from "./ItemProductos";

import "./cardStyle.css";

const ItemsListProductos = ({ listaProductos }) => {
  return (
    <div className="container">
      {listaProductos.map((datos) => (
        <Item
          key={datos.id}
          id={datos.id}
          categoria={datos.categoria.titulo}
          nombre={datos.titulo}
          ubicacion={datos.ciudad.nombre_ciudad}
          descripcion={datos.descripcion}
          urlImagen={datos.img_principal}
          urlTitulo={datos.titulo}
        ></Item>
      ))}
    </div>
  );
};

export default ItemsListProductos;
