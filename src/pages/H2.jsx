import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {MapPinIcon,EyeIcon} from '@heroicons/react/24/solid'
import {ChevronRightIcon, ChevronLeftIcon, ChevronUpIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from '@heroicons/react/24/outline'
import imagen5 from "../images/Homicidio.jpeg";
import imagen6 from "../images/Hurto.jpeg";
import { useTranslation } from 'react-i18next';
import { AccessibilityProvider } from './AccessibilityContext';
import AccesibilidadButton from './AccesibilidadButton';

// Cambio de idioma

const images = [imagen5, imagen6];

function H2() {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // abrir y cerrar informacion
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); //abrir y cerrar barra lateral
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [delitos, setDelitos] = useState([])
  const [loading, setLoading] = useState(true)

  
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  
useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "es-ES"

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchTerm(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = (event) => {
        console.error("no se reconoce el dialogo", event.error)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])

  const toggleListening = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  } 
  useEffect(() => {
      const fetchBusqueda = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/delitos/")
          if (!response.ok) throw new Error("Error al obtener los delitos")
          const data = await response.json()
          setDelitos(data)
        } catch (error) {
          console.error("Error al obtener los delitos:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchBusqueda()
    }, [])
  
    const filteredDelitos = delitos.filter((delito) =>
    delito.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delito.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delito.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  )


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
  
    <AccessibilityProvider>
      <AccesibilidadButton/>

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
      <form className="mt-2 max-w-md mx-auto">
        <div className="relative flex items-center">
          <div className="absolute flex items-center">
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md pr-3 pl-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder={t("crimeSearchAndReports")}
          />

          {/* Microphone Button */}
          <button
            type="button"
            onClick={toggleListening}
            className={`rounded-md ml-2 p-2.5 border border-transparent text-center text-sm text-white transition-all duration-300 shadow-sm hover:shadow-lg focus:outline-none ${
              isListening
                ? "bg-red-600 hover:bg-red-700 active:bg-red-800 animate-pulse"
                : "bg-[#003049] hover:bg-slate-700 active:bg-slate-800"
            }`}
            aria-label={isListening ? "Stop listening" : "Start voice search"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
              <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
            </svg>
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="rounded-md ml-2 bg-[#003049] p-2.5 border border-transparent text-center text-sm text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-slate-700 active:bg-slate-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 14 0A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12.293 12.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

            {/* Listening Indicator */}
            {isListening && (
              <div className="flex items-center justify-center mt-3 space-x-2">
                <div className="text-sm font-medium text-red-600">{t("listening")}</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
          </form>

          {/* Lista de delitos */}
          <div className="mt-6">
            {loading ? (
              <p className="text-center text-gray-500">{t("loadingCrimes")}</p>
            ) : filteredDelitos.length > 0 ? (
              <div className="space-y-4">
                {filteredDelitos.map((delito) => (
                  <div key={delito.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold">{delito.tipo}</h3>
                    <p><strong>Fecha:</strong> {delito.fecha}</p>
                    <p><strong>Dirección:</strong> {delito.direccion}</p>
                    <p><strong>Descripción:</strong> {delito.descripcion}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">{t("noCrimesFound")}</p>
            )}
          </div>

      {/* Carrusel */}
      <div className="mt-5 relative h-40 overflow-hidden rounded-lg mb-4">
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
      <nav className="p-3 text-xl font-semibold text-[#003049]">
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
            <div className="flex items-center gap-5 font-bold text-[#003049]">
              <MapPinIcon className="h-5 w-5" />
              <p>{t("information")}</p>
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
            <div className="flex items-center gap-5 font-bold text-[#003049]">
              <EyeIcon className="h-5 w-5" />
              <p>{t("report")}</p>
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
      </AccessibilityProvider>
  );

}export default H2;







 