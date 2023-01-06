import React from "react";
import Card from 'react-bootstrap/Card';
import "./categorias.css";
function CardCategoria({nombre,img,descripcion,onAction}) {
    return (
       
    <div onClick={onAction} className="cardCategoria">
    <a href="#producto" className="aproducto"> 
    <Card>
        <Card.Img variant="top" className="imgCategoria" src={img} />
        <Card.Body className="bodyCardCategoria">
            <Card.Title className="cardTituloCategoria">{nombre}</Card.Title>
            <Card.Text className="textoCategoria">
            {descripcion}
            </Card.Text>
        </Card.Body>
    </Card>
    </a> 
    </div>
    )
}

export default CardCategoria;


