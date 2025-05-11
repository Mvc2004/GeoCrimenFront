import React from 'react';
import { useNavigate } from "react-router-dom";
import imagen1 from "../images/imgfondo/forgot.jpeg";
import imagen2 from "../images/logo/logo.png"



function ForgotPassword2(){

    const navigate = useNavigate();
  
    return(

    <div className="relative w-full h-screen overflow-hidden">
  {/* Imagen de fondo desenfocada */}
  <img
    src={imagen1}
    alt="Fondo"
    className="absolute inset-0 w-full h-full object-cover blur-sm"
  />

  {/* Overlay opcional para mejorar el contraste del contenido */}
  <div className="absolute inset-0 bg-black/30" />

  {/* Contenido principal */}
  <div className="relative z-10 flex flex-col items-center h-full p-8">
    {/* Logo y título */}
    <div className="mt-20 flex flex-col items-center">
      <img src={imagen2} alt="Logo" className="w-20" />
      <h2 className="text-2xl text-white font-bold mt-4">¿Olvidaste tu contraseña?</h2>
    </div>

    {/* Formulario */}
    <div className="mt-10 flex flex-col rounded-xl bg-white/50 backdrop-blur-lg p-6 shadow-lg">
      <form className="w-80 max-w-screen-lg sm:w-96">
        <div className="mb-6">
          <label className="block mb-2 text-sm text-black font-bold">Nueva Contraseña</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Nueva Contraseña"
            className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/forgotP2")}
            className="mt-4 w-[110px] rounded-md bg-[#003049] font-bold py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-500 hover:bg-[#2E8B57] duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
          >
            Cambiar
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

      )

}export default ForgotPassword2;