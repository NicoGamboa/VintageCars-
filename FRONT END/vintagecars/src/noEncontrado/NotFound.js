import React, { useContext } from 'react'

import { Link } from 'react-router-dom';

function NotFound() {



    

    

    return (
        <>
            <div className="not-found">
                <div className="not-found-container">
                    <div className="not-found-image-container">
                        <div className="not-found-image"></div>
                    </div>
                    <div className="not-found-text">
                        <div className="not-found-title">
                            <h1>¡Ups!</h1>
                            <h1>Lo sentimos</h1>
                        </div>
                        <div className="bottom-not-found-text">
                            <h1>Esta página no está disponible o no tienes permiso para acceder.</h1>
                            <Link to={`/`}>
                            <button>Home</button>
                             </Link>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound