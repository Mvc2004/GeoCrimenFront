import React, { useState } from 'react';
import { UserIcon,BellIcon, MapIcon, MicrophoneIcon } from '@heroicons/react/24/solid'
import imagen1 from "../images/logo/logo.png";
import {useNavigate} from 'react-router-dom';

const plans = [
  { name: "Perfil", path: "/profile" },
  { name: "Notificaciones", path: "/notificaciones" },
  { name: "Mapa de Calor", path: "/heatmap" },
];
function Community() {

    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        navigate(`/${searchTerm}`);
      }
    };
  return (
    <div className="min-64-screen ">
      {/* Contenedor principal con flex-row para organizar las particiones horizontalmente */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Particion 1 (izquierda) */}
        <div className="flex flex-col w-full md:w-1/5 p-8 bg-[#003049] items-center">
          <div className="flex flex-col items-center w-full">
            <img src={imagen1} alt="Logo" className="w-[100px] mb-10" />

            <div className="mt-[80px] w-full space-y-6">
              {plans.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => navigate(plan.path)}
                  className="group relative flex items-center w-full rounded-lg py-5 px-4 transition hover:bg-white/30"
                >
                  <div className="flex-shrink-0 mr-5">
                    {plan.name === "Perfil" && <UserIcon className="h-8 w-8 text-white" />}
                    {plan.name === "Notificaciones" && <BellIcon className="h-8 w-8 text-white" />}
                    {plan.name === "Mapa de Calor" && <MapIcon className="h-8 w-8 text-white" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-2xl font-bold text-white">{plan.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Particion 2 (centro) */}
        <div className="w-full md:w-3/5 p-8 bg-white">
        
        <form onSubmit={handleSearch} className="max-w-md mx-auto">
          <div className="relative flex items-center">
            <div className="absolute flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-[#003049] ml-2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <div className="h-6 border-l border-[#003049]/50 ml-2.5"></div>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md pr-3 pl-14 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Buscar"
            />
            <button
              type="submit"
              className="rounded-md ml-2 bg-[#003049] p-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg focus:bg-grey-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
                <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
        
        {/* Particion 3 (derecha) */}
        <div className="grid justify-items-center w-full md:w-1/5 p-8 bg-[#003049]">
          {/* Contenido para la partición derecha */}
          {/*panel 2 (hurto y homicidio)*/}
          <div className='grid justify-items-center gap-10'>
            <div className='w-40 gap-0 ml-10 text-center'>
              <p className='text-white text-3xl font-bold'>Reporta Facilmente</p>
              <p className='mt-2 text-white text-sm'>!Solo undele al boton!</p>
            </div>
            <div className='w-20 gap-0 mr-5'>
              <button
                  type="button"
                  className="w-[150px] h-[90px] mt-2 text-[#D62828] border-2 border-[#003049]/50 bg-white shadow-xl text-2xl font-bold py-3 rounded rounded-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                  onClick={() => navigate("/reports")}
                >
                Homicidio
              </button>
            </div>
            {/*panel hurto*/}
            <div className='w-20 mr-5'>
              
                <button
                    type="button"
                    className="w-[150px] h-[90px] mt-10 shadow-xl text-[#F77F00] border-2 border-[#003049]/50 bg-white text-2xl font-bold py-3 rounded rounded-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                    onClick={() => navigate("/reports")}
                  >
                  Hurto
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;