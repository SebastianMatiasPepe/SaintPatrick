import React from 'react'
import logo from './images/logo.png';
import { useNavigate } from "react-router-dom"; 

const Saldo = () => {

  const navigate = useNavigate();
  
  return (
    <>
      <div className='mt-2 d-flex justify-content-between'>
        <div className='d-flex'> 
            <img src={logo} alt="logo" width="40"/>
            <p className='mx-2 mt-2'>Bienvenido <b>Banco Saint Patrick</b></p>
        </div>
        <div className='d-flex justify-content-end'>
            <button className='btn btn-success'  onClick={() => navigate("/CierreSesion")}>Cerrar Sesion</button>
        </div>
      </div>

      <div>
            <div className="container text-center mt-5">
                <h1 className="mb-4 mt-5">Bienvenido a tu cuenta bancaria</h1>
                 
                    <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "400px" }}>
                        <h4 className="mb-3">Saldo Disponible</h4>
                        <h2 className="text-success"> u$s 5960</h2>
                        
                    </div>
            </div>
            <div className="container text-center mt-5">
                <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "400px" }}>
                    <h4>Ultimos movimientos</h4>
                    <ul className='list-unstyled fs-5'>
                        <li className='mt-3 text-center border'>u$s 2504</li>
                        <li className='mt-3 text-center border'>u$s 4582</li>
                        <li className='mt-3 text-center border'>u$s 4784</li>
                        <li className='mt-3 text-center border'>u$s100</li>
                        
                    </ul>
                    <button className="btn btn-primary mt-3">
                         Transferir
                        </button>
                </div>
            </div>
      </div>
    </>
  )
}


export default Saldo
