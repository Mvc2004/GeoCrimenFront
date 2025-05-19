import { useState, useEffect, useRef } from "react"
import { UserIcon, BellIcon, MapIcon, PhotoIcon, XMarkIcon,MagnifyingGlassIcon, VideoCameraIcon } from "@heroicons/react/24/solid"
import imagen1 from "../images/logo/logo.png"
import { useNavigate } from "react-router-dom"
import FormatosR from "./FormatosR"

const plans = [
  { name: "Perfil", path: "/profile" },
  { name: "Notificaciones", path: "/notificaciones" },
  { name: "Mapa de Calor", path: "/heatmap" },
]

function Community() {


  const [searchTerm, setSearchTerm] = useState("")
  const [reportData, setReportData] = useState({
    crimeType: "",
    date: "",
    location: "",
    description: "",
  })
  
  const [image, setImage] = useState(null)
  const [mediaFiles, setMediaFiles] = useState([])
  const fileInputRef = useRef(null)



  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  const [reportList, setReportList] = useState([])

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}


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

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setReportData((prev) => ({
      ...prev,
      
      [id]: value,

      
    }))
  }

const handleReport = async () => {
  // Validación primero
  if (
    !reportData.crimeType ||
    !reportData.date ||
    !reportData.location ||
    !reportData.description
  ) {
    alert("Por favor completa todos los campos requeridos.")
    return
  }

  // Convertir los archivos a base64
  const base64MediaFiles = await Promise.all(
    mediaFiles.map(async (media) => ({
      base64: await fileToBase64(media.file),
      type: media.type,
    }))
  )

  const storedReports = localStorage.getItem("communityReports")
  const report = storedReports ? JSON.parse(storedReports) : []

  const newReport = {
    ...reportData,
    media: base64MediaFiles,
    timestamp: new Date().toISOString(),
  }

  report.unshift(newReport)
  localStorage.setItem("communityReports", JSON.stringify(report))

  alert("Reporte anónimo enviado con éxito.")

  // Reset
  setReportData({
    crimeType: "",
    date: "",
    location: "",
    description: "",
  })
  setMediaFiles([])
  setShowModal(false)
}

  useEffect(() => {
    return () => {
      mediaFiles.forEach((media) => URL.revokeObjectURL(media.preview))
    }
  }, [mediaFiles])
  
  const handleMediaChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return

    const newFiles = []

    Array.from(e.target.files).forEach((file) => {
      const fileType = file.type.startsWith("image/") ? "image" : "video"
      newFiles.push({
        file,
        preview: URL.createObjectURL(file),
        type: fileType,
      })
    })

    setMediaFiles((prev) => [...prev, ...newFiles])
  }

  const removeMedia = (index) => {
    setMediaFiles((prev) => {
      const newFiles = [...prev]
      URL.revokeObjectURL(newFiles[index].preview)
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const handleCancel = () => {
    setShowModal(false)
    setReportData({
      crimeType: "",
      date: "",
      location: "",
      description: "",
    })
    setImage(null)
    setImagePreview(null)
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

          <FormatosR />

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
                onClick={() => setShowModal(true)}
              >
                Reportar Delito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para reportar delito */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
          role="dialog"
          aria-modal="true"
        >
          <form className="relative w-[700px] mb-4 border-white/50 rounded-lg bg-white/90">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-[10px] hover:bg-gray-300 rounded-md text-sm w-8 h-8 flex justify-center items-center"
            >
              <XMarkIcon className="w-7 h-7 text-black" />
            </button>

            <div className="px-4 py-4">
              <h2 className="text-xl font-bold mb-4 text-center">Reporte Anónimo de Delitos</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="crimeType" className="block text-sm font-medium mb-1">
                    Tipo de Crimen
                  </label>
                  <select
                    id="crimeType"
                    value={reportData.crimeType}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white/80"
                    required
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="hurto">Hurto</option>
                    <option value="homicidio">Homicidio</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium mb-1">
                    Fecha del Incidente
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={reportData.date}
                    onChange={handleInputChange}
                    className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white/80"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Ubicación
                </label>
                <input
                  id="location"
                  type="text"
                  value={reportData.location}
                  onChange={handleInputChange}
                  placeholder="Dirección donde ocurrió el incidente"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white/80"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Descripción
                </label>
                <textarea
                  id="description"
                  value={reportData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white/80"
                  placeholder="Describe lo que ocurrió con el mayor detalle posible"
                  required
                ></textarea>
              </div>

              {mediaFiles.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Evidencia adjunta</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mediaFiles.map((media, index) => (
                  <div key={index} className="relative group">
                    {media.type === "image" ? (
                      <img
                        src={media.preview || "/placeholder.svg"}
                        alt={`Evidencia ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="h-24 w-full relative bg-gray-200 rounded-md flex items-center justify-center">
                        <VideoCameraIcon className="w-8 h-8 text-gray-500" />
                        <video
                          src={media.preview}
                          className="absolute inset-0 w-full h-full object-cover rounded-md opacity-0 group-hover:opacity-100"
                          controls
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
            </div>

            <div className="flex items-center justify-between px-3 py-2 border-t border-gray-500">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-white bg-[#D32F2F] rounded-lg hover:bg-[#B71C1C] focus:ring-4 focus:ring-red-300"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleReport}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-white bg-[#003049] rounded-lg focus:ring-4 focus:ring-gray-700 hover:bg-gray-700"
                >
                  Enviar reporte anónimo
                </button>
              </div>
              <div className="flex space-x-1">
                <input
                  type="file"
                  id="media-upload"
                  ref={fileInputRef}
                  accept="image/*,video/*"
                  onChange={handleMediaChange}
                  multiple
                  className="hidden"
                />
                <label
                  htmlFor="media-upload"
                  className="inline-flex justify-center items-center p-2 text-gray-500 rounded-md hover:bg-gray-300"
                >
                  <div className="flex items-center">
                    <PhotoIcon className="w-6 h-6 text-black" />
                    <VideoCameraIcon className="w-6 h-6 text-black ml-1" />
                  </div>
                  <span className="sr-only">Subir evidencia</span>
                </label>
              </div>
            </div>

            <div className="px-3 py-2 bg-white/40 rounded-b-lg">
              <p className="text-xs text-gray-600">
                <strong>Reporte 100% anónimo:</strong> No recopilamos ninguna información personal ni datos que puedan
                identificarte.
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Community
