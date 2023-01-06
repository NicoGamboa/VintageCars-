import axios from 'axios';
import React, { useContext, useEffect } from 'react'
// import { useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2';
import "../detallesProducto/reservaAlertSwift.css";
import { useLocation,useNavigate } from 'react-router-dom';
// import { useState } from 'react';


function VerificarCodigo() {
    const navigate=useNavigate()
    const searchParams = new URLSearchParams(useLocation().search);
    
    useEffect(() => {
        const VerificarCode = () =>{    
            console.log(searchParams.get('code'))
            const URL_API = "http://3.14.246.73:8080/vintage/usuario/verify"
            axios.post(URL_API,searchParams)
            .then(function () {
                setTimeout(() => {
                    navigate(`/login`)
                }, 2000)
                Swal.fire({ icon: 'success', title:'Cuenta verificada',timer: 2000});
            })
            .catch(function (error) {
                    setTimeout(() => {
                        navigate(`/`)
                    }, 2000)
                    Swal.fire({ icon: 'error', title:'Error al verificar',timer: 2000});
            });
        }
    VerificarCode()
    }, [])
    
    
    return (
        <>
        </>
    )
}

export default VerificarCodigo