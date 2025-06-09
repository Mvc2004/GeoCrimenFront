import { useState, useEffect, useRef } from "react"
import { UserIcon, BellIcon, MapIcon, PhotoIcon, ArrowPathIcon, XMarkIcon,MagnifyingGlassIcon, VideoCameraIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid"
import imagen1 from "../images/logo/logo.png"
import { Link, useNavigate } from "react-router-dom"
import FormatosR from "./FormatosR"
import ReporteModal from "./VentanaReporte"
import { useTranslation } from 'react-i18next';
import { AccessibilityProvider } from './AccessibilityContext';
import AccesibilidadButton from './AccesibilidadButton';

const plans = [
  { name: "profile", path: "/profile" },
  { name: "notifications", path: "/notificaciones" },
  { name: "crimeR", path: "/informe" }
]


function Community() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [reportList, setReportList] = useState([]) 
  const [selectedDate, setSelectedDate] = useState("")
  const [originalReportList, setOriginalReportList] = useState([]);


  const navigate = useNavigate()
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = "es-ES"

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchTerm(transcript)
        setIsListening(false)
      }

      recognitionInstance.onerror = (event) => {
        console.error("Error de reconocimiento:", event.error)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])
 
  useEffect(() => {
    const id_usuario = localStorage.getItem("id_usuario");
    if (!id_usuario) {
      navigate("/login", { replace: true }); // 🔒 reemplaza el historial
    }
  }, [navigate]);
  
  useEffect(() => {
    const cargarReportes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/reportes/reportesPendientes");
        const data = await response.json();
  
        if (!response.ok) throw new Error("Error al obtener reportes");
  
        const reportes = data.data || [];
  
        // Obtener archivos para cada reporte
        const reportesConMedia = await Promise.all(
          reportes.map(async (reporte) => {
            try {
              const resArchivos = await fetch(`http://localhost:3000/api/reportes/obtenerArchivoPorReporte/${reporte.id_reporte}`);
              const dataArchivos = await resArchivos.json();
              const mediaTransformada = (dataArchivos.data || []).map((archivo) => ({
                url: archivo.url_archivo,
                tipoArchivoId: parseInt(archivo.tipo_archivo),
                type: parseInt(archivo.tipo_archivo) === 1 ? "image" : "video"
              }));
              return { ...reporte, media: mediaTransformada };
            } catch (e) {
              console.error("Error al obtener archivos de reporte", reporte.id_reporte, e);
              return { ...reporte, media: [] };
            }
          })
        );
  
        setReportList(reportesConMedia);
        setOriginalReportList(reportesConMedia)
      } catch (err) {
        console.error("Error al cargar reportes desde el backend:", err);
      }
    };
  
    cargarReportes();
  }, []);
  

  const handleSearch = async (e) => {
    e.preventDefault();
  
    if (!selectedDate) {
      alert("Selecciona una fecha");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/reportes/obtenerReportesPorFecha?fecha_reporte=${selectedDate}`
      );
  
      if (!response.ok) {
        throw new Error("Error al obtener reportes por fecha");
      }
  
      const data = await response.json();
      setReportList(data.data || []);
    } catch (error) {
      console.error("Error al buscar reportes:", error);
      alert("No se pudo obtener los reportes");
    }
  };
  
  // Justo encima o debajo de handleSaveReport
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "public_upload"); // Usa el que tengas configurado (ej. public_upload)
    formData.append("cloud_name", "dxa28laqj");

    const response = await fetch("https://api.cloudinary.com/v1_1/dxa28laqj/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al subir archivo a Cloudinary");

    const data = await response.json();
    return data.secure_url;
  };

  const handleSaveReport = async (report) => {
    const id_usuario = localStorage.getItem("id_usuario");
    const id_crimen = (crimeType) => {
      switch(crimeType){
        case 'hurto':
          return 1;
        case 'homicidio':
          return 2;
      }
    }
    const reporteUsuario = {
      //...report,
      id_usuario,
      id_crimen: id_crimen(report.crimeType),
      ubicacion_reporte: report.location,
      fecha_reporte: report.date,
      ubi_lat: report.latitude,
      ubi_lng: report.longitude,
      descripcion: report.descripcion,

    }
    try {
      const response = await fetch("http://localhost:3000/api/reportes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reporteUsuario),
      });
      console.log("Enviando reporte:", reporteUsuario);
      if (!response.ok) throw new Error("Error al enviar el reporte");

      const data = await response.json();
      const idReporte = data.id_reporte_insertado;
      console.log("Reporte creado:", data);
      const mediaConUrl = [];
      for (const archivo of report.media) {

        const cloudinaryUrl = await uploadToCloudinary(archivo.file);
        console.log("Archivo subido a Cloudinary:", cloudinaryUrl);

        await fetch("http://localhost:3000/api/reportes/archivoPorReporte", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_reporte: idReporte,
            url_archivo: cloudinaryUrl,
            tipo_archivo: archivo.tipoArchivoId,
          }),
        });
        mediaConUrl.push({
          url: cloudinaryUrl,
          tipoArchivoId: archivo.tipoArchivoId,
          type: archivo.tipoArchivoId 
        });
      }
      console.log("Archivos enviados correctamente");
      console.log(mediaConUrl);

      setReportList((prev) => [...prev, { ...report, id_reporte: data.id_reporte_insertado, media: mediaConUrl }]);
      setShowModal(false);
      setEditData(null);
      
    } catch (error) {
      console.error("Error al guardar el reporte:", error);
      alert("No se pudo enviar el reporte");
    }
  };


  const toggleListening = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)

    } else {
      setReportList(prev => [...prev, { ...report, id: Date.now() }])
    }
    setShowModal(false)
    setEditData(null)
  }

 

  

  return (

    <AccessibilityProvider>
      <AccesibilidadButton/>

    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Panel izquierdo */}
        <div className="flex flex-col w-full md:w-1/5 p-8 bg-[#003049]">
          <div className="flex justify-center mb-12">
            <Link to="/">
              <img src={imagen1 || "/placeholder.svg"} alt="Logo" className="w-[100px]" />
            </Link>
          </div>
          <div className="mt-8 space-y-6 pl-2">
            {plans.map((plan) => (
              <button
                key={plan.name}
                onClick={() => navigate(plan.path)}
                className="group flex items-center w-full rounded-lg py-5 px-2 text-left transition hover:bg-white/30"
              >
                <div className="flex-shrink-0 mr-4">
                  {plan.name === "Perfil" && <UserIcon className="h-8 w-8 text-white" />}
                  {plan.name === "Mapa de Calor" && <MapIcon className="h-8 w-8 text-white" />}
                  {plan.name === "Informe de Crímenes" && <ClipboardDocumentListIcon className="h-8 w-8 text-white" />}

                </div>
                <p className="text-2xl font-bold text-white">{t(plan.name)}</p>
              </button>
            ))}
            <div className="mt-12 pl-2">
              <button
                onClick={() => {
                  localStorage.removeItem("id_usuario");
                  navigate("/login", { replace: true });
                }}
                className="flex items-center w-full bg-[#D62828] hover:bg-[#c21f1f] transition rounded-md py-3 px-4 text-white"
              >
                <XMarkIcon className="h-5 w-5 text-white mr-2" strokeWidth={2} />
                <span className="text-sm font-semibold">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Particion 2 (centro) */}
        <div className="w-full md:w-3/5 p-0 bg-white">
          <form onSubmit={handleSearch} className="mt-5 max-w-md mx-auto">
          <div className="relative flex flex-col">
              <label
                htmlFor="buscarFecha"
                className="text-sm font-medium text-slate-600 mb-1 ml-1"
              >
                <b>Buscar reportes por fecha</b>
              </label>

              <div className="flex items-center">
                <div className="absolute left-3">
                  <MagnifyingGlassIcon className="size-5 text-[#003049]" strokeWidth={1.5} />
                </div>

                <input
                  id="buscarFecha"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm text-slate-700 border border-slate-400 rounded-md transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                />
                {/* Search Button */}
                <button
                  type="submit"
                  className="ml-2 p-2.5 rounded-md bg-[#003049] text-white text-sm transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-slate-700 active:bg-slate-800 focus:outline-none"
                >
                  🔍
                </button>
                <button
                type="button"
                onClick={() => {
                  setSelectedDate("");
                  setReportList(originalReportList);
                }}
                className="ml-2 p-2.5 rounded-md bg-[#003049] text-white text-sm transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-slate-700 active:bg-slate-800 focus:outline-none"
                title="Limpiar filtros"
              >
                <ArrowPathIcon className="w-4 h-4" />
              </button>             
              </div>
            </div>
            {/* Listening Indicator */}
            {isListening && (
              <div className="flex items-center justify-center mt-3 space-x-2">
                <div className="text-sm font-medium text-red-600">{t("listening")}</div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
          </form>


          <FormatosR
            reports={reportList}
            setReports={setReportList}
            onEdit={(report) => {
              setEditData(report)
              setShowModal(true)
            }}
          />
        </div>

        {/* Panel derecho */}
        <div className="grid justify-items-center w-full md:w-1/5 p-8 bg-[#003049]">
          <div className="text-center text-white mb-8">
            <p className="text-3xl font-bold">{t("reportEasily")}</p>
            <p className="text-sm mt-2">{t("reportButton")}</p>
          </div>
          <button
            className="w-[200px] h-[90px] text-[#D62828] border-2 border-[#003049]/50 bg-white text-2xl font-bold py-3 rounded-2xl hover:scale-110 transition"
            onClick={() => {
              setEditData(null)
              setShowModal(true)
            }}
          >
            {t("reportCrime")}
          </button>
          {showModal && (
            <ReporteModal
              initialData={editData}
              onClose={() => {
                setShowModal(false)
                setEditData(null)
              }}
              onSubmit={handleSaveReport}
            />
          )}
        </div>
      </div>
    </div>
    </AccessibilityProvider>
  )
}

export default Community
