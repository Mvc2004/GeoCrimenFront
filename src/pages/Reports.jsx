import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";
import {PhotoIcon } from '@heroicons/react/24/solid'

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

    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white via-gay-400 to-gray-500 p-6">
      <form>
        <div class="w-[900px] mt-[150px] ml-[300px] mb-4 border-white/50 rounded-lg bg-white/70">
            <div class="px-4 py-2 bg-white/50 rounded-t-lg">
                <textarea id="comment" 
                          value={report}
                          onChange={(e) => setReport(e.target.value)}
                          rows="4" className="w-full h-60 px-0 text-sm text-black bg-white/20 backdrop-blur-lg" 
                          placeholder="Escribe tu reporte..." required ></textarea>
            </div>
            <div class="flex items-center justify-between px-3 py-2 border-t border-gray-500">
                <button type="submit" onClick={handleReport} class="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-900 hover:bg-gray-700">
                    Post comment
                </button>
                <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
                    <button type="button" class="inline-flex justify-center items-center p-2 text-gray-500 rounded-md cursor-pointer hover:bg-gray-400">
                        <PhotoIcon className="w-6 h-6 text-black"/>
                        <span class="sr-only">Upload image</span>
                    </button>
                </div>
            </div>
        </div>
      </form>
      

      {/* Botón Cancelar y Subir Imagen */}
      <div className="flex justify-between items-center px-6 pb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[#D32F2F]/90 text-black font-bold rounded-md focus:ring-4 focus:ring-red-700 dark:focus:ring-red-800 hover:bg-red-700"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Reports;
