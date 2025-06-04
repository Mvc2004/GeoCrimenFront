import { useState, useEffect } from "react"
import { UserIcon, BellIcon, MapIcon } from "@heroicons/react/24/solid"
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
  { name: "heatmap_title", path: "/heatmap" },
]

function Community() {
  const { t, i18n } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [reportList, setReportList] = useState([])
  const [delitos, setDelitos] = useState([])
  const [loading, setLoading] = useState(true)

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

  const toggleListening = () => {
    if (!recognition) return
    isListening ? recognition.stop() : recognition.start()
    setIsListening(!isListening)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Opcional: redirige a otra ruta
      // navigate(`/${searchTerm}`)
    }
  }

  const handleSaveReport = (report) => {
    if (editData) {
      setReportList(prev => prev.map((r) => (r.id === report.id ? report : r)))
    } else {
      setReportList(prev => [...prev, { ...report, id: Date.now() }])
    }
    setShowModal(false)
    setEditData(null)
  }

  useEffect(() => {
    const fetchBusqueda = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/delitos/")
        if (!response.ok) throw new Error("Error al obtener los delitos")
        const data = await response.json()
        setDelitos(data)
      } catch (error) {
        console.error("Error al obtener los delitos:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchBusqueda()
  }, [])

  const filteredDelitos = delitos.filter((delito) =>
    delito.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delito.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delito.direccion.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
                  {plan.name === "Notificaciones" && <BellIcon className="h-8 w-8 text-white" />}
                  {plan.name === "Mapa de Calor" && <MapIcon className="h-8 w-8 text-white" />}
                </div>
                <p className="text-2xl font-bold text-white">{t(plan.name)}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Panel central */}
        <div className="w-full md:w-3/5 p-4 bg-white">
          <form className="mt-5 max-w-md mx-auto">
            <div className="relative flex items-center">
              <div className="absolute flex items-center">
              </div>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md pr-3 pl-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={t("searchPlaceholder")}
              />

              {/* Microphone Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`rounded-md ml-2 p-2.5 border border-transparent text-center text-sm text-white transition-all duration-300 shadow-sm hover:shadow-lg focus:outline-none ${
                  isListening
                    ? "bg-red-600 hover:bg-red-700 active:bg-red-800 animate-pulse"
                    : "bg-[#003049] hover:bg-slate-700 active:bg-slate-800"
                }`}
                aria-label={isListening ? "Stop listening" : "Start voice search"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
                  <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
                </svg>
              </button>

              {/* Search Button */}
              <button
                type="submit"
                className="rounded-md ml-2 bg-[#003049] p-2.5 border border-transparent text-center text-sm text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-slate-700 active:bg-slate-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 14 0A7 7 0 0 1 2 9Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M12.293 12.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414l-4-4a1 1 0 0 1 0-1.414Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
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

          {/* Lista de delitos */}
          <div className="mt-6">
            {loading ? (
              <p className="text-center text-gray-500">{t("loadingCrimes")}</p>
            ) : filteredDelitos.length > 0 ? (
              <div className="space-y-4">
                {filteredDelitos.map((delito) => (
                  <div key={delito.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold">{delito.tipo}</h3>
                    <p><strong>Fecha:</strong> {delito.fecha}</p>
                    <p><strong>Dirección:</strong> {delito.direccion}</p>
                    <p><strong>Descripción:</strong> {delito.descripcion}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">{t("noCrimesFound")}</p>
            )}
          </div>

          <FormatosR
            reports={reportList}
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
