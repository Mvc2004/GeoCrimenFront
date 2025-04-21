import React, { useState } from 'react';
import imagen1 from "../images/logo.png";
import imagen2 from "../images/usuario.png";
import imagen3 from "../images/notificacion.png";
import imagen4 from "../images/tulua.png";
import imagen5 from "../images/Homicidio.png";
import imagen6 from "../images/Hurto.png";

import { Link } from 'react-router-dom';


function Community() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
      e.preventDefault();
      if (onSearch) {
        onSearch(searchTerm);
      }
    };
  return (
    <div className="min-64-screen bg-[#E0E0E0]">
      {/* Contenedor principal con flex-row para organizar las particiones horizontalmente */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Particion 1 (izquierda) */}
        <div className="flex flex-col w-full md:w-1/5 p-8 bg-[#E0E0E0] shadow-lg">
          <div className="grid justify-items-center">
            <img src={imagen1} alt="Logo" className="w-20" />
        </div>

        <div className="mt-40 grid grid-cols-2 content-start gap-0" >
            <div className="w-10 h-10">
                <img src={imagen2} alt="Perfil" />
            </div>
            <Link to="/profile"><p className="mt-2 text-black font-roboto-medium">Perfil</p></Link>
        </div>

          <div className="mt-20 grid grid-cols-2 content-start" >
            <div className="w-10 h-10">
                <img src={imagen3} alt="Notificacion" />
            </div>
            <p className="mt-2 text-black font-roboto-medium">Notificaciones</p>

            <div className="mt-20 w-10 h-10">
                <img src={imagen4} alt="Mapa" />
            </div>
            <Link to="/h"><p className="mt-20 text-black font-roboto-medium">Mapa de Calor</p></Link>


          </div>
        </div>
        


        {/* Particion 2 (centro) */}
        <div className="w-full md:w-3/5 p-8 bg-[#E0E0E0] shadow-lg">
        
            <div className="relative w-full max-w-md mx-auto">
                <form onSubmit={handleSearch}>
                    <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-full focus:outline-none focus:ring-2 focus:ring-black-500"/>

                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    {/* Icono de lupa */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="w-5 h-5 text-black"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-[#FFFFF] rounded-full hover:bg-black/50
                  transition-all duration-200 active:scale-90"
                >
                   {/* Ícono de micrófono */}
                  <svg
                    className="size-5 stroke-current text-black"
                    fill="none"
                    //stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 1v8m0 0a3 3 0 01-3-3V4a3 3 0 016 0v2a3 3 0 01-3 3zm6 3v1a6 6 0 01-12 0v-1m6 6v3m-4 0h8"
                    ></path>
                  </svg> 
                </button>
                    </div>
                </form>

            </div>
        </div>
        
        {/* Particion 3 (derecha) */}
        <div className="grid justify-items-center w-full md:w-1/5 p-8 bg-[#E0E0E0] shadow-lg">
          {/* Contenido para la partición derecha */}
          {/*panel 2 (hurto y homicidio)*/}
          <div className='grid justify-items-center gap-10'>
            {/*panel Homicidio*/}
            <div className='w-20 gap-0'>
            <Link to="/reports">
              <button
                  type="button"
                  className="w-20 mt-20 bg-black text-[#D32F2F] py-3 rounded rounded-xl transition-all duration-500
                  active:scale-90 active:bg-[#D32F2F] active:text-[#1A1A1A] shadow-lg hover:bg-[#D32F2F] hover:text-black font-Roboto-bold"
                >
                Reportar Homicidios
                </button>
              </Link>
            </div>

            {/*panel hurto*/}
            <div className='w-20'>
              <Link to="/reports">
                <button
                    type="button"
                    className="w-20 mt-20 bg-[#FFA000]  text-black py-3 rounded rounded-xl transition-all duration-500 
                    active:scale-90 active:bg-[#FFA000] active:text-black shadow-lg hover:bg-black hover:text-[#FFA000] font-Roboto-bold "
                  >
                  Reportar Hurtos
                  </button>
              </Link>
            </div>
          </div>
        </div>




      </div>
    </div>
  );
}

export default Community;