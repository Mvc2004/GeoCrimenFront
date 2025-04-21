import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import homicidio from '../images/homicidio.jpeg';
import hurto from '../images/hurto.jpeg';
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
      radius: 30,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-700 via-gray-900 to-black">
      <header className="flex justify-between items-center p-4 bg-gray-400">
        <h1 className="text-xl font-bold flex items-center">
          <span className="text-red-500 text-2xl mr-2">
            <img src={logo} alt="Logo" className="w-11" />
          </span> GeoCrimen
        </h1>
        <div>
          <Link to="/login" className="mr-4 text-gray-700 hover:underline">
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Sign up
          </Link>
        </div>
      </header>

      {/* Mapa interactivo */}
      <div className="flex justify-center my-10">
        <div 
          id="map" 
          className="w-4/5 h-96 rounded-md shadow-lg" 
          style={{ height: "500px" }}
        />
      </div>

      {/* Controles del mapa */}
      <div className="flex justify-center space-x-4 mb-8">
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={() => heatmap && heatmap.setMap(heatmap.getMap() ? null : map)}
        >
          Mostrar/Ocultar Mapa de Calor
        </button>
      </div>

      {/* Botones de denuncias */}
      <div className="flex justify-center space-x-20 mt-8">
        <Link to="/reports">
          <div className="text-center cursor-pointer">
            <img src={homicidio} alt="Denuncia Homicidios" className="w-45 h-40 rounded-md shadow-md" />
            <p className="mt-2 font-semibold">Denuncia Homicidios</p>
          </div>
        </Link>

        <Link to="/reports">
          <div className="text-center cursor-pointer">
            <img src={hurto} alt="Denuncia Hurtos" className="w-45 h-40 rounded-md shadow-md" />
            <p className="mt-2 font-semibold">Denuncia Hurtos</p>
          </div>
        </Link>
      </div>

      <div className="flex justify-center space-x-20 mt-10 mb-4">
        <img src={logo} alt="Logo" className="w-11" />
      </div>

      {/* Footer */}
      <footer className="text-center mt-4 pb-4 text-gray-600 text-sm">
        <p>© 2025 GeoCrimen. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;