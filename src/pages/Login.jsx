import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import imagen1 from "../images/imagensign-in.jpg"
import imagen2 from "../images/logo.png"
import { useState } from 'react';

export default function Login() {

  const [formData, setFormData] = useState({
    email: "",
    contrasenia: ""
  })

  const handleLogin = async (event) => {
    event.preventDefault(); // <-- evita que se recargue
    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();


      if (res.ok) {
        console.log("Respuesta del backend:", data);
        localStorage.setItem('usuario', JSON.stringify(data.usuario)) //ESTO ES PARA GUARDAR EL LOGIN DEL USUARIO Y TENER LAS ALERTAS DESDE EL
        alert('Inicio de sesión exitoso');
        navigate('/community');
      } else {
        alert('Error: Usuario no creado');
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
      alert('Error al conectar con el servidor');
    }
  };

  // Estado para manejar errores
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };



  return (
    <div className="flex min-h-screen rounded-xl">
      {/* Imagen a la izquierda */}
      <div className="hidden md:flex md:w-2/5 items-center justify-center p-0 rounded-xl">
        <img
          src={imagen1}
          alt="Escena del crimen"
          className="w-full h-full object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Formulario a la derecha */}
      <div className="flex flex-col items-center justify-center w-full md:w-3/5 p-8 bg-white shadow-lg">
        <div className="flex flex-col items-center mt-10">
          <img src={imagen2} alt="Logo" className="w-20" />
          <h2 className="text-4xl font-bold mt-2">Sign in to GeoCrimen</h2>
        </div>

        <form className="mt-10 w-full max-w-sm space-y-4">
          <div>
            <label className="mt-5 block text-sm font-medium">Correo</label>
            <input
              type="text"
              name='email'
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-black/50 rounded mt-1"
            />
          </div>

          <div className="mt-20">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="contrasenia"
              value={formData.contrasenia}
              onChange={handleChange}
              className="w-full p-2 border border-black/50 rounded mt-1"
            />
          </div>
          <Link to="/forgotP1">
            <p className="grid justify-items-end mt-4 text-sm underline underline-offset-1">
              Forgot Password?</p>
          </Link>

          <button
            type="submit"
            className="w-20 mt-20 mx-40 bg-white border border-black text-black font-bold py-2 rounded transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white"
            onClick={handleLogin}>
            Sign in
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
