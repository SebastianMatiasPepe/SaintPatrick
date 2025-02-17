import React from 'react'
import logo from './images/logo.png'
import { useNavigate } from 'react-router-dom'

const CierreSesion = () => {

  const navigate = useNavigate();

  return (
    <>
          <div className="container text-center mt-5">
      <h1 className="mb-4 text-danger">Sesión Cerrada</h1>
      <p className="lead">Gracias por confiar en <strong>Banco Saint Patrick</strong></p>
      <img src={logo} alt="" width='200' />


      <div className="card shadow-lg p-4 mx-auto mt-4" style={{ maxWidth: "400px" }}>
        <h4 className="mb-3">Tu sesión ha finalizado</h4>
        <p>Para volver a acceder, inicia sesión nuevamente.</p>
        <button onClick={() => navigate("/")} className="btn btn-primary mt-3">Iniciar Sesión</button>
      </div>
    </div>
    </>
  )
}

export default CierreSesion;