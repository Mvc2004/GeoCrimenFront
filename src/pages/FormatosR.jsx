import { useLocation } from "react-router-dom";

function FormatosR() {
  const { state } = useLocation();
  const { delito, fecha, hora, ubicacion } = state || {};

  const informacion = [{ delito, fecha, hora, ubicacion }];

  return (
    <div className="min-w-sm border-2 border-black rounded-lg shadow-lg p-6 bg-white">
      {informacion.map((info, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-lg font-bold">{info.delito}</h2>
          <p className="text-gray-600">Fecha: {info.fecha}</p>
          <p className="text-gray-600">Hora: {info.hora}</p>
          <p className="text-gray-600">Ubicación: {info.ubicacion}</p>
        </div>
      ))}
    </div>
  );
}

export default FormatosR;
