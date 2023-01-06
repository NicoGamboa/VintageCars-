import React from 'react';
import "./sinProducto.css";

const SinProductos = ({onAction}) => {
    return (
        <div className='sinProductosContainer'>
        <h3 className='tituloSinProductos'>No hay productos habilitados con los filtros seleccionados</h3>
        <button className='butonVerTodos' onClick={onAction} >Eliminar filtros</button>
        </div>
    )
}

export default SinProductos