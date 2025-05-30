"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { Link } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "@heroicons/react/24/outline"
import {
  UserGroupIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/solid"
import { MapPinIcon, ChartBarIcon } from "@heroicons/react/24/outline"

import im1 from "../images/home-carrusel/im1.jpeg"
import im2 from "../images/home-carrusel/im2.jpeg"
import im3 from "../images/home-carrusel/im3.jpeg"
import im4 from "../images/home-carrusel/im4.jpeg"
import im5 from "../images/home-carrusel/im5.jpeg"
import logo from "../images/logo/logo.png"

// Internationalization context and translations
const translations = {
  es: {
    login: "Iniciar Sesión",
    register: "Registrarse",
    aboutUs: "Sobre Nosotros",
    mainFeatures: "Características Principales",
    heatMap: "Mapa de Calor",
    startNow: "Comenzar Ahora",
    viewHeatMap: "Ver Mapa de Calor",
    about: "Acerca de",
    privacy: "Privacidad",
    terms: "Términos",
    contact: "Contacto",
    allRightsReserved: "Todos los derechos reservados",
    accessibility: "Accesibilidad",
    language: "Idioma",
    fontSize: "Tamaño de fuente",
    highContrast: "Alto contraste",
    reduceMotion: "Reducir movimiento",
    screenReader: "Lector de pantalla",
    accessibilitySettings: "Configuración de accesibilidad",
    close: "Cerrar",
    apply: "Aplicar",
    skipToContent: "Saltar al contenido principal",
    previous: "Anterior",
    next: "Siguiente",
    goToSlide: "Ir a diapositiva",
  },
  en: {
    login: "Login",
    register: "Register",
    aboutUs: "About Us",
    mainFeatures: "Main Features",
    heatMap: "Heat Map",
    startNow: "Start Now",
    viewHeatMap: "View Heat Map",
    about: "About",
    privacy: "Privacy",
    terms: "Terms",
    contact: "Contact",
    allRightsReserved: "All rights reserved",
    accessibility: "Accessibility",
    language: "Language",
    fontSize: "Font size",
    highContrast: "High contrast",
    reduceMotion: "Reduce motion",
    screenReader: "Screen reader",
    accessibilitySettings: "Accessibility settings",
    close: "Close",
    apply: "Apply",
    skipToContent: "Skip to main content",
    previous: "Previous",
    next: "Next",
    goToSlide: "Go to slide",
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
            className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
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
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

function Home() {
  const { settings, t } = useAccessibility()
  const [activeIndex, setActiveIndex] = useState(0)
  const [showA11yPanel, setShowA11yPanel] = useState(false)

  const images = [im1, im2, im3, im4, im5]
  const carouselTexts = [
    "Juntos por una comunidad más segura",
    "Reporta delitos de manera anónima",
    "Visualiza zonas de riesgo en tiempo real",
    "Contribuye a la seguridad de tu vecindario",
    "Información que salva vidas",
  ]

  useEffect(() => {
    if (!settings.reduceMotion) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [images.length, settings.reduceMotion])

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length)

  const features = [
    {
      title: "Reportes Anónimos",
      description: "Reporta incidentes sin revelar tu identidad, garantizando tu seguridad y privacidad.",
      icon: <ShieldCheckIcon className="h-12 w-12 text-white" />,
      color: "#D62828",
    },
    {
      title: "Mapa de Calor",
      description: "Visualiza las zonas con mayor incidencia de delitos para tomar decisiones informadas.",
      icon: <MapPinIcon className="h-12 w-12 text-white" />,
      color: "#FCBF49",
    },
    {
      title: "Estadísticas",
      description: "Accede a datos actualizados sobre la situación de seguridad en tu comunidad.",
      icon: <ChartBarIcon className="h-12 w-12 text-white" />,
      color: "#3a86ff",
    },
    {
      title: "Veracidad de Datos",
      description: "Verifica la autenticidad de los reportes mediante las valoraciones de otros usuarios.",
      icon: <CheckIcon className="h-12 w-12 text-white" />,
      color: "#008f39",
    },
    {
      title: "Ubicación Precisa",
      description: "Reporta incidentes con ubicación exacta. Solo necesitas habilitar el GPS y presionar el botón de ubicación.",
      icon: <MapPinIcon className="h-12 w-12 text-white" />,
      color: "#D62828",
    },
  ]

  // Información de los niveles de riesgo para el mapa de calor
  const riskLevels = [
    {
      color: "#bf001f",
      level: "Alto",
      description: "Incidencia alta de homicidios y hurtos en la zona.",
      icon: <ExclamationTriangleIcon className="h-10 w-10 text-white" />,
    },
    {
      color: "#003fff",
      level: "Medio",
      description: "Incidencia moderada de homicidios y hurtos en la zona.",
      icon: <ShieldExclamationIcon className="h-10 w-10 text-white" />,
    },
    {
      color: "#00ffff",
      level: "Bajo",
      description: "Incidencia baja de homicidios y hurtos en la zona.",
      icon: <ShieldCheckIcon className="h-10 w-10 text-white" />,
    },
  ]

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
    <div className={`min-h-screen bg-white flex flex-col font-roboto ${settings.highContrast ? "high-contrast" : ""}`}>
      {/* Skip Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        {t("skipToContent")}
      </a>

      {/* Accessibility Button */}
      <button
        onClick={() => setShowA11yPanel(true)}
        className={`fixed right-4 top-[600px] z-50 p-3 bg-gray-200 text-black rounded-full shadow-xl hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${motionClasses}`}
        aria-label={t("accessibility")}
      >
        <Cog8ToothIcon className="w-6 h-6" aria-hidden="true" />
      </button>

      <header className="sticky top-0 z-40 flex justify-between items-center px-6 py-4 bg-[#003049] shadow-lg">
        <h1 className="text-xl font-bold flex items-center text-white">
          <img src={logo || "/placeholder.svg"} alt="Logo GeoCrimen" className="w-11 mr-2" />
          <span className="text-2xl">GeoCrimen</span>
        </h1>
        <nav className="flex items-center gap-6" role="navigation" aria-label="Navegación principal">
          <Link
            to="/login"
            className={`text-white hover:text-gray-200 font-medium ${motionClasses}`}
          >
            {t("login")}
          </Link>
          <Link
            to="/register"
            className={`px-4 py-2 bg-white text-[#003049] font-bold rounded-md hover:bg-gray-100 shadow-sm ${motionClasses}`}
          >
            {t("register")}
          </Link>
        </nav>
      </header>

      <main id="main-content">
        <section className="relative" role="banner">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
          <div className="relative h-[600px] w-full overflow-hidden">
            {images.map((img, i) => (
              <div
                key={i}
                className={`absolute inset-0 ${
                  settings.reduceMotion ? "" : "transition-opacity duration-1000"
                } ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
              >
                <img
                  src={img || "/placeholder.svg"}
                  className="h-full w-full object-cover"
                  alt={`Slide ${i + 1}: ${carouselTexts[i]}`}
                />
              </div>
            ))}

            <div className="absolute bottom-0 left-0 right-0 z-20 text-center p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
                {carouselTexts[activeIndex]}
              </h2>
            </div>

            <button
              onClick={handlePrev}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-12 w-12 bg-black/30 hover:bg-black/50 rounded-full focus:outline-none focus:ring-2 focus:ring-white ${motionClasses}`}
              aria-label={t("previous")}
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center h-12 w-12 bg-black/30 hover:bg-black/50 rounded-full focus:outline-none focus:ring-2 focus:ring-white ${motionClasses}`}
              aria-label={t("next")}
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white ${
                    i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`${t("goToSlide")} ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block pb-2 border-b-2 border-[#D62828]">
                <h2 className="text-3xl font-bold">
                  <span className="text-[#003049]">{t("aboutUs").split(" ")[0]}</span>{" "}
                  <span className="text-[#D62828]">{t("aboutUs").split(" ")[1]}</span>
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed font-roboto text-justify">
                GeoCrimen es una plataforma que permite a los ciudadanos reportar y visualizar delitos en cualquier parte
                de Colombia. Utilizando tecnología de mapas de calor, los usuarios podrán observar la ubicación y
                naturaleza de los delitos, lo que ayuda a crear conciencia y fomentar la seguridad comunitaria.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-roboto text-justify">
                Nuestra misión es empoderar a las comunidades con información valiosa para tomar decisiones informadas
                sobre su seguridad, mientras facilitamos la colaboración ciudadana en la prevención del delito.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className={`absolute -inset-4 rounded-full bg-[#003049]/10 ${
                    settings.reduceMotion ? "" : "animate-pulse"
                  }`}
                ></div>
                <div className="relative bg-[#003049]/5 rounded-full p-8">
                  <UserGroupIcon className="w-64 h-64 text-[#003049]" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-[#003049]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">{t("mainFeatures")}</h2>

            <div className="grid grid-flow-col gap-8 justify-items-center">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden transform ${
                    settings.reduceMotion ? "" : "transition-transform hover:scale-105"
                  }`}
                >
                  <div className="h-3" style={{ backgroundColor: feature.color }}></div>
                  <div className="p-6">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-full" style={{ backgroundColor: feature.color }}>
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#003049] text-center mb-4">{feature.title}</h3>
                    <p className="text-gray-700 text-center">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                to="/login"
                className={`inline-flex items-center px-6 py-3 bg-white text-[#003049] font-bold rounded-md hover:bg-gray-100 shadow-md ${motionClasses}`}
              >
                {t("startNow")}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Nueva sección: Niveles de Riesgo en el Mapa de Calor */}
        <section className="py-20 px-6 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-[#003049] text-center mb-6">{t("heatMap")}</h2>
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-16">
              Nuestro mapa de calor utiliza un sistema de colores para indicar los niveles de riesgo en diferentes zonas,
              permitiéndote identificar rápidamente las áreas más seguras y las que requieren mayor precaución.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {riskLevels.map((level, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
                  <div className="absolute inset-0 opacity-90" style={{ backgroundColor: level.color }}></div>
                  <div className="relative p-8 flex flex-col items-center text-white z-10 h-full">
                    <div className="mb-4 p-3 rounded-full bg-white/20 backdrop-blur-sm">{level.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">Nivel {level.level}</h3>
                    <div className="w-16 h-1 bg-white mb-4"></div>
                    <p className="text-center text-lg">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/heatmap"
                className={`inline-flex items-center px-6 py-3 bg-[#003049] text-white font-bold rounded-md hover:bg-[#002135] shadow-md ${motionClasses}`}
              >
                {t("viewHeatMap")}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#002135] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <img src={logo || "/placeholder.svg"} alt="Logo GeoCrimen" className="w-12 mr-3" />
              <span className="text-2xl font-bold">GeoCrimen</span>
            </div>
            <nav className="flex gap-6" role="navigation" aria-label="Enlaces del pie de página">
              <Link to="/about" className={`text-gray-300 hover:text-white ${motionClasses}`}>
                {t("about")}
              </Link>
              <Link to="/privacy" className={`text-gray-300 hover:text-white ${motionClasses}`}>
                {t("privacy")}
              </Link>
              <Link to="/terms" className={`text-gray-300 hover:text-white ${motionClasses}`}>
                {t("terms")}
              </Link>
              <Link to="/contact" className={`text-gray-300 hover:text-white ${motionClasses}`}>
                {t("contact")}
              </Link>
            </nav>
          </div>
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 GeoCrimen. {t("allRightsReserved")}.</p>
            <div className="flex gap-4">
              <a href="#" className={`text-gray-400 hover:text-white ${motionClasses}`} aria-label="Facebook">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className={`text-gray-400 hover:text-white ${motionClasses}`} aria-label="Twitter">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className={`text-gray-400 hover:text-white ${motionClasses}`} aria-label="Instagram">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessibility Panel */}
      <AccessibilityPanel isOpen={showA11yPanel} onClose={() => setShowA11yPanel(false)} />

    </div>
  )
}

// Main App Component with Provider
export default function AccessibleHome() {
  return (
    <AccessibilityProvider>
      <Home />
    </AccessibilityProvider>
  )
}
