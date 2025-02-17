import React from 'react';
import logo from './images/logo.png';
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="LoginBg d-flex justify-content-around align-items-center vh-100 px-5">
      <div className='fs-5'>
         <b className='mx-4'>Te convocamos </b>
         <p className='mb-5 mx-4'>a pensar en grande</p>
        <b className='mt-5 mx-5'>Pensá en <br />BANCO SAINT PATRICK </b>
      </div>
      <div>
        <img src={logo} alt="logo" width="250" className='ml-5' />
      </div> 

      <div className="d-flex flex-column align-items-end">
        <div className="alert mx-5 shadow-sm">
          <p>
            ALERTA VIRUS/ESTAFAS: Si ves un mensaje de actualización/autenticación de datos/programas/certificados 
            digitales o similares, tu computadora está infectada, NO INGRESES TOKEN y comunícate urgente con nosotros.
          </p>
        </div>  

        <div className="login mx-5 shadow-lg p-4">
          <h4 className="text-center mt-2">Ingresá a Banca Internet</h4>
          
          <div className="loginUser d-flex flex-column mt-4"> 
            <label>Usuario</label>
            <input type="text" className="rounded-2" />
            
            <label className="mt-3">Contraseña</label>
            <input type="password" className="rounded-2" />
          </div>

          <button className="mt-4 btn btn-success loginBtn w-100" onClick={() => navigate("/Saldo")}>Ingresar</button>
          <hr className="mt-3" />
          <p className="text-center">No podes ingresar, ¿sos nuevo?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
