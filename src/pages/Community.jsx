import { useState, useEffect, useRef } from "react"
import { UserIcon, BellIcon, MapIcon, PhotoIcon, XMarkIcon,MagnifyingGlassIcon, VideoCameraIcon } from "@heroicons/react/24/solid"
import imagen1 from "../images/logo/logo.png"
import { useNavigate } from "react-router-dom"
import FormatosR from "./FormatosR"
import ReporteModal from "./VentanaReporte"

const plans = [
  { name: "Perfil", path: "/profile" },
  { name: "Notificaciones", path: "/notificaciones" },
  { name: "Mapa de Calor", path: "/heatmap" },
]

function Community() {


  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState(null)
  const [reportList, setReportList] = useState([]) // Lista de reportes enviados


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
        console.error("no se reconoce el dialogo", event.error)
        setIsListening(false)
      }

      recognitionInstance.onend = () => {
        setIsListening(false)
      }

      setRecognition(recognitionInstance)
    }
  }, [])


  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/${searchTerm}`)
    }
  }

const handleSaveReport = (report) => {
  if (editData) {
    // Editando un reporte existente
    setReportList(prev =>
      prev.map((r) => (r.id === report.id ? report : r))
    )
  } else {
    // Creando un nuevo reporte
    setReportList(prev => [...prev, { ...report, id: Date.now() }])
  }

  setShowModal(false)
  setEditData(null)
}


  const toggleListening = () => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
    }
  }
  return (
    <div className="min-64-screen ">
      {/* Contenedor principal con flex-row para organizar las particiones horizontalmente */}
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Particion 1 (izquierda) */}
        <div className="flex flex-col w-full md:w-1/5 p-8 bg-[#003049]">
          {/* Logo centrado */}
          <div className="flex justify-center mb-12">
            <img src={imagen1 || "/placeholder.svg"} alt="Logo" className="w-[100px]" />
          </div>

          {/* Menú alineado a la izquierda */}
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
                <div>
                  <p className="text-2xl font-bold text-white">{plan.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* Particion 2 (centro) */}
        <div className="w-full md:w-3/5 p-0 bg-white">
          <form onSubmit={handleSearch} className="mt-5 max-w-md mx-auto">
            <div className="relative flex items-center">
              <div className="absolute flex items-center">
                <MagnifyingGlassIcon className="size-5 text-[#003049] ml-2.5" strokeWidth={1.5} />
                <div className="h-6 border-l border-[#003049]/50 ml-2.5"></div>
              </div>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md pr-3 pl-14 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Buscar"
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
                <div className="text-sm font-medium text-red-600">Escuchando...</div>
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
            onEdit={(report) => {
              setEditData(report)
              setShowModal(true)
            }}
          />

        </div>

        {/* Particion 3 (derecha) */}
        <div className="grid justify-items-center w-full md:w-1/5 p-8 bg-[#003049]">
          {/* Contenido para la partición derecha */}
          <div className="grid justify-items-center gap-10">
            <div className="w-full text-center">
              <p className="text-white text-3xl font-bold">Reporta Fácilmente</p>
              <p className="mt-2 text-white text-sm">!Solo presiona el botón!</p>
            </div>
            <div className="flex justify-center w-full mb-[50px]">
              <button
                type="button"
                className="w-[200px] h-[90px] text-[#D62828] border-2 border-[#003049]/50 bg-white text-2xl font-bold py-3 rounded rounded-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                onClick={() => {
                setEditData(null)
                setShowModal(true)
              }}
              >
                Reportar Delito
              </button>
            </div>
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
    </div>
  )
}

export default Community
