import React from 'react'
import CardReserva from './CardReserva';
import { Link } from 'react-router-dom';

const UsuarioReserva = ({usuario}) => {

    console.log(usuario.length)
    
  
 
  return (
<>
    {usuario.length ==0 ? (
      <>
     
      
      <h1 className='nohayreserva'>No hay ninguna reserva realizada</h1>
      <Link to={`/`}>
       <button>Ir a Pagina Principal</button>
      </Link>
    
      </>
    ):
      (
        <>
      <h1 className='titulo'>Mis Reservas</h1>
       <div className="row">
       <Link to={`/`}>
       <button> Ir a Pagina Principal</button>
      </Link>
         
         <div className='reservarow' >
     {usuario.map((usuario)=>( 
       <CardReserva     key={usuario.id} 
        id={usuario.id}
        img={usuario.producto.img_principal}
        nombreproducto={usuario.producto.titulo}
        horaRetiro={usuario.horaRetiro}
        inicioReserva={usuario.inicioReserva}
        finReserva={usuario.finReserva}/>))}
             
             </div >
      
             </div >
             </>
    )}
   
   </>
   );
};

export default UsuarioReserva