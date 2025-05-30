"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { MagnifyingGlassIcon,MapPinIcon, EyeIcon, MicrophoneIcon } from "@heroicons/react/24/solid"
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline"
import imagen5 from "../images/Homicidio.jpeg"
import imagen6 from "../images/Hurto.jpeg"

// Internationalization context and translations
const translations = {
  es: {
    search: "Buscar...",
    listening: "Escuchando...",
    loadingCrimes: "Cargando delitos...",
    noCrimesFound: "No se encontraron delitos.",
    date: "Fecha",
    address: "Dirección",
    description: "Descripción",
    reports: "Reportes",
    information: "Información",
    accessibility: "Accesibilidad",
    language: "Idioma",
    fontSize: "Tamaño de fuente",
    highContrast: "Alto contraste",
    reduceMotion: "Reducir movimiento",
    screenReader: "Lector de pantalla",
    accessibilitySettings: "Configuración de accesibilidad",
    close: "Cerrar",
    apply: "Aplicar",
    startVoiceSearch: "Iniciar búsqueda por voz",
    stopListening: "Detener escucha",
    search: "Buscar",
  },
  en: {
    search: "Search...",
    listening: "Listening...",
    loadingCrimes: "Loading crimes...",
    noCrimesFound: "No crimes found.",
    date: "Date",
    address: "Address",
    description: "Description",
    reports: "Reports",
    information: "Information",
    accessibility: "Accessibility",
    language: "Language",
    fontSize: "Font size",
    highContrast: "High contrast",
    reduceMotion: "Reduce motion",
    screenReader: "Screen reader",
    accessibilitySettings: "Accessibility settings",
    close: "Close",
    apply: "Apply",
    startVoiceSearch: "Start voice search",
    stopListening: "Stop listening",
    search: "Search",
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
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors  ${
        checked ? "bg-black" : "bg-gray-200"
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

// Accessibility Settings Panel Component
function AccessibilityPanel({ isOpen, onClose }) {
  const { settings, updateSettings, t } = useAccessibility()
  const [tempSettings, setTempSettings] = useState(settings)

  useEffect(() => {
    if (isOpen) {
      setTempSettings(settings)
    }
  }, [isOpen, settings])

  if (!isOpen) return null

  const handleApply = () => {
    updateSettings(tempSettings)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-labelledby="a11y-title"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 id="a11y-title" className="text-xl font-bold text-gray-900">
            {t("accessibilitySettings")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded p-1"
            aria-label={t("close")}
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
              value={tempSettings.language}
              onChange={(e) => setTempSettings({ ...tempSettings, language: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">
              {t("fontSize")}: {tempSettings.fontSize}px
            </label>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={tempSettings.fontSize}
              onChange={(value) => setTempSettings({ ...tempSettings, fontSize: value })}
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
              checked={tempSettings.highContrast}
              onChange={(checked) => setTempSettings({ ...tempSettings, highContrast: checked })}
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
              checked={tempSettings.reduceMotion}
              onChange={(checked) => setTempSettings({ ...tempSettings, reduceMotion: checked })}
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
              checked={tempSettings.screenReaderEnabled}
              onChange={(checked) => setTempSettings({ ...tempSettings, screenReaderEnabled: checked })}
              ariaLabel={t("screenReader")}
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[#003049] text-white rounded-md hover:bg-[#003049]/90"
            >
              {t("apply")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const images = [imagen5, imagen6]

function H2() {
  const { settings, t } = useAccessibility()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false) // abrir y cerrar informacion
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) //abrir y cerrar barra lateral
  const [showA11yPanel, setShowA11yPanel] = useState(false) // mostrar/ocultar panel de accesibilidad
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [delitos, setDelitos] = useState([])
  const [loading, setLoading] = useState(true)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

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
        console.error("no se reconoce el dialogo", event.error)
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

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      recognition.start()
      setIsListening(true)
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

  // Google Maps Heat Map
  const [map, setMap] = useState(null)
  const [heatmap, setHeatmap] = useState(null)

  useEffect(() => {
    // Carga del script de Google Maps
    const googleMapScript = document.createElement("script")
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDwz-GvKSjm3HLrOENzt94cDaD_dDm-IMg&libraries=visualization`
    googleMapScript.async = true
    googleMapScript.defer = true
    window.document.body.appendChild(googleMapScript)

    googleMapScript.addEventListener("load", () => {
      initMap()
    })

    return () => {
      // Limpieza al desmontar
      if (googleMapScript.parentNode) {
        googleMapScript.parentNode.removeChild(googleMapScript)
      }
    }
  }, [])

  const initMap = () => {
    // Coordenadas iniciales (puedes ajustarlas según tu ubicación deseada)
    const initialLocation = { lat: 4.084722, lng: -76.198611 } // Tuluá, Colombia como ejemplo

    // Crear el mapa
    const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
      center: initialLocation,
      zoom: 12,
      mapTypeId: "roadmap",
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
    })

    setMap(mapInstance)

    // Datos de ejemplo para el mapa de calor (deberías reemplazar esto con tus datos reales)
    const crimeData = [
      { location: new window.google.maps.LatLng(4.6097, -74.0817), weight: 5 },
      { location: new window.google.maps.LatLng(4.62, -74.085), weight: 3 },
      { location: new window.google.maps.LatLng(4.615, -74.07), weight: 7 },
      { location: new window.google.maps.LatLng(4.595, -74.09), weight: 2 },
      { location: new window.google.maps.LatLng(4.63, -74.065), weight: 9 },
      { location: new window.google.maps.LatLng(4.58, -74.1), weight: 6 },
    ]

    // Crear el mapa de calor
    const heatmapInstance = new window.google.maps.visualization.HeatmapLayer({
      data: crimeData,
      map: mapInstance,
      radius: 200,
      opacity: 0.7,
      gradient: [
        "rgba(0, 255, 255, 0)",
        "rgba(0, 255, 255, 1)",
        "rgba(0, 191, 255, 1)",
        "rgba(0, 127, 255, 1)",
        "rgba(0, 63, 255, 1)",
        "rgba(0, 0, 255, 1)",
        "rgba(0, 0, 223, 1)",
        "rgba(0, 0, 191, 1)",
        "rgba(0, 0, 159, 1)",
        "rgba(0, 0, 127, 1)",
        "rgba(63, 0, 91, 1)",
        "rgba(127, 0, 63, 1)",
        "rgba(191, 0, 31, 1)",
        "rgba(255, 0, 0, 1)",
      ],
    })

    setHeatmap(heatmapInstance)
  }

  // Keyboard shortcut for accessibility panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + A to open accessibility panel
      if (e.altKey && e.key === "a") {
        setShowA11yPanel((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const motionClasses = settings.reduceMotion ? "" : "transition-all duration-300"

  return (
    <div className={`relative bg-indigo-500 ${settings.highContrast ? "high-contrast" : ""}`}>
      {/* Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 text-white px-4 py-2 rounded z-50"
      >
        Saltar al contenido principal
      </a>

      {/* Accessibility Button */}
      <button
        onClick={() => setShowA11yPanel(true)}
        className={`fixed right-2 top-20 z-50 p-3 bg-[#003049] text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${motionClasses}`}
        aria-label={t("accessibility")}
      >
        <Cog8ToothIcon className="w-6 h-6" aria-hidden="true" />
      </button>

      <div className="bg-black flex justify-center">
        <div
          id="map"
          className="w-screen"
          style={{ height: "100vh" }}
          role="application"
          aria-label="Mapa de calor de delitos"
        />

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 z-40 h-screen max-w-[20rem] w-full bg-white shadow-xl transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${settings.reduceMotion ? "transition-none" : ""}`}
          role="complementary"
          aria-label="Barra lateral de búsqueda y reportes"
        >
          <div className="flex flex-col h-full p-4 text-gray-700 relative">
            {/* Botón para cerrar */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute right-[-32px] top-1/2 transform -translate-y-4/2 bg-white rounded-r-md px-2 py-4 z-30"
              aria-label="Cerrar barra lateral"
            >
              <ChevronDoubleLeftIcon className="w-4 h-4 text-gray-500" strokeWidth={3} />
            </button>

            {/* Buscador */}
            <form className="mt-2 max-w-md mx-auto" role="search">
              <div className="relative flex items-center">
                <div className="absolute flex items-center"></div>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-400 rounded-md pr-3 pl-3 py-2 transition duration-300 ease-in-out focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder={t("search")}
                  aria-label={t("search")}
                />

                {/* Microphone Button */}
                <button
                  type="button"
                  onClick={toggleListening}
                  className={`rounded-md ml-2 p-2.5 border border-transparent text-center text-sm text-white transition-all duration-300 shadow-sm hover:shadow-lg ${
                    isListening
                      ? "bg-red-600 hover:bg-red-700 active:bg-red-800" +
                        (settings.reduceMotion ? "" : " animate-pulse")
                      : "bg-[#003049] hover:bg-slate-700 active:bg-slate-800"
                  }`}
                  aria-label={isListening ? t("stopListening") : t("startVoiceSearch")}
                  aria-pressed={isListening}
                >
                  <MicrophoneIcon className="w-5 h-5 text-white" aria-hidden="true" />
                </button>

                {/* Search Button */}
                <button
                  type="submit"
                  className="rounded-md ml-2 bg-[#003049] p-2.5 border border-transparent text-center text-sm text-white transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-slate-700 active:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none"
                  aria-label={t("search")}
                >
                  <MagnifyingGlassIcon className="w-5 h-5 text-white" aria-hidden="true" />
                </button>
              </div>

              {/* Listening Indicator */}
              {isListening && (
                <div className="flex items-center justify-center mt-3 space-x-2" role="status" aria-live="assertive">
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
                  {filteredDelitos.map((delito) => (
                    <div key={delito.id} className="p-4 bg-gray-100 rounded-lg shadow-sm" tabIndex="0">
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

            {/* Carrusel */}
            <div
              className="mt-5 relative h-40 overflow-hidden rounded-lg mb-4"
              role="region"
              aria-label="Carrusel de imágenes"
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img || "/placeholder.svg"}
                  className={`absolute block w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
                    i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                  } ${settings.reduceMotion ? "transition-none" : ""}`}
                  alt={`Slide ${i + 1}`}
                />
              ))}
              <button
                onClick={handlePrev}
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4"
                aria-label="Imagen anterior"
              >
                <ChevronLeftIcon className="w-5 h-5 text-white" strokeWidth={4.5} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4"
                aria-label="Imagen siguiente"
              >
                <ChevronRightIcon className="w-5 h-5 text-white" strokeWidth={4.5} />
              </button>
            </div>

            {/* Menús */}
            <hr className="my-2" />
            <nav className="p-3 text-xl font-semibold text-black">
              <p>{t("reports")}</p>
            </nav>
            <hr className="my-2 border-blue-gray-50" />

            {/* Acordeón */}
            <nav className="flex flex-col gap-1 p-2 text-base text-blue-gray-700">
              <div className="w-full rounded-md">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center justify-between w-full p-3 text-xl font-semibold text-blue-gray-700 hover:text-blue-gray-900"
                  aria-expanded={isOpen}
                  aria-controls="info-panel"
                >
                  <div className="flex items-center gap-5 font-bold text-black">
                    <MapPinIcon className="h-5 w-5" aria-hidden="true" />
                    <p>{t("information")}</p>
                  </div>
                  <ChevronUpIcon
                    className={`w-5 h-5 text-black transition-transform ${isOpen ? "rotate-180" : ""} ${
                      settings.reduceMotion ? "transition-none" : ""
                    }`}
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div id="info-panel" className="p-3 bg-blue-100 text-blue-800 rounded-md">
                    Aquí va el contenido del Dashboard.
                  </div>
                )}
              </div>
            </nav>

            <nav className="flex flex-col gap-1 p-2 text-base text-blue-gray-700">
              <div className="w-full rounded-md">
                <button
                  type="button"
                  onClick={() => navigate("/community")}
                  className="flex items-center justify-between w-full p-3 text-xl font-semibold text-blue-gray-700 hover:text-blue-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <div className="flex items-center gap-5 font-bold text-black">
                    <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    <p>{t("reports")}</p>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Botón para abrir (solo si está cerrado) */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed left-[0.2px] top-1/2 transform -translate-y-4/2 bg-white rounded-r-md px-2 py-4 z-50 shadow-xl"
            aria-label="Abrir barra lateral"
          >
            <ChevronDoubleRightIcon className="w-4 h-4 text-gray-500" strokeWidth={3} />
          </button>
        )}
      </div>

      {/* Accessibility Panel */}
      <AccessibilityPanel isOpen={showA11yPanel} onClose={() => setShowA11yPanel(false)} />

    
    </div>
  )
}

// Main App Component with Provider
export default function AccessibleH2() {
  return (
    <AccessibilityProvider>
      <H2 />
    </AccessibilityProvider>
  )
}
