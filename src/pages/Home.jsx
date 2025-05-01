import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import im1 from '../images/im1.jpeg'
import im2 from '../images/im2.jpeg'
import im3 from '../images/im3.jpeg'
import im4 from '../images/im4.jpeg'
import im5 from '../images/im5.jpeg'
import im6 from '../images/im6.jpeg'
import im7 from '../images/im7.jpeg'
import logo from '../images/logo.png';

function Home() {
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gay-400 to-gray-800">
      <header className="flex justify-between items-center p-4 transition delay-150 duration-300 hover:bg-gray-400 hover:shadow-lg">
        <h1 className="text-xl font-bold flex items-center text-black">
          <span className="text-2xl mr-2">
            <img src={logo} alt="Logo" className="w-11 " />
          </span> GeoCrimen
        </h1>
        <div>
          <Link to="/login" className="mr-10 font-bold text-black underline  hover:text-white">
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-black text-white font-bold rounded-md"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Mapa interactivo */}
      <div className="flex justify-center my-10">
        <div 
          id="map" 
          className="w-4/5 h-100 rounded-md shadow-lg" 
          style={{ height: "500px" }}
        />
      </div>

      {/* Controles del mapa */}
      <div className="flex justify-center space-x-4 mb-8 mt-20">
        <button 
          className="px-4 py-2 text-white font-bold rounded-md border-2 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-white/50 hover:text-black"
          onClick={() => heatmap && heatmap.setMap(heatmap.getMap() ? null : map)}
        >
          Mostrar/Ocultar Mapa de Calor
        </button>
      </div>

      {/* Información de denuncias */}
      <div className="mt-20 flex flex-col m-auto p-auto">
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap min-w-[150%] lg:ml-1 md:ml-20 ml-10">
            <div className="inline-block px-6">
              <div className="mt-10 w-lg max-w-xs overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-xl hover:shadow-xl">
                <img src={im1} alt="Imagen 1 Carrusel" className="w-80 h-64 rounded-md shadow-md"/>
              </div>
            </div>
            <div className="inline-block px-6">
              <div className="mt-10 w-lg max-w-xs overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-xl hover:shadow-xl">
                <img src={im2} alt="Imagen 2 Carrusel" className="w-80 h-64 rounded-md shadow-md"/>
              </div>
            </div>
            <div className="inline-block px-6">
              <div className="mt-10 w-lg max-w-xs overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-xl hover:shadow-xl">
                <img src={im3} alt="Imagen 3 Carrusel" className="w-80 h-64 rounded-md shadow-md"/>
              </div>
            </div>
            <div className="inline-block px-6">
              <div className="mt-10 w-lg max-w-xs overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-xl hover:shadow-xl">
                <img src={im4} alt="Imagen 4 Carrusel" className="w-80 h-64 rounded-md shadow-md"/>
              </div>
            </div>
            <div className="inline-block px-6">
              <div className="mt-10 w-lg max-w-xs overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-xl hover:shadow-xl">
                <img src={im5} alt="Imagen 5 Carrusel" className="w-80 h-64 rounded-md shadow-md"/>
              </div>
            </div>
            <div className="inline-block px-6">
              <div className="mt-10 w-lg max-w-xs overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-xl hover:shadow-xl">
                <img src={im6} alt="Imagen 6 Carrusel" className="w-80 h-64 rounded-md shadow-md"/>
              </div>
            </div>
            <div className="inline-block px-6">
              <div className="mt-10 w-lg max-w-xs overflow-hidden transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 rounded-xl hover:shadow-xl">
                <img src={im7} alt="Imagen 7 Carrusel" className="w-80 h-64 rounded-md shadow-md"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .hide-scroll-bar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scroll-bar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      
      <div className="grid grid-rows-2 flex justify-center space-x-20 mt-40 mb-4">
        <h3 class="text-balance text-white font-bold text-4xl">!LOCALIZA EL CRIMEN</h3>
        <h4 class="text-balance text-white font-bold text-4xl">Y REPORTALO!</h4>

      </div>

      <div className="flex justify-center space-x-20 mt-40 mb-4">
        <img src={logo} alt="Logo" className="w-11" />
      </div>

      {/* Footer */}
      <footer className="text-center mt-4 pb-4 text-gray-500 text-sm">
        <p>© 2025 GeoCrimen. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;