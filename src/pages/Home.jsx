import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {UserGroupIcon } from "@heroicons/react/24/solid";

import im1 from '../images/im1.jpeg'
import im2 from '../images/im2.jpeg'
import im3 from '../images/im3.jpeg'
import im4 from '../images/im4.jpeg'
import im5 from '../images/im5.jpeg'
import im6 from '../images/im6.jpeg'
import im7 from '../images/im7.jpeg'
import color1 from '../images/00ffff.png';
import color2 from '../images/003fff.png';
import color3 from '../images/bf001f.png';
import logo from '../images/logo.png';

import { useState } from "react";

function Home() {

  const [activeIndex, setActiveIndex] = useState(0);
  const images = [im1, im2, im3, im4, im5, im6, im7];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  {/*const [map, setMap] = useState(null);
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

  """const initMap = () => {
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
  };*/}
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-4 bg-[#003049] shadow-lg">
        <h1 className="text-xl font-bold flex items-center text-white">
          <span className="text-2xl mr-2">
            <img src={logo} alt="Logo" className="w-11 " />
          </span> GeoCrimen
        </h1>
        <div>
          <Link to="/login" className="mr-10 font-bold text-white underline">
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-white text-[#003049] font-bold rounded-md"
          >
            Sign up
          </Link>
        </div>
      </header>


        <div className="relative mt-10 h-[500px] ml-[130px] w-[1250px] overflow-hidden flex justify-center items-center bg-black">
          {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className={`absolute h-[500px] w-full max-w-full ${
            i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            alt={`Slide ${i + 1}`}
          />
          ))}
        </div>

        <div className="absolute top-[340px] left-[40px] z-30 flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center h-[50px] w-[50px] bg-[#003049] rounded-full group"
          >
            <ChevronLeftIcon className="w-[30px] h-[30px] text-white" strokeWidth={4.5} />
          </button>
        </div>
        <div className="absolute top-[340px] right-[40px] z-30 flex items-center justify-center">
          <button
            onClick={handleNext}
            className="flex items-center justify-center h-[50px] w-[50px] bg-[#003049] rounded-full group"
          >
            <ChevronRightIcon className="w-[30px] h-[30px] text-white" strokeWidth={4.5} />
          </button>
        </div>
            
        <div className="flex flex-row items-start justify-between mt-20 h-[400px] w-full px-10">
          <div className="text-left bg-white ml-[92px] w-[800px]">
            <h3 className="font-bold text-3xl mb-2 mt-20" style={{ fontFamily: 'Arial Black, sans-serif' }}>
              <span className="text-black">Sobre</span>{' '}
              <span className="text-[#D62828]">Nosotros</span>
            </h3>
            <h4 className="text-black text-2xl text-justify mt-10" style={{ fontFamily: 'Arial, sans-serif' }}>
              Geocrimen es una plataforma que permite a los ciudadanos reportar y visualizar delitos en cualquier parte de Colombia. 
              Utilizando tecnología de mapas de calor, los usuarios podrán observar la ubicación y naturaleza de los delitos, 
              lo que ayuda a crear conciencia y fomentar la seguridad comunitaria. 
            </h4>
          </div>
          <div className="flex items-center justify-center mt-10 ml-[200px] w-[1000px] h-full">
            <UserGroupIcon className="w-[400px] h-[400px] text-[#003049]" strokeWidth={4.5} />
          </div>
        </div>
        <div className="w-full py-12 px-4 mt-[150px]" style={{ backgroundColor: "#003049" }}>
        <div class="mt-10 flex justify-center items-center gap-40 flex-wrap">
          {/*-- Tarjeta 1 -->*/}
          <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"  style={{ backgroundColor: '#FFFFFF' }}>
            <a href="#">
            <img class="rounded-t-2xl" src={color3} alt="color1" style={{border: ' 20px solid #FFFFFF',borderRadius: '1.7rem' }}></img>
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#003049]">
                  #bf001f
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 text-[#003049]">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              
            </div>
          </div>
          {/*-- Tarjeta 2 -->*/}
          <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"  style={{ backgroundColor: '#FFFFFF' }}>
            <a href="#">
            <img class="rounded-t-2xl" src={color2} alt="color1" style={{border: ' 20px solid #FFFFFF',borderRadius: '1.7rem' }}></img>
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#003049]">
                  #003fff
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 text-[#003049]">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              
            </div>
          </div>
          {/*-- Tarjeta 3 -->*/}
          <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"  style={{ backgroundColor: '#FFFFFF' }}>
            <a href="#">
            <img class="rounded-t-2xl" src={color1} alt="color1" style={{border: ' 20px solid #FFFFFF',borderRadius: '1.7rem' }}></img>
            </a>
            <div class="p-5">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-[#003049]">
                #00ffff
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 text-[#003049]">
                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
              </p>
              
            </div>
          </div>
        </div>
      
        <div className="flex justify-center space-x-20 mt-[100px] ">
          <img src={logo} alt="Logo" className="w-[50px]" />
        </div>

              {/* Footer */}
      <footer className="text-center mt-4 pb-4 text-white text-md">
        <p>© 2025 GeoCrimen. All rights reserved.</p>
      </footer>
      </div>
    </div>
  );
}

export default Home;