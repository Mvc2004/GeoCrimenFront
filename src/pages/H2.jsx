import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {MagnifyingGlassIcon, MapPinIcon,EyeIcon} from '@heroicons/react/24/solid'
import {ChevronRightIcon, ChevronLeftIcon, ChevronUpIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from '@heroicons/react/24/outline'
import imagen5 from "../images/Homicidio.jpeg";
import imagen6 from "../images/Hurto.jpeg";

const images = [imagen5, imagen6];

function H2() {

  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // abrir y cerrar informacion
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //abrir y cerrar barra lateral
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/${searchTerm}`);
    }
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };
  
  {/*Funciones Mapa de Calor*/}
  const [map, setMap] = useState(null);
  const [heatmap, setHeatmap] = useState(null);

    useEffect(() => {
      // Carga del script de Google Maps
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDwz-GvKSjm3HLrOENzt94cDaD_dDm-IMg&libraries=visualization`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      window.document.body.appendChild(googleMapScript);
  
      googleMapScript.addEventListener('load', () => {
        initMap();
      });
  
      return () => {
        // Limpieza al desmontar
        if (googleMapScript.parentNode) {
          googleMapScript.parentNode.removeChild(googleMapScript);
        }
      };
    }, []);
  
    const initMap = () => {
      // Coordenadas iniciales (puedes ajustarlas según tu ubicación deseada)
      const initialLocation = { lat: 4.084722, lng: -76.198611 }; // Tuluá, Colombia como ejemplo
  
      // Crear el mapa
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: initialLocation,
        zoom: 12,
        mapTypeId: "roadmap",
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
  
      setMap(mapInstance);
  
      // Datos de ejemplo para el mapa de calor (deberías reemplazar esto con tus datos reales)
      const crimeData = [
        { location: new window.google.maps.LatLng(4.6097, -74.0817), weight: 5 },
        { location: new window.google.maps.LatLng(4.6200, -74.0850), weight: 3 },
        { location: new window.google.maps.LatLng(4.6150, -74.0700), weight: 7 },
        { location: new window.google.maps.LatLng(4.5950, -74.0900), weight: 2 },
        { location: new window.google.maps.LatLng(4.6300, -74.0650), weight: 9 },
        { location: new window.google.maps.LatLng(4.5800, -74.1000), weight: 6 },
      ];
  
      // Crear el mapa de calor
      const heatmapInstance = new window.google.maps.visualization.HeatmapLayer({
        data: crimeData,
        map: mapInstance,
        radius: 200,
        opacity: 0.7,
        gradient: [
          'rgba(0, 255, 255, 0)',
          'rgba(0, 255, 255, 1)',
          'rgba(0, 191, 255, 1)',
          'rgba(0, 127, 255, 1)',
          'rgba(0, 63, 255, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(0, 0, 223, 1)',
          'rgba(0, 0, 191, 1)',
          'rgba(0, 0, 159, 1)',
          'rgba(0, 0, 127, 1)',
          'rgba(63, 0, 91, 1)',
          'rgba(127, 0, 63, 1)',
          'rgba(191, 0, 31, 1)',
          'rgba(255, 0, 0, 1)'
        ]
      });
  
      setHeatmap(heatmapInstance);
    };

  return (

    <div className="relative bg-indigo-500">
      <div className="bg-black flex justify-center">
        <div 
          id="map" 
          className="w-screen" 
          style={{ height: "100vh" }}
        />

  {/* Sidebar */}
  <div
    className={`fixed top-0 left-0 z-40 h-screen max-w-[20rem] w-full bg-white shadow-xl transition-transform duration-300 transform ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <div className="flex flex-col h-full p-4 text-gray-700 relative">
      {/* Botón para cerrar */}
      <button
        onClick={() => setIsSidebarOpen(false)}
        className="absolute right-[-32px] top-1/2 transform -translate-y-4/2 bg-white rounded-r-md px-2 py-4 z-30 shadow-xl"
      >
        <ChevronDoubleLeftIcon className="w-4 h-4 text-gray-500" strokeWidth={3} />
      </button>

      {/* Buscador */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative h-10 w-full">
          <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
            <MagnifyingGlassIcon className="h-5 w-5 text-black" />
          </div>
          <input
            className="peer h-full w-full rounded-md border border-slate-400 bg-transparent px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition duration-300 focus:border-slate-400 hover:border-slate-300 focus:shadow"
            value ={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar"
          />
        </div>
      </form>

      {/* Carrusel */}
      <div className="relative h-40 overflow-hidden rounded-lg mb-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`absolute block w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
              i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            alt={`Slide ${i + 1}`}
          />
        ))}
        <button
          onClick={handlePrev}
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group"
        >
          <ChevronLeftIcon className="w-5 h-5 text-white" strokeWidth={4.5} />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group"
        >
          <ChevronRightIcon className="w-5 h-5 text-white" strokeWidth={4.5} />
        </button>
      </div>

      {/* Menús */}
      <hr className="my-2 border-blue-gray-50" />
      <nav className="p-3 text-xl font-semibold text-black">
        <p>Reportes</p>
      </nav>
      <hr className="my-2 border-blue-gray-50" />

      {/* Acordeón */}
      <nav className="flex flex-col gap-1 p-2 text-base text-blue-gray-700">
        <div className="w-full rounded-md">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full p-3 text-xl font-semibold text-blue-gray-700 hover:text-blue-gray-900"
          >
            <div className="flex items-center gap-5 font-bold text-black">
              <MapPinIcon className="h-5 w-5" />
              <p>Información</p>
            </div>
            <ChevronUpIcon
              className={`w-5 h-5 text-black transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              strokeWidth={3}
            />
          </button>
          {isOpen && (
            <div className="p-3 bg-blue-100 text-blue-800 rounded-md">
              Aquí va el contenido del Dashboard.
            </div>
          )}
        </div>
      </nav>

      <nav className="flex flex-col gap-1 p-2 text-base text-blue-gray-700">
        <div className="w-full rounded-md">
          <button
            type="button"
            onClick={() => navigate("/community")}
            className="flex items-center justify-between w-full p-3 text-xl font-semibold text-blue-gray-700 hover:text-blue-gray-900"
          >
            <div className="flex items-center gap-5 font-bold text-black">
              <EyeIcon className="h-5 w-5" />
              <p>Reportes</p>
            </div>
          </button>
        </div>
      </nav>
    </div>
  </div>

  {/* Botón para abrir (solo si está cerrado) */}
  {!isSidebarOpen && (
    <button
      onClick={() => setIsSidebarOpen(true)}
      className="fixed left-[0.2px] top-1/2 transform -translate-y-4/2 bg-white rounded-r-md px-2 py-4 z-50 shadow-xl"
    >
      <ChevronDoubleRightIcon className="w-4 h-4 text-gray-500" strokeWidth={3} />
    </button>
  )}
</div>
      </div>
  );

}export default H2;







 