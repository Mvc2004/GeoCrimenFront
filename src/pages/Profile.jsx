import { useState, useEffect, createContext, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PencilSquareIcon, UserCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import imagen1 from "../images/imgfondo/perfil.jpg"

// Internationalization context and translations
const translations = {
  es: {
    user: "Usuario",
    email: "Email",
    password: "Contraseña",
    update: "Actualizar",
    updating: "Actualizando",
    deleteAccount: "Eliminar Cuenta",
    cancel: "Cancelar",
    confirm: "Confirmar",
    deleting: "Eliminando",
    profileUpdated: "Perfil actualizado correctamente",
    updateError: "Error al actualizar el perfil",
    deleteError: "Error al eliminar la cuenta",
    deleteConfirmation: "¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.",
    invalidEmail: "Email inválido",
    passwordMinLength: "La contraseña debe tener al menos 8 caracteres",
    usernameMinLength: "El nombre de usuario debe tener al menos 3 caracteres",
    editUsername: "Editar nombre de usuario",
    editEmail: "Editar email",
    editPassword: "Editar contraseña",
    showPassword: "Mostrar contraseña",
    hidePassword: "Ocultar contraseña",
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
  },
  en: {
    user: "User",
    email: "Email",
    password: "Password",
    update: "Update",
    updating: "Updating",
    deleteAccount: "Delete Account",
    cancel: "Cancel",
    confirm: "Confirm",
    deleting: "Deleting",
    profileUpdated: "Profile updated successfully",
    updateError: "Error updating profile",
    deleteError: "Error deleting account",
    deleteConfirmation: "Are you sure you want to delete your account? This action cannot be undone.",
    invalidEmail: "Invalid email",
    passwordMinLength: "Password must be at least 8 characters",
    usernameMinLength: "Username must be at least 3 characters",
    editUsername: "Edit username",
    editEmail: "Edit email",
    editPassword: "Edit password",
    showPassword: "Show password",
    hidePassword: "Hide password",
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
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t("apply")}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Profile() {
  const { settings, t } = useAccessibility()
  const navigate = useNavigate()
  const [showA11yPanel, setShowA11yPanel] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    username: "Usuario123",
    email: "usuario@email.com",
    password: "********",
  })

  // UI state
  const [isEditable, setIsEditable] = useState({
    username: false,
    email: false,
    password: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    general: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Handlers
  const handleEditClick = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: true }))
  }

  const validateField = (name, value) => {
    let error = ""

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        error = t("invalidEmail")
      }
    } else if (name === "password" && isEditable.password) {
      if (value.length < 8) {
        error = t("passwordMinLength")
      }
    } else if (name === "username") {
      if (value.length < 3) {
        error = t("usernameMinLength")
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
    return error === ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    validateField(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const isUsernameValid = validateField("username", formData.username)
    const isEmailValid = validateField("email", formData.email)
    const isPasswordValid = validateField("password", formData.password)

    if (isUsernameValid && isEmailValid && isPasswordValid) {
      setIsLoading(true)

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Success
        setSuccessMessage(t("profileUpdated"))
        setTimeout(() => setSuccessMessage(""), 3000) // Clear after 3 seconds

        // Reset editable states
        setIsEditable({
          username: false,
          email: false,
          password: false,
        })

        // Announce success for screen readers
        if (settings.screenReaderEnabled) {
          const utterance = new SpeechSynthesisUtterance(t("profileUpdated"))
          utterance.lang = settings.language === "es" ? "es-ES" : "en-US"
          speechSynthesis.speak(utterance)
        }
      } catch (error) {
        console.error("Error updating profile:", error)
        setErrors((prev) => ({ ...prev, general: t("updateError") }))
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDeleteAccount = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to home page after successful deletion
      navigate("/")
    } catch (error) {
      console.error("Error deleting account:", error)
      setErrors((prev) => ({ ...prev, general: t("deleteError") }))
      setShowDeleteConfirm(false)
    } finally {
      setIsLoading(false)
    }
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

  const motionClasses = settings.reduceMotion ? "" : "transition delay-150 duration-300 ease-in-out"

  return (
    <div
      className={`w-full min-h-screen bg-cover bg-center relative bg-opacity backdrop-blur-lg ${settings.highContrast ? "high-contrast" : ""}`}
    >
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
        className={`fixed right-4 top-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${motionClasses}`}
        aria-label={t("accessibility")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>
      </button>

      {/* Background image with optimization */}
      <img
        src={imagen1 || "/placeholder.svg"}
        alt="Fondo del perfil"
        className="absolute inset-0 w-full h-full object-cover blur-md"
      />
      <div className="absolute inset-0 bg-blue-50 z-0"></div>

      {/* Content above the image */}
      <div className="flex flex-col md:flex-row w-full min-h-screen relative z-20">
        {/* Left partition (empty or decorative) */}
        <div className="hidden md:block w-1/5 p-8"></div>

        {/* Central partition */}
        <div className="w-full md:w-3/5" id="main-content">
          <div className="flex flex-col items-center justify-center h-screen">
            {/* Profile header */}
            <div className="flex flex-col items-center">
              <span className="text-black text-4xl">
                <UserCircleIcon className="w-40 text-[#003049]" aria-hidden="true" />
              </span>
            </div>

            {/* Profile form */}
            <div className="mt-10 relative flex flex-col rounded-xl bg-[#003049] p-5 shadow-lg">
              <form className="w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                  {/* Username field */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="username" className="block mb-2 text-sm text-white font-bold">
                      {t("user")}
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      readOnly={!isEditable.username}
                      onChange={handleChange}
                      placeholder={t("user")}
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.username ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.username ? "bg-white" : "bg-gray-100"
                      }`}
                      aria-describedby={errors.username ? "username-error" : undefined}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                      onClick={() => handleEditClick("username")}
                      aria-label={t("editUsername")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </button>
                    {errors.username && (
                      <p id="username-error" className="text-red-300 text-xs mt-1">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="email" className="block mb-2 text-sm text-white font-bold">
                      {t("email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly={!isEditable.email}
                      onChange={handleChange}
                      placeholder={t("email")}
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.email ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.email ? "bg-white" : "bg-gray-100"
                      }`}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                      onClick={() => handleEditClick("email")}
                      aria-label={t("editEmail")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </button>
                    {errors.email && (
                      <p id="email-error" className="text-red-300 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password field */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="password" className="block mb-2 text-sm text-white font-bold">
                      {t("password")}
                    </label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      readOnly={!isEditable.password}
                      onChange={handleChange}
                      placeholder={t("password")}
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.password ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.password ? "bg-white" : "bg-gray-100"
                      }`}
                      aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    {isEditable.password && (
                      <button
                        type="button"
                        className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-500 mt-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500 mt-5" />
                        )}
                      </button>
                    )}
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                      onClick={() => handleEditClick("password")}
                      aria-label={t("editPassword")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </button>
                    {errors.password && (
                      <p id="password-error" className="text-red-300 text-xs mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>
                </div>

                {/* General error message */}
                {errors.general && (
                  <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md text-center text-sm" role="alert">
                    {errors.general}
                  </div>
                )}

                {/* Success message */}
                {successMessage && (
                  <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center text-sm" role="alert">
                    {successMessage}
                  </div>
                )}

                {/* Update button */}
                <button
                  type="submit"
                  disabled={isLoading || (!isEditable.username && !isEditable.email && !isEditable.password)}
                  className={`mt-8 mx-auto block w-[110px] rounded-md bg-[#FCBF49] font-bold py-2 border border-transparent text-center text-sm text-[#003049] hover:-translate-y-1 hover:scale-110 hover:bg-[#FCBF49]/85 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 ${motionClasses}`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#003049]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("updating")}
                    </span>
                  ) : (
                    t("update")
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Right partition - Delete account */}
        <div className="w-full md:w-1/5 p-10">
          <div className="flex flex-col items-center justify-center">
            {!showDeleteConfirm ? (
              <button
                type="button"
                className={`w-[130px] bg-[#D62828] text-white font-bold py-2 rounded-md text-center text-sm hover:-translate-y-1 hover:scale-110 hover:bg-[#D62828]/85 ${motionClasses}`}
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isLoading}
              >
                {t("deleteAccount")}
              </button>
            ) : (
              <div className="bg-white p-4 rounded-md shadow-md">
                <p className="text-sm text-gray-800 mb-3">{t("deleteConfirmation")}</p>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className={`bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-400 ${motionClasses}`}
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isLoading}
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="button"
                    className={`bg-[#D62828] text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 ${motionClasses}`}
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("deleting")}
                      </span>
                    ) : (
                      t("confirm")
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Accessibility Panel */}
      <AccessibilityPanel isOpen={showA11yPanel} onClose={() => setShowA11yPanel(false)} />

    </div>
  )
}

// Main App Component with Provider
export default function AccessibleProfile() {
  return (
    <AccessibilityProvider>
      <Profile />
    </AccessibilityProvider>
  )
}
