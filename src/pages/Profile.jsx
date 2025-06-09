import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { PencilSquareIcon, UserCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import imagen1 from "../images/imgfondo/perfil.jpg"
import { useTranslation } from 'react-i18next';
import { AccessibilityProvider } from './AccessibilityContext';
import AccesibilidadButton from './AccesibilidadButton';



export default function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      const id_usuario = localStorage.getItem("id_usuario");
      if (!id_usuario) return;
  
      try {
        const response = await fetch(`http://localhost:3000/api/usuarios/${id_usuario}`);
        const data = await response.json();
        if (data?.data) {
          setFormData({
            id_usuario: data.data.Id_usuario,
            nombre: data.data.nombre,
            apellido: data.data.apellido,
            correo: data.data.email,
            contrasenia: data.data.contrasenia,
          });
        }
        console.log("Datos del usuario obtenidos:", data.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  // Form state
  const [formData, setFormData] = useState({
    id_usuario: "",
    nombre: "",
    apellido: "",
    correo: "",
    contrasenia: "",
  })

  // UI state
  const [isEditable, setIsEditable] = useState({
    nombre: false,
    apellido: false,
    correo: false,
    contrasenia: false,
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
        error = t("noEmail")
      }
    } else if (name === "password" && isEditable.password) {
      if (value.length < 8) {
        error = t("8carac")
      }
    } else if (name === "username") {
      if (value.length < 3) {
        error = t("usercarac")
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
      } catch (error) {
        console.error("Error updating profile:", error)
        setErrors((prev) => ({ ...prev, general: t("profileNoUpdated") }))
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
      setErrors((prev) => ({ ...prev, general: t("accountDeleteError") }))
      setShowDeleteConfirm(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AccessibilityProvider>
            <AccesibilidadButton/>

    <div className="w-full min-h-screen">
      <img src={imagen1} alt = "Fondo" className="absolute inset-0 w-full h-full object-cover blur-sm"/>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fillRule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fillOpacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;4&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      {/* Content above the pattern */}
      <div className="flex flex-col md:flex-row w-full min-h-screen relative z-20">
        {/* Left partition (empty or decorative) */}
        <div className="hidden md:block w-1/5 p-8"></div>

        {/* Central partition */}
        <div className="w-full md:w-3/5">

          <div className="flex flex-col items-center justify-center mt-24">
            {/* Profile header */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <UserCircleIcon className="w-32 h-32 text-[#003049] drop-shadow-sm" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#003049] to-[#003049] rounded-full opacity-40"></div>
              </div>
              <h1 className="mt-4 text-3xl font-bold text-slate-800">{t("myProfile")}</h1>
              <p className="text-slate-600 text-sm">{t("text3")}</p>
            </div>

            {/* Profile form */}
            <div className="w-full max-w-md">
              <div className="bg-[#003049] backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username field */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="username" className="block mb-2 text-sm text-white font-bold">
                      {t("user")}
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.id_usuario}
                      readOnly={!isEditable.id_usuario}
                      onChange={handleChange}
                      placeholder={t("yourUser")}
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.username ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.username ? "bg-white" : "bg-gray-100"
                      }`}
                    />
                    
                  {errors.username && <p className="text-red-300 text-xs mt-1">{errors.username}</p>}
                  </div>
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="nombre" className="block mb-2 text-sm text-white font-bold">
                      {t("name")}
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      name="correo"
                      value={formData.nombre}
                      readOnly={!isEditable.nombre}
                      onChange={handleChange}
                      placeholder="nombre"
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.email ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.email ? "bg-white" : "bg-gray-100"
                      }`}
                    />
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleEditClick("nombre")}
                      role="button"
                      aria-label="Editar nombre"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleEditClick("nombre")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </div>
                    {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="apellido" className="block mb-2 text-sm text-white font-bold">
                      {t("lastname")}
                    </label>
                    <input
                      id="apellido"
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      readOnly={!isEditable.apellido}
                      onChange={handleChange}
                      placeholder="nombre"
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.email ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.apellido ? "bg-white" : "bg-gray-100"
                      }`}
                    />
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleEditClick("apellido")}
                      role="button"
                      aria-label="Editar apellido"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleEditClick("email")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </div>
                    {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Email field */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="Correo" className="block mb-2 text-sm text-white font-bold">
                      Email
                    </label>
                    <input
                      id="correo"
                      type="email"
                      name="correo"
                      value={formData.correo}
                      readOnly={!isEditable.correo}
                      onChange={handleChange}
                      placeholder="Correo"
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.email ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.email ? "bg-white" : "bg-gray-100"
                      }`}
                    />
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleEditClick("email")}
                      role="button"
                      aria-label="Editar email"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleEditClick("email")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-bold text-white">
                      {t("password")}
                    </label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.contrasenia}
                      readOnly={!isEditable.contrasenia}
                      onChange={handleChange}
                      placeholder={t("yourPass")}
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.password ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.password ? "bg-white" : "bg-gray-100"
                      }`}
                    />
                      {isEditable.password && (
                        <div
                          className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                          role="button"
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          tabIndex={0}
                          onKeyDown={(e) => e.key === "Enter" && setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-500 mt-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-500 mt-5" />
                          )}
                          <button
                            type="button"
                            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            onClick={() => handleEditClick("password")}
                            aria-label="Editar contraseña"
                          >
                            <PencilSquareIcon className="h-5 w-5 text-slate-400 hover:text-blue-600" />
                          </button>
                       </div>)}
                    
                    {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password}</p>}
                  </div>

                  {/* General error message */}
                  {errors.general && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium">
                      {errors.general}
                    </div>
                  )}

                  {/* Success message */}
                  {successMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium">
                      {successMessage}
                    </div>
                  )}

                  {/* Update button */}
                  <button
                    type="submit"
                    disabled={isLoading || (!isEditable.username && !isEditable.email && !isEditable.password)}
                    className="w-[350px] rounded-md grid ml-4 bg-[#FCBF49] font-bold py-3 px-6 border border-transparent text-center text-sm text-[#003049] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FCBF49]/85 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
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
                      t("updateProfile")
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right partition - Delete account */}
        <div className="w-full md:w-1/5">
          <div className="mt-10 flex flex-col items-center justify-start min-h-screen">
            {!showDeleteConfirm ? (
              <button
                type="button"
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 transform hover:scale-105"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isLoading}
              >
                {t("delete")}
              </button>
            ) : (
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 max-w-xs">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{t("askconfirmation")}</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {t("textConfirmation")}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isLoading}
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
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
                        {t("removing")}
                      </span>
                    ) : (
                      t("confirmation")
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </AccessibilityProvider>
  )
}
