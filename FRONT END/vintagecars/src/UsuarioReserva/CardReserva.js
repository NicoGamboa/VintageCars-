import React from "react";
import Card from 'react-bootstrap/Card';
import "./UsuarioReserva.css";
function CardReserva({img,nombreproducto,inicioReserva,finReserva,horaRetiro}) {
    return (
    <div className="cardReserva">
    <Card className="reservarow">
        <Card.Body className="bodyCardReserva">
            <Card.Img variant="top" className="imgReserva" src={img} />
            <Card.Title className="cardTituloCategoria">{nombreproducto}</Card.Title>
            <Card.Text className="textoReserva">Hora Retiro: {horaRetiro}</Card.Text>
            <Card.Text className="textoReserva">Fecha inicio Reserva: {inicioReserva}</Card.Text>
            <Card.Text className="textoReserva">Fecha final de  Reserva: {finReserva}</Card.Text>
        </Card.Body>
    </Card>
    </div>
    )
}

export default CardReserva;