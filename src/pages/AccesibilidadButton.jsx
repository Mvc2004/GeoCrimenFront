import { useState, useEffect } from "react"
import { useAccessibility } from "./AccessibilityContext"
import { useTranslation } from 'react-i18next';
import i18n from "../i18n"
import { ArrowsRightLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";



const AccesibilidadButton = () => {
  const { settings, updateSettings} = useAccessibility()
  const [isOpen, setIsOpen] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const { t, i18n } = useTranslation();
  

  
  

  const aumentarTexto = () => {
    if (settings.fontSize < 24) {
      updateSettings({ fontSize: settings.fontSize + 1 })
    }
  }

  const reducirTexto = () => {
    if (settings.fontSize > 12) {
      updateSettings({ fontSize: settings.fontSize - 1 })
    }
  }

  const alternarContraste = () => {
    updateSettings({ highContrast: !settings.highContrast })
  }

  const cambiarIdioma = () => {
    const nuevoIdioma = settings.language === "es" ? "en" : "es"
      i18n.changeLanguage(nuevoIdioma)
      updateSettings({ language: nuevoIdioma })
  }

  const leerPantalla = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
      return
    }

    // Get main content text, excluding the accessibility panel
    const mainContent = document.querySelector("#main-content") || document.body
    const texto = mainContent.innerText

    const utterance = new SpeechSynthesisUtterance(texto)
    utterance.lang = settings.language === "es" ? "es-ES" : "en-US"
    utterance.rate = 0.8
    utterance.pitch = 1

    utterance.onend = () => {
      setIsReading(false)
    }

    utterance.onerror = () => {
      setIsReading(false)
    }

    window.speechSynthesis.speak(utterance)
    setIsReading(true)
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".accessibility-panel")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Keyboard shortcut (Alt + A)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === "a") {
        event.preventDefault()
        setIsOpen(!isOpen)
      }
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className="accessibility-panel fixed right-0 top-[200px] transform -translate-y-1/2 z-50 flex items-center">
  {/* Botón de accesibilidad siempre visible */}
  <button
    onClick={() => setIsOpen(!isOpen)}
    className={`bg-[#F77F00] hover:bg-[#F77F00]/80 text-white p-4 rounded-l-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F77F00]/50 focus:ring-offset-2 transition-all duration-800 ${
      isOpen ? "rounded-r-none animate-slide-in-right" : ""
    } ${settings.reduceMotion ? "transition-none" : ""}`}
    aria-label={t("accessibility")}
    aria-expanded={isOpen}
    title={`${t("accessibility")} (Alt + A)`}
  >
    <svg fill="#FFFFFF" width="20px" height="20px" viewBox="-1 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.90040404,10.0156183 L5.57640804,13.1030489 C5.51867857,13.653166 5.02661696,14.0522519 4.47735768,13.9944323 C3.92809841,13.9366127 3.52963478,13.4437825 3.58736425,12.8936654 L4.30980443,6.00937098 L1,6.00937098 C0.44771525,6.00937098 0,5.56095647 0,5.00780915 C0,4.45466182 0.44771525,4.00624732 1,4.00624732 L11,4.00624732 C11.5522847,4.00624732 12,4.45466182 12,5.00780915 C12,5.56095647 11.5522847,6.00937098 11,6.00937098 L7.69019557,6.00937098 L8.41263575,12.8936654 C8.47036522,13.4437825 8.07190159,13.9366127 7.52264232,13.9944323 C6.97338304,14.0522519 6.48132143,13.653166 6.42359196,13.1030489 L6.09959596,10.0156183 L5.90040404,10.0156183 Z M6,4.00624732 C4.8954305,4.00624732 4,3.10941831 4,2.00312366 C4,0.89682901 4.8954305,0 6,0 C7.1045695,0 8,0.89682901 8,2.00312366 C8,3.10941831 7.1045695,4.00624732 6,4.00624732 Z"/>
    </svg>
  </button>

  {/* Panel de accesibilidad */}
  {isOpen && (
    <div
      className={`bg-white shadow-xl border rounded-md border-gray-200 p-4 space-y-3 w-72 max-h-96 overflow-y-auto ${
        settings.reduceMotion ? "" : "animate-slide-in-right"
      }`}
      role="dialog"
      aria-labelledby="accessibility-title"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex justify-end items-center border-gray-200 pb-0">
        <button
          onClick={() => setIsOpen(false)}
          className="text-black hover:text-gray-600 focus:outline-none focus:ring-2 rounded p-1"
          aria-label={t("close")}
        >
          <XMarkIcon className="h-5 w-5" strokeWidth={2} />
        </button>
          </div>

          {/* Language Toggle */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{t("language")}</label>
            <button
              onClick={cambiarIdioma}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-pressed={settings.language === "en"}
            >
              <span className="text-sm text-gray-500">{settings.language === "es" ? "🇪🇸 Español" : "🇺🇸 English"}</span>
              <ArrowsRightLeftIcon className=" h-4 w-4" strokeWidth={2}/>
            </button>
          </div>

          {/* Font Size Control */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {t("fontSize")}: {settings.fontSize}px
            </label>
            <div className="flex items-center justify-between space-x-2">
              <button
                onClick={reducirTexto}
                disabled={settings.fontSize <= 12}
                className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={t("decreaseText")}
              >
                <span className="text-lg font-bold">A−</span>
              </button>
              <div className="px-3 py-2 bg-blue-50 rounded-md min-w-[60px] text-center">
                <span className="text-sm font-medium text-blue-800">{settings.fontSize}px</span>
              </div>
              <button
                onClick={aumentarTexto}
                disabled={settings.fontSize >= 24}
                className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={t("increaseText")}
              >
                <span className="text-lg font-bold">A+</span>
              </button>
            </div>
          </div>

          {/* High Contrast Toggle */}
          <div className="space-y-2">
            <button
              onClick={alternarContraste}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                settings.highContrast
                  ? "bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
              }`}
              aria-pressed={settings.highContrast}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {settings.highContrast ? t("removeHighContrast") : t("highContrast")}
                </span>
              </div>
              <div className={`w-4 h-4 rounded-full ${settings.highContrast ? "bg-yellow-500" : "bg-gray-400"}`}></div>
            </button>
          </div>

          {/* Screen Reader */}
          <div className="space-y-2">
            <button
              onClick={leerPantalla}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isReading
                  ? "bg-red-100 hover:bg-red-200 text-red-800"
                  : "bg-green-100 hover:bg-green-200 text-green-800"
              }`}
              aria-pressed={isReading}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {isReading ? t("stopReading") : t("readScreen")}
                </span>
              </div>
              {isReading && (
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-red-500 animate-pulse"></div>
                  <div className="w-1 h-4 bg-red-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-1 h-4 bg-red-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              )}
            </button>
          </div>

          {/* Keyboard Shortcut Info */}
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              {settings.language === "es" ? "Atajo: Alt + A" : "Shortcut: Alt + A"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccesibilidadButton
