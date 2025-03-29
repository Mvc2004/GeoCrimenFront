import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-20 bg-gray-200 flex flex-col items-center p-4">
        <div className="mb-4">
          <img src="/logo.png" alt="GeoCrimen" className="w-10 h-10" />
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/profile" className="text-gray-800">Perfil</Link>
          <Link to="/map" className="text-gray-800">Mapa</Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-4 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Buscar..."
            className="border px-2 py-1 rounded w-1/2"
          />
          <button className="p-2 bg-gray-300 rounded-full">
            🎤
          </button>
        </div>

        {/* Lista de reportes */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded shadow">
            <p><strong>Atención, comunidad!</strong></p>
            <p>Se reporta un caso de homicidio en el barrio Aguablanca...</p>
            <div className="flex justify-end space-x-2 mt-2">
              <button className="text-red-500">✖</button>
              <button className="text-green-500">✔</button>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p><strong>Atención, comunidad!</strong></p>
            <p>Comunidad denuncia caso de homicidio hace pocos minutos...</p>
            <img src="/ejemplo1.png" alt="Reporte" className="w-full mt-2" />
            <div className="flex justify-end space-x-2 mt-2">
              <button className="text-red-500">✖</button>
              <button className="text-green-500">✔</button>
            </div>
          </div>
        </div>
      </main>

      {/* Sidebar derecho */}
      <aside className="w-20 bg-gray-200 flex flex-col items-center p-4">
        <Link to="/homicides" className="text-red-500 mb-4">Homicidios</Link>
        <Link to="/thefts" className="text-yellow-500">Hurtos</Link>
      </aside>
    </div>
  );
}

export default Dashboard;
