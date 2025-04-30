import React, { useState } from 'react';
import { UserIcon,BellIcon, MapIcon, MicrophoneIcon } from '@heroicons/react/24/solid'

import imagen1 from "../images/logo.png";
import imagen2 from "../images/usuario.png";
import imagen3 from "../images/notificacion.png";
import imagen4 from "../images/tulua.png";
import imagen5 from "../images/Homicidio.png";
import imagen6 from "../images/Hurto.png";

import { Link, useNavigate} from 'react-router-dom';

const plans = [
  { name: "Perfil", path: "/profile" },
  { name: "Notificaciones", path: "/notificaciones" },
  { name: "Mapa de Calor", path: "/h" },
];
function Community() {

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

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
        <div className="flex flex-col w-full md:w-1/5 p-8 bg-gradient-to-b from-white via-gay-400 to-gray-500 shadow-lg">
          <div className="grid justify-items-center">
            <img src={imagen1} alt="Logo" className="w-20" />
        </div>


         <div className="mt-40 w-full px-1">
          <div className="mx-auto w-full max-w-md space-y-10">
            {plans.map((plan) => (
              <button
                key={plan.name}
                onClick={() => navigate(plan.path)}
                className="group relative flex w-full items-center rounded-lg py-5 pl-6 pr-4 transition hover:bg-white/30"
              >
              {/* ICONO */}
              <div className="flex-shrink-0 mr-4">
                {plan.name === "Perfil" && (
                  <UserIcon className="h-6 w-6 text-black" />
                )}
                {plan.name === "Notificaciones" && (
                  <BellIcon className="h-6 w-6 text-black" />
                )}
                {plan.name === "Mapa de Calor" && (
                  <MapIcon className="h-6 w-6 text-black" />
                )}
              </div>

            {/* TEXTO */}
            <div className="flex-1 text-left">
              <p className="font-bold text-black">{plan.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>

    </div>
        


        {/* Particion 2 (centro) */}
        <div className="w-full md:w-3/5 p-8 bg-gradient-to-b from-white via-gay-400 to-gray-500 shadow-lg">
        
          <div class="max-w-md mx-auto">
            <div class="relative flex items-center">
              <div class="absolute flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

              <div class="h-6 border-l border-slate-200 ml-2.5"></div>
            </div>
 
            <input
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-300 rounded-md pr-3 pl-14 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Buscar" 
            />
            
            <button
              class="rounded-md ml-2 bg-black p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-grey-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
                <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
              </svg>

              </button> 
            </div>
          </div>
        </div>
        
        {/* Particion 3 (derecha) */}
        <div className="grid justify-items-center w-full md:w-1/5 p-8 bg-gradient-to-b from-white via-gay-400 to-gray-500 shadow-lg">
          {/* Contenido para la partición derecha */}
          {/*panel 2 (hurto y homicidio)*/}
          <div className='grid justify-items-center gap-10'>
            {/*panel Homicidio*/}
            <div className='w-20 gap-0'>
            <Link to="/reports">
              <button
                  type="button"
                  className="w-20 mt-20 bg-black text-[#D32F2F] shadow-xl text-sm font-bold py-3 rounded rounded-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
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
                    className="w-20 mt-20 bg-[#FFA000] shadow-xl text-black text-sm font-bold py-3 rounded rounded-xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
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