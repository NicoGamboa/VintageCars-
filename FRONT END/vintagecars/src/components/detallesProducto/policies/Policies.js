import React from "react";
import "./policiesStyle.css";

const Policies = ({ productos }) => {
  return (
    <div className="policiesStyles">
      <div>
        {" "}
        <h4 className="tituloPolicies">Cancelación</h4>
        <p>{productos.cancelacion}</p>
      </div>
      <div>
        <h4 className="tituloPolicies">Normas</h4>
        <p>{productos.norma}</p>
      </div>
      <div>
        <h4 className="tituloPolicies">Seguridad</h4>
        <p style={{}}>{productos.seguridad}</p>
      </div>
    </div>
  );
};
export default Policies;
