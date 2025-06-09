import React, { useEffect, useState } from "react";
import imagen1 from "../images/logo/logo.png";


function InformeCrimenes() {
  const [reportes, setReportes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/reportes/reportesAprobados")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los reportes");
        return res.json();
      })
      .then((data) => {
        setReportes(data.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("No se pudieron cargar los reportes");
        setCargando(false);
      });
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="flex items-center mb-6">
        <img src={imagen1} alt="GeoCrimen Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-3xl font-bold text-[#003049]">Informe de Crímenes</h1>
        </div>


      {cargando && <p className="text-gray-700">Cargando datos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!cargando && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-[#003049] text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Crimen</th>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Ubicación</th>
                <th className="px-4 py-2">Descripción</th>
                <th className="px-4 py-2">Lat</th>
                <th className="px-4 py-2">Lng</th>
              </tr>
            </thead>
            <tbody>
              {reportes.map((reporte) => (
                <tr key={reporte.id_reporte} className="text-center border-b">
                  <td className="px-4 py-2">{reporte.id_reporte}</td>
                  <td className="px-4 py-2">
                    {reporte.id_crimen === 1 ? "Hurto" : reporte.id_crimen === 2 ? "Homicidio" : "Otro"}
                  </td>
                  <td className="px-4 py-2">{new Date(reporte.fecha_reporte).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{reporte.ubicacion_reporte}</td>
                  <td className="px-4 py-2">{reporte.descripcion}</td>
                  <td className="px-4 py-2">{reporte.ubi_lat}</td>
                  <td className="px-4 py-2">{reporte.ubi_lng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InformeCrimenes;
