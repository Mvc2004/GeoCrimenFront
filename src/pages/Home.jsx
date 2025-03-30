import { Link } from "react-router-dom";
import mapacalor from '../images/MapadeCalor.jpeg'; 
import homicidio from '../images/homicidio.jpeg'
import hurto from '../images/hurto.jpeg'
import logo from '../images/logo.png'


function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-xl font-bold flex items-center">
          <span className="text-red-500 text-2xl mr-2">
            <img src ={logo} alt ="Logo" className="w-11"/></span> GeoCrimen
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

      {/* Mapa */}
      <div className="flex justify-center my-10">
        <img src= {mapacalor} alt="MapadeCalor" className="w-30 h-100 rounded-md shadow-lg" />
      </div>

      {/* Botones de denuncias */}
      <div className="flex justify-center space-x-20 mt-15">
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

      <div className="flex justify-center space-x-20 mt-20">
        <img src ={logo} alt ="Logo" className="w-11"/>
      </div>

      {/* Footer */}
      <footer className="text-center mt-1 text-gray-600 text-sm">
        <p>© 2025 GeoCrimen. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
