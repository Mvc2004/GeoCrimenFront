"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PhotoIcon } from "@heroicons/react/24/solid"

function Reports() {
  const [reportData, setReportData] = useState({
    crimeType: "",
    date: "",
    location: "",
    description: ""
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setReportData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleReport = (e) => {
    e.preventDefault()
    if (reportData.description.trim()) {
      alert("Reporte anónimo enviado con éxito.")
      setReportData({
        crimeType: "",
        date: "",
        location: "",
        description: ""
      })
      setImage(null)
      setImagePreview(null)
    } else {
      alert("La descripción del reporte no puede estar vacía.")
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-white via-gay-400 to-gray-500 p-6">
      <form onSubmit={handleReport}>
        <div className="w-[900px] mt-[150px] ml-[300px] mb-4 border-white/50 rounded-lg bg-white/70">
          <div className="px-4 py-4 bg-white/50 rounded-t-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Reporte Anónimo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="crimeType" className="block text-sm font-medium mb-1">Tipo de Crimen</label>
                <select 
                  id="crimeType" 
                  value={reportData.crimeType}
                  onChange={handleInputChange}
                  className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white/80"
                  required
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="robo">Robo</option>
                  <option value="asalto">Asalto</option>
                  <option value="vandalismo">Vandalismo</option>
                  <option value="fraude">Fraude</option>
                  <option value="hurto">Hurto</option>
                  <option value="homicidio">Homicidio</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">Fecha del Incidente</label>
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
              <label htmlFor="location" className="block text-sm font-medium mb-1">Ubicación</label>
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
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Descripción</label>
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
          </div>

          {imagePreview && (
            <div className="px-4 py-2 bg-white/30">
              <div className="relative inline-block">
                <img src={imagePreview || "/placeholder.svg"} alt="Vista previa" className="max-h-40 rounded-md" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between px-3 py-2 border-t border-gray-500">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-gray-700 dark:focus:ring-gray-900 hover:bg-gray-700"
            >
              Enviar reporte anónimo
            </button>
            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <label
                htmlFor="file-upload"
                className="inline-flex justify-center items-center p-2 text-gray-500 rounded-md cursor-pointer hover:bg-gray-400"
              >
                <PhotoIcon className="w-6 h-6 text-black" />
                <span className="sr-only">Subir evidencia</span>
                <input id="file-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          <div className="px-3 py-2 bg-white/40 rounded-b-lg">
            <p className="text-xs text-gray-600">
              <strong>Reporte 100% anónimo:</strong> No recopilamos ninguna información personal ni datos que puedan
              identificarte.
            </p>
          </div>
        </div>
      </form>

      {/* Botón Cancelar */}
      <div className="flex justify-between items-center px-6 pb-4">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[#D32F2F]/90 text-black font-bold rounded-md focus:ring-4 focus:ring-red-700 dark:focus:ring-red-800 hover:bg-red-700"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default Reports
