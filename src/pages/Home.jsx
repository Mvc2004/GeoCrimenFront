import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-xl font-bold flex items-center">
          <span className="text-red-500 text-2xl mr-2">📍</span> GeoCrimen
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
      <div className="flex justify-center my-6">
        <img src="/mapa de calorr.png" alt="Mapa de calor" className="w-4/5 rounded-md shadow-lg" />
      </div>

      {/* Botones de denuncias */}
      <div className="flex justify-center space-x-10 mt-6">
        <Link to="/reports">
          <div className="text-center cursor-pointer">
            <img src="/homicidio.png" alt="Denuncia Homicidios" className="w-40 h-40 rounded-md shadow-md" />
            <p className="mt-2 font-semibold">Denuncia Homicidios</p>
          </div>
        </Link>

        <Link to="/reports">
          <div className="text-center cursor-pointer">
            <img src="/robo.png" alt="Denuncia Hurtos" className="w-40 h-40 rounded-md shadow-md" />
            <p className="mt-2 font-semibold">Denuncia Hurtos</p>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <footer className="text-center mt-10 text-gray-600 text-sm">
        <p>© 2025 GeoCrimen. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
