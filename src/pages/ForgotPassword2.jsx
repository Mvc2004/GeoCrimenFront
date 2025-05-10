import React from 'react';
import { useNavigate } from "react-router-dom";
import imagen1 from "../images/6.jpg";
import imagen2 from "../images/logo.png"



function ForgotPassword2(){

    const navigate = useNavigate();
  
    return(

    <div className="flex flex-col grid justify-items-center h-screen content-start md:w-100 p-8"
        style={{
            backgroundImage: `url(${imagen1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
        <div className="flex flex-col items-center">
          <span className="mt-20 text-red-500 text-4xl"><img src={imagen2} alt="Logo" className="w-20" /></span>
          <h2 className="text-2xl text-white font-bold mt-2">¿Olvidaste tu contraseña?</h2>
        </div>

        <div className="mt-10 relative flex flex-col rounded-xl bg-white/50 backdrop-blur-lg">
              <form className="mt-10 ml-5 mr-5 mb-5 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  {/* Username */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label className="block mb-2 text-sm text-black">Nueva Contraseña</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Nueva Contraseña"
                      className="w-full bg-white/50 placeholder:text-gray-400 text-gray-700 text-sm border border-gray-500 rounded-md px-3 py-2 pr-10 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                  </div>
                </div>

                {/* Botón */}
                <button
                  type="button"
                  className="mt-10 mb-5 ml-[132px] w-[110px] rounded-md bg-[#003049] font-bold py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-500 focus:shadow-none active:bg-[#2E8B57]-700 hover:bg-[#2E8B57]-900 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100"
                  onClick={() => navigate("/forgotP2")}
                >
                  Cambiar
                </button>
              </form>
            </div>

      </div>
      )

}export default ForgotPassword2;