import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";

function Reports() {
  const [report, setReport] = useState("");
  const navigate = useNavigate();

  const handleReport = () => {
    if (report.trim()) {
      alert("Reporte enviado con éxito.");
      setReport("");
    } else {
      alert("No puedes enviar un reporte vacío.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-200 p-6">
      {/* Botón Report en la esquina superior derecha */}
      <div className="flex justify-end">
        <button
          onClick={handleReport}
          className="px-4 py-2 border border-green-500 text-green-700 rounded-md hover:bg-green-100"
        >
          Report
        </button>
      </div>

      {/* Área de Reporte */}
      <div className="flex flex-1 items-center justify-center">
        <textarea
          className="w-3/4 h-40 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none resize-none"
          placeholder="Reporta el delito!"
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
      </div>

      {/* Botón Cancelar y Subir Imagen */}
      <div className="flex justify-between items-center px-6 pb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 border border-black text-black rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>

        <button className="p-3 bg-white rounded-full shadow-lg">
          <FaRegImage className="text-2xl text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default Reports;