import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import imagen1 from "../images/b.jpg";
import imagen2 from "../images/logo/logo.png"



function ForgotPassword1(){

    const [formData, setFormData] = useState({
      username: "Usuario123",
      pin: "23 45",
    });
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return(

    <div className="relative w-full h-screen overflow-hidden">
  {/* Imagen de fondo desenfocada */}
  <img
    src={imagen1}
    alt="Fondo"
    className="absolute inset-0 w-full h-full object-cover blur-sm"
  />

  {/* Overlay semitransparente opcional para mejorar contraste */}
  <div className="absolute inset-0 bg-black/30" />

  {/* Contenido principal */}
  <div className="relative z-10 flex flex-col items-center justify-start h-full p-8">
    {/* Logo */}
    <div className="mt-20">
      <img src={imagen2} alt="Logo" className="w-20 mx-auto" />
    </div>

    {/* Título */}
    <h2 className="text-2xl text-white font-bold mt-4">¿Olvidaste tu contraseña?</h2>

    {/* Formulario */}
    <div className="mt-10 flex flex-col rounded-xl bg-white/50 backdrop-blur-lg p-6 shadow-lg">
      <form className="w-80 max-w-screen-lg sm:w-96">
        <div className="mb-6">
          <label className="block mb-2 text-sm text-black">Usuario/email</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your Username or Email"
            className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm text-black">Pin</label>
          <input
            type="text"
            name="pin"
            value={formData.pin}
            onChange={handleChange}
            placeholder="XX XX"
            className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
          />
        </div>

        {/* Botón */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/forgotP2")}
            className="w-[110px] rounded-md bg-[#003049] font-bold py-2 px-4 text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-500 focus:shadow-none hover:bg-[#2E8B57] duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

  );

}export default ForgotPassword1;