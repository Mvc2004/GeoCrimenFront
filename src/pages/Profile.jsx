import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PencilSquareIcon, UserCircleIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import imagen1 from "../images/imgfondo/perfil.jpg";

export default function Profile() {
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
        error = "Email inválido"
      }
    } else if (name === "password" && isEditable.password) {
      if (value.length < 8) {
        error = "La contraseña debe tener al menos 8 caracteres"
      }
    } else if (name === "username") {
      if (value.length < 3) {
        error = "El nombre de usuario debe tener al menos 3 caracteres"
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
        setSuccessMessage("Perfil actualizado correctamente")
        setTimeout(() => setSuccessMessage(""), 3000) // Clear after 3 seconds

        // Reset editable states
        setIsEditable({
          username: false,
          email: false,
          password: false,
        })
      } catch (error) {
        console.error("Error updating profile:", error)
        setErrors((prev) => ({ ...prev, general: "Error al actualizar el perfil" }))
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
      setErrors((prev) => ({ ...prev, general: "Error al eliminar la cuenta" }))
      setShowDeleteConfirm(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-cover bg-center relative bg-opacity backdrop-blur-lg">
      {/* Background image with optimization */}
        <img
          src={imagen1}
          alt="Fondo"
          className="absolute inset-0 w-full h-full object-cover blur-md"/>        
        <div className="absolute inset-0 bg-blue-50 z-0"></div>
      

      {/* Content above the image */}
      <div className="flex flex-col md:flex-row w-full min-h-screen relative z-20">
        {/* Left partition (empty or decorative) */}
        <div className="hidden md:block w-1/5 p-8"></div>

        {/* Central partition */}
        <div className="w-full md:w-3/5">
          <div className="flex flex-col items-center justify-center h-screen">
            {/* Profile header */}
            <div className="flex flex-col items-center">
              <span className="text-black text-4xl">
                <UserCircleIcon className="w-40 text-[#003049]" />
              </span>
            </div>

            {/* Profile form */}
            <div className="mt-10 relative flex flex-col rounded-xl bg-[#003049] p-5 shadow-lg">
              <form className="w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                  {/* Username field */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="username" className="block mb-2 text-sm text-white font-bold">
                      Usuario
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.username}
                      readOnly={!isEditable.username}
                      onChange={handleChange}
                      placeholder="Nombre de usuario"
                      className={`w-full bg-white placeholder:text-gray-400 text-gray-700 text-sm border ${
                        errors.username ? "border-red-500" : "border-gray-500"
                      } rounded-md px-3 py-2 pr-10 shadow-sm focus:outline-none ${
                        isEditable.username ? "bg-white" : "bg-gray-100"
                      }`}
                    />
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleEditClick("username")}
                      role="button"
                      aria-label="Editar nombre de usuario"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleEditClick("username")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </div>
                    {errors.username && <p className="text-red-300 text-xs mt-1">{errors.username}</p>}
                  </div>

                  {/* Email field */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="email" className="block mb-2 text-sm text-white font-bold">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly={!isEditable.email}
                      onChange={handleChange}
                      placeholder="Email"
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
                    {errors.email && <p className="text-red-300 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Password field */}
                  <div className="w-full max-w-sm min-w-[200px] relative">
                    <label htmlFor="password" className="block mb-2 text-sm text-white font-bold">
                      Contraseña
                    </label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      readOnly={!isEditable.password}
                      onChange={handleChange}
                      placeholder="Contraseña"
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
                      </div>
                    )}
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                      onClick={() => handleEditClick("password")}
                      role="button"
                      aria-label="Editar contraseña"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === "Enter" && handleEditClick("password")}
                    >
                      <PencilSquareIcon className="h-6 w-6 text-gray-500 mt-5" />
                    </div>
                    {errors.password && <p className="text-red-300 text-xs mt-1">{errors.password}</p>}
                  </div>
                </div>

                {/* General error message */}
                {errors.general && (
                  <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md text-center text-sm">
                    {errors.general}
                  </div>
                )}

                {/* Success message */}
                {successMessage && (
                  <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center text-sm">
                    {successMessage}
                  </div>
                )}

                {/* Update button */}
                <button
                  type="submit"
                  disabled={isLoading || (!isEditable.username && !isEditable.email && !isEditable.password)}
                  className="mt-8 mx-auto block w-[110px] rounded-md bg-[#FCBF49] font-bold py-2 border border-transparent text-center text-sm text-[#003049] transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#FCBF49]/85 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#003049]"
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
                      Actualizando
                    </span>
                  ) : (
                    "Actualizar"
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
                className="w-[130px] bg-[#D62828] text-white font-bold py-2 rounded-md text-center text-sm transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#D62828]/85"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isLoading}
              >
                Eliminar Cuenta
              </button>
            ) : (
              <div className="bg-white p-4 rounded-md shadow-md">
                <p className="text-sm text-gray-800 mb-3">
                  ¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-400 transition-colors"
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isLoading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="bg-[#D62828] text-white px-3 py-1 rounded-md text-sm hover:bg-red-700 transition-colors"
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
                        Eliminando
                      </span>
                    ) : (
                      "Confirmar"
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
