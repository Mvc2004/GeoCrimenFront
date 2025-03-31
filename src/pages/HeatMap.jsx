import React, { useState } from "react";

function HeatMap() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscando:", searchTerm);
  };

  return (
    <div className="flex w-full h-screen">
      {/* Panel Izquierdo (40%) */}
      <div className="w-2/5 bg-gray-100 p-4 flex flex-col h-full">
        {/* Sección 1: Barra de Búsqueda */}
        <div className="flex w-screen p-40 py-20 bg-pink-200 place-content-start">
            <div className="w-80">
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
        {/* Sección 2: Información de la Búsqueda */}
        <div className="flex w-screen py-20 mt-0 border border-black">
          <h3 className="text-lg font-semibold">Agua Clara</h3>
          <p className="text-gray-600">Cra. 28a</p>
        </div>

        {/* Sección 3: Opciones de Reportes e Información */}
        <div className="bg-blue-500 flex w-screen py-20 shadow-md p-4 mt-0 flex flex-col gap-2">
          <button className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16l-4-4m0 0l4-4m-4 4h16"
              ></path>
            </svg>
            <span>Información</span>
          </button>

          <button className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16l-4-4m0 0l4-4m-4 4h16"
              ></path>
            </svg>
            <span>Ver reportes</span>
          </button>
        </div>
      </div>

      {/* Panel Derecho (60%) */}
      <div className="w-3/5 bg-gray-300 relative flex justify-center items-center">
        {/* Botón de Zoom In */}
        <button className="absolute bottom-10 right-4 bg-white p-2 rounded shadow-lg">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </button>

        {/* Botón de Zoom Out */}
        <button className="absolute bottom-4 right-4 bg-white p-2 rounded shadow-lg">
          <svg
            className="w-6 h-6 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default HeatMap;
