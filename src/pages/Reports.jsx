import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";

function Reports() {
  const [report, setReport] = useState("");
  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener ubicación apenas carga el componente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude);
          setLongitud(position.coords.longitude);
        },
        (error) => {
          console.error("Error al obtener ubicación:", error);
          alert("No se pudo obtener la ubicación. Asegúrate de permitir el acceso.");
        }
      );
    } else {
      alert("Geolocalización no soportada por este navegador.");
    }
  }, []);

  const handleReport = async () => {
    if (report.trim() === "") {
      alert("No puedes enviar un reporte vacío.");
      return;
    }

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      alert("Inicia sesión para hacer un reporte");
      return;
    }

    if (latitud === null || longitud === null) {
      alert("La ubicación aún no está disponible. Intenta nuevamente.");
      return;
    }

    const nuevoReporte = {
      descripcion: report,
      id_usuario: usuario.id_usuario,
      id_crimen: 1,            // o el valor que tengas por defecto
      Id_estado: 1,            // puedes cambiarlo según la lógica real
      Id_ubicacion: 1,         // este campo es obligatorio en tu query
      ubi_lat: latitud,
      ubi_lng: longitud,
      Id_barrio: 582
    };
    

    try {
      const res = await fetch("http://localhost:3000/api/reportes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoReporte)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Reporte enviado con éxito.");
        setReport("");
        navigate("/");
      } else {
        alert("Error al enviar reporte: " + (data.mensaje || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error al enviar reporte:", error);
      alert("Hubo un problema con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-200 p-6">
      <div className="flex justify-end">
        <button
          onClick={handleReport}
          className="px-4 py-2 border border-green-500 text-green-700 rounded-md hover:bg-green-100"
        >
          Report
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <textarea
          className="w-3/4 h-40 p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none resize-none"
          placeholder="Reporta el delito!"
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
      </div>

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
