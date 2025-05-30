"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { UserIcon, BellIcon, MapIcon, Cog8ToothIcon } from "@heroicons/react/24/solid"
import imagen1 from "../images/logo/logo.png"
import { Link, useNavigate } from "react-router-dom"
import FormatosR from "./FormatosR"
import ReporteModal from "./VentanaReporte"

// Internationalization context and translations
const translations = {
  es: {
    profile: "Perfil",
    notifications: "Notificaciones",
    heatMap: "Mapa de Calor",
    settings: "Configuración",
    searchPlaceholder: "Busca el nombre de un delito o lugar",
    listening: "Escuchando...",
    reportEasily: "Reporta Fácilmente",
    reportButton: "¡Solo presiona el botón!",
    reportCrime: "Reportar Delito",
    loadingCrimes: "Cargando delitos...",
    noCrimesFound: "No se encontraron delitos.",
    date: "Fecha",
    address: "Dirección",
    description: "Descripción",
    language: "Idioma",
    fontSize: "Tamaño de fuente",
    highContrast: "Alto contraste",
    reduceMotion: "Reducir movimiento",
    voiceSearch: "Búsqueda por voz",
    search: "Buscar",
    stopListening: "Detener escucha",
    startVoiceSearch: "Iniciar búsqueda por voz",
    accessibilitySettings: "Configuración de accesibilidad",
    closeSettings: "Cerrar configuración",
    results: "Resultados",
    skipToContent: "Saltar al contenido principal",
    mainNavigation: "Navegación principal",
    quickActions: "Acciones rápidas",
    searchResults: "Resultados de búsqueda de delitos",
    crimeSearchAndReports: "Búsqueda de delitos y reportes",
    myReports: "Mis Reportes",
    editReport: "Editar reporte",
    crimeType: "Tipo de Delito",
    selectType: "Seleccionar tipo",
    robbery: "Robo",
    assault: "Asalto",
    vandalism: "Vandalismo",
    fraud: "Fraude",
    other: "Otro",
    enterAddress: "Ingrese la dirección",
    describeIncident: "Describa los detalles del incidente",
    cancel: "Cancelar",
    update: "Actualizar",
    report: "Reportar",
    reportCreated: "Reporte creado exitosamente",
    reportUpdated: "Reporte actualizado exitosamente",
    closeModal: "Cerrar modal",
    editReportTitle: "Editar Reporte",
    required: "Requerido",
  },
  en: {
    profile: "Profile",
    notifications: "Notifications",
    heatMap: "Heat Map",
    settings: "Settings",
    searchPlaceholder: "Search for a crime name or location",
    listening: "Listening...",
    reportEasily: "Report Easily",
    reportButton: "Just press the button!",
    reportCrime: "Report Crime",
    loadingCrimes: "Loading crimes...",
    noCrimesFound: "No crimes found.",
    date: "Date",
    address: "Address",
    description: "Description",
    language: "Language",
    fontSize: "Font size",
    highContrast: "High contrast",
    reduceMotion: "Reduce motion",
    screenReader: "Screen reader",
    voiceSearch: "Voice search",
    search: "Search",
    stopListening: "Stop listening",
    startVoiceSearch: "Start voice search",
    accessibilitySettings: "Accessibility settings",
    closeSettings: "Close settings",
    results: "Results",
    skipToContent: "Skip to main content",
    mainNavigation: "Main navigation",
    quickActions: "Quick actions",
    searchResults: "Crime search results",
    crimeSearchAndReports: "Crime search and reports",
    myReports: "My Reports",
    editReport: "Edit report",
    crimeType: "Crime Type",
    selectType: "Select type",
    robbery: "Robbery",
    assault: "Assault",
    vandalism: "Vandalism",
    fraud: "Fraud",
    other: "Other",
    enterAddress: "Enter address",
    describeIncident: "Describe incident details",
    cancel: "Cancel",
    update: "Update",
    report: "Report",
    reportCreated: "Report created successfully",
    reportUpdated: "Report updated successfully",
    closeModal: "Close modal",
    editReportTitle: "Edit Report",
    required: "Required",
  },
}

// Accessibility Context
const AccessibilityContext = createContext(null)

const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider")
  }
  return context
}

// Accessibility Provider Component
function AccessibilityProvider({ children }) {
  const [settings, setSettings] = useState({
    fontSize: 16,
    highContrast: false,
    reduceMotion: false,
    screenReaderEnabled: false,
    language: "es",
  })

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))

    // Apply settings to document
    document.documentElement.style.fontSize = `${newSettings.fontSize || settings.fontSize}px`
    document.documentElement.classList.toggle(
      "high-contrast",
      newSettings.highContrast !== undefined ? newSettings.highContrast : settings.highContrast,
    )
    document.documentElement.classList.toggle(
      "reduce-motion",
      newSettings.reduceMotion !== undefined ? newSettings.reduceMotion : settings.reduceMotion,
    )
  }

  const t = (key) => {
    return translations[settings.language][key] || key
  }

  // Apply accessibility settings to document
  useEffect(() => {
    document.documentElement.style.fontSize = `${settings.fontSize}px`
    document.documentElement.classList.toggle("high-contrast", settings.highContrast)
    document.documentElement.classList.toggle("reduce-motion", settings.reduceMotion)
  }, [settings])

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, t }}>{children}</AccessibilityContext.Provider>
  )
}

// Slider Component
function Slider({ value, onChange, min, max, step, className, id, ariaLabel }) {
  return (
    <input
      type="range"
      id={id}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number.parseInt(e.target.value))}
      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ${className}`}
      aria-label={ariaLabel}
    />
  )
}

// Switch Component
function Switch({ checked, onChange, id, ariaLabel }) {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  )
}

// Settings Panel Component
function SettingsPanel({ isOpen, onClose }) {
  const { settings, updateSettings, t } = useAccessibility()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="settings-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 id="settings-title" className="text-xl font-bold text-gray-900">
            {t("accessibilitySettings")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            aria-label={t("closeSettings")}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Language Selection */}
          <div className="space-y-2">
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">
              {t("language")}
            </label>
            <select
              id="language-select"
              value={settings.language}
              onChange={(e) => updateSettings({ language: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">
              {t("fontSize")}: {settings.fontSize}px
            </label>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={settings.fontSize}
              onChange={(value) => updateSettings({ fontSize: value })}
              ariaLabel={t("fontSize")}
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <label htmlFor="high-contrast" className="text-sm font-medium text-gray-700">
              {t("highContrast")}
            </label>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onChange={(checked) => updateSettings({ highContrast: checked })}
              ariaLabel={t("highContrast")}
            />
          </div>

          {/* Reduce Motion */}
          <div className="flex items-center justify-between">
            <label htmlFor="reduce-motion" className="text-sm font-medium text-gray-700">
              {t("reduceMotion")}
            </label>
            <Switch
              id="reduce-motion"
              checked={settings.reduceMotion}
              onChange={(checked) => updateSettings({ reduceMotion: checked })}
              ariaLabel={t("reduceMotion")}
            />
          </div>

          {/* Screen Reader */}
          <div className="flex items-center justify-between">
            <label htmlFor="screen-reader" className="text-sm font-medium text-gray-700">
              {t("screenReader")}
            </label>
            <Switch
              id="screen-reader"
              checked={settings.screenReaderEnabled}
              onChange={(checked) => updateSettings({ screenReaderEnabled: checked })}
              ariaLabel={t("screenReader")}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Microphone Icon Component
function MicrophoneIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
      <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
    </svg>
  )
}

// Magnifying Glass Icon Component
function MagnifyingGlassIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
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
  )
}

function Community() {
  const { settings, t } = useAccessibility()
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [editData, setEditData] = useState(null)
  const [reportList, setReportList] = useState([])
  const [delitos, setDelitos] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  const plans = [
    { name: t("profile"), path: "/profile", icon: UserIcon },
    { name: t("notifications"), path: "/notificaciones", icon: BellIcon },
    { name: t("heatMap"), path: "/heatmap", icon: MapIcon },
    { name: t("settings"), path: "#", icon: Cog8ToothIcon, onClick: () => setShowSettings(true) },
  ]

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = settings.language === "es" ? "es-ES" : "en-US"

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchTerm(transcript)
        setIsListening(false)

        // Announce result for screen readers
        if (settings.screenReaderEnabled) {
          const announcement = `${t("voiceSearch")}: ${transcript}`
          const utterance = new SpeechSynthesisUtterance(announcement)
          utterance.lang = settings.language === "es" ? "es-ES" : "en-US"
          speechSynthesis.speak(utterance)
        }
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
  }, [settings.language, settings.screenReaderEnabled, t])

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
      setReportList((prev) => prev.map((r) => (r.id === report.id ? report : r)))
    } else {
      setReportList((prev) => [...prev, { ...report, id: Date.now() }])
    }
    setShowModal(false)
    setEditData(null)

    // Announce success for screen readers
    if (settings.screenReaderEnabled) {
      const message = editData ? t("reportUpdated") : t("reportCreated")
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.lang = settings.language === "es" ? "es-ES" : "en-US"
      speechSynthesis.speak(utterance)
    }
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

  const filteredDelitos = delitos.filter(
    (delito) =>
      delito.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delito.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delito.direccion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const themeClasses = settings.highContrast ? "bg-black text-white border-white" : "bg-[#003049] text-white"
  const motionClasses = settings.reduceMotion ? "" : "transition-all duration-300 hover:scale-105"

  return (
    <div className={`min-h-screen ${settings.highContrast ? "high-contrast" : ""}`}>
      {/* Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        {t("skipToContent")}
      </a>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Panel izquierdo */}
        <div
          className={`flex flex-col w-full md:w-1/5 p-8 ${themeClasses}`}
          role="navigation"
          aria-label={t("mainNavigation")}
        >
          <div className="flex justify-center mb-12">
            <Link to="/">
              <img src={imagen1 || "/placeholder.svg"} alt="Logo" className="w-[100px]" />
            </Link>
          </div>
          <div className="mt-8 space-y-6 pl-2">
            {plans.map((plan) => {
              const IconComponent = plan.icon
              return (
                <button
                  key={plan.name}
                  onClick={plan.onClick || (() => navigate(plan.path))}
                  className="group flex items-center w-full rounded-lg py-5 px-2 text-left transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={plan.name}
                >
                  <div className="flex-shrink-0 mr-4">
                    <IconComponent className="h-8 w-8 text-white" aria-hidden="true" />
                  </div>
                  <p className="text-2xl font-bold text-white">{plan.name}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Panel central */}
        <div id="main-content" className="w-full md:w-3/5 p-4 bg-white" role="main">
          <form className="mt-5 max-w-md mx-auto" onSubmit={handleSearch} role="search">
            <div className="relative flex items-center">
              <div className="absolute flex items-center"></div>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md pr-3 pl-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder={t("searchPlaceholder")}
                aria-label={t("searchPlaceholder")}
              />

              {/* Microphone Button */}
              <button
                type="button"
                onClick={toggleListening}
                className={`rounded-md ml-2 p-2.5 border border-transparent text-center text-sm text-white transition-all duration-300 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isListening
                    ? "bg-red-600 hover:bg-red-700 active:bg-red-800" + (settings.reduceMotion ? "" : " animate-pulse")
                    : "bg-[#003049] hover:bg-slate-700 active:bg-slate-800"
                }`}
                aria-label={isListening ? t("stopListening") : t("startVoiceSearch")}
                aria-pressed={isListening}
              >
                <MicrophoneIcon className="size-4" />
              </button>

              {/* Search Button */}
              <button
                type="submit"
                className="rounded-md ml-2 bg-[#003049] p-2.5 border border-transparent text-center text-sm text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-slate-700 active:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                aria-label={t("search")}
              >
                <MagnifyingGlassIcon className="size-4" />
              </button>
            </div>

            {/* Listening Indicator */}
            {isListening && (
              <div className="flex items-center justify-center mt-3 space-x-2" role="status" aria-live="polite">
                <div className="text-sm font-medium text-red-600">{t("listening")}</div>
                {!settings.reduceMotion && (
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-red-600 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Lista de delitos */}
          <div className="mt-6" aria-live="polite">
            {loading ? (
              <p className="text-center text-gray-500" role="status">
                {t("loadingCrimes")}
              </p>
            ) : filteredDelitos.length > 0 ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">
                  {t("results")} ({filteredDelitos.length})
                </h2>
                {filteredDelitos.map((delito) => (
                  <div key={delito.id} className="p-4 bg-gray-100 rounded-lg shadow-sm" tabIndex={0}>
                    <h3 className="text-lg font-semibold">{delito.tipo}</h3>
                    <p>
                      <strong>{t("date")}:</strong> {delito.fecha}
                    </p>
                    <p>
                      <strong>{t("address")}:</strong> {delito.direccion}
                    </p>
                    <p>
                      <strong>{t("description")}:</strong> {delito.descripcion}
                    </p>
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
        <div
          className={`grid justify-items-center w-full md:w-1/5 p-8 ${themeClasses}`}
          role="complementary"
          aria-label={t("quickActions")}
        >
          <div className="text-center text-white mb-8">
            <p className="text-3xl font-bold">{t("reportEasily")}</p>
            <p className="text-sm mt-2">{t("reportButton")}</p>
          </div>
          <button
            className="w-[200px] h-[90px] text-[#D62828] border-2 border-[#003049]/50 bg-white text-2xl font-bold py-3 rounded-2xl hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => {
              setEditData(null)
              setShowModal(true)
            }}
            aria-label={t("reportCrime")}
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

      {/* Settings Panel */}
      <SettingsPanel isOpen={showSettings} onClose={() => setShowSettings(false)} />

    </div>
  )
}

// Main App Component with Provider
export default function App() {
  return (
    <AccessibilityProvider>
      <Community />
    </AccessibilityProvider>
  )
}
