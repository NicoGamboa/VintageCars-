import React from "react";
import Button from "react-bootstrap/Button";
import { useEffect, useState,useContext } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { BsCalendar } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import "./buscador.css";
import axios from "axios";
import ListadoCategorias from "../categorias/listadoCategorias";
import Calendario from "../reservaCalendario/reservaCalendario";
import { FechaContext } from '../../context/UseContext';
import { compareAsc, format } from 'date-fns'

registerLocale("es", es);

function Buscador(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [producto, setProducto] = useState([]);
  const [nombreCiudades, setNombreCiudades] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const {startDate1}=useContext(FechaContext);
  const {endDate1}=useContext(FechaContext);
  const [filtro , setFiltro] = useState("");
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
    setCheckOutDate(null);
  };

  // define handler change function on check-out date
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };

  useEffect(() => {
    const obtenerListaCiudad = async()=>{
      const url = `http://3.14.246.73:8080/vintage/ciudad`;
      const result = await axios.get(url);
      setNombreCiudades(result.data);
    };
    obtenerListaCiudad();
  }, []);

  const formatearFecha=(fecha)=>{
    if(fecha==null){
      return "";
  }else{
    let day = fecha.getDate()
    let month = fecha.getMonth() + 1
    let year = fecha.getFullYear()
    if(month < 10){
      if(day < 10){
    return(`${year}-0${month}-0${day}`)
      }else{
        return(`${year}-0${month}-${day}`)
      }
    }else{
      if(day < 10){
        return(`${year}-${month}-0${day}`)
          }else{
            return(`${year}-${month}-${day}`)
          }
  }
  }
}
  const valor_ciudad = () => {
    const valor = document.querySelector(".inputciudades").value;
    const fechaInicio = formatearFecha(startDate1)
    const fechaFin =formatearFecha(endDate1)
    const baseUrl = `http://3.14.246.73:8080/vintage/producto`;

    let url = null
    if(valor===""&&fechaInicio===""&&fechaFin===""){
      url = baseUrl;
    }else if (valor!==""&&fechaInicio===""&&fechaFin===""){
      url = baseUrl + `/id_ciudad/${valor}`
    }else if (valor===""&&fechaInicio!==""&&fechaFin!==""){
      url = baseUrl + `/fechainicio/${fechaInicio}/fechafin/${fechaFin}`
    }else{
      url = baseUrl + `/id_ciudad/${valor}/fechainicio/${fechaInicio}/fechafin/${fechaFin}`
    }
    const obtenerProductos = async () => {
      try {
      const result = await axios.get(url);
      setProducto(result.data);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    setFiltro("con");
    obtenerProductos();
  };
  return (
    <>
      <form className="contenedorbuscador">
        <section className="contenedorbotones">
          <div>
            <h5 className="titulobuscador">BUSCA TU AUTO</h5>
          </div>
          <div>
            <label className="desplegable">
              <CiLocationOn className="iconobuscador" />
              <input
                className="inputciudades"
                list="browsers"
                name="myBrowser"
                placeholder="¿Donde Estamos?"
              />
              <datalist id="browsers">
                {nombreCiudades.map((items) => (
                  <option key={items.id} value={items.nombre_ciudad} />
                ))}
              </datalist>
            </label>
          </div>

          <div className="input-container">
            <div className="Fechacalendario">
              <label className="FechaRetirolabel2">

                <BsCalendar className="calendario2" />
                <Calendario
                 monthsShown={1}
                />   

            </label>
            </div>
          </div>
          <Button href="#producto"
            onClick={() => {
              valor_ciudad();
            }}
            className="boton"
            variant="dark"
          >
            Buscar
          </Button>
        </section>
      </form>
      <h3 className="tituloCategoria">BUSCAR POR CATEGORIA</h3>
      <ListadoCategorias ciudad={producto}  filtro={filtro}/>
    </>
  );
}

export default Buscador;
