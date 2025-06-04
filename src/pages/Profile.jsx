import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PencilSquareIcon, UserCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import imagen1 from "../images/imgfondo/perfil.jpg"
import { useTranslation } from 'react-i18next';



export default function Profile() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

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
          <div className="flex flex-col items-center justify-center min-h-screen py-12">
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
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-sm font-bold text-white">
                      {t("user")}
                    </label>
                    <div className="relative">
                      <input
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        readOnly={!isEditable.username}
                        onChange={handleChange}
                        placeholder={t("yourUser")}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          errors.username
                            ? "border-red-300 bg-red-50"
                            : isEditable.username
                              ? "border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-slate-200 bg-slate-50"
                        } text-slate-700 placeholder-slate-400 focus:outline-none`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                        onClick={() => handleEditClick("username")}
                        aria-label="Editar nombre de usuario"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-slate-400 hover:text-blue-600" />
                      </button>
                    </div>
                    {errors.username && <p className="text-red-500 text-xs font-medium">{errors.username}</p>}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-bold text-white">
                      {t("email")}
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly={!isEditable.email}
                        onChange={handleChange}
                        placeholder={t("yourEmail")}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          errors.email
                            ? "border-red-300 bg-red-50"
                            : isEditable.email
                              ? "border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-slate-200 bg-slate-50"
                        } text-slate-700 placeholder-slate-400 focus:outline-none`}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                        onClick={() => handleEditClick("email")}
                        aria-label="Editar email"
                      >
                        <PencilSquareIcon className="h-5 w-5 text-slate-400 hover:text-blue-600" />
                      </button>
                    </div>
                    {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
                  </div>

                  {/* Password field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-bold text-white">
                      {t("password")}
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        readOnly={!isEditable.password}
                        onChange={handleChange}
                        placeholder={t("yourPass")}
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                          errors.password
                            ? "border-red-300 bg-red-50"
                            : isEditable.password
                              ? "border-blue-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              : "border-slate-200 bg-slate-50"
                        } text-slate-700 placeholder-slate-400 focus:outline-none ${isEditable.password ? "pr-20" : "pr-12"}`}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                        {isEditable.password && (
                          <button
                            type="button"
                            className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          >
                            {showPassword ? (
                              <EyeSlashIcon className="h-5 w-5 text-slate-400 hover:text-blue-600" />
                            ) : (
                              <EyeIcon className="h-5 w-5 text-slate-400 hover:text-blue-600" />
                            )}
                          </button>
                        )}
                        <button
                          type="button"
                          className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                          onClick={() => handleEditClick("password")}
                          aria-label="Editar contraseña"
                        >
                          <PencilSquareIcon className="h-5 w-5 text-slate-400 hover:text-blue-600" />
                        </button>
                      </div>
                    </div>
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
  )
}
