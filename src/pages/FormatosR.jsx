import { useEffect, useState } from "react"
import ReporteModal from "./VentanaReporte"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  EllipsisVerticalIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon, 
  CheckIcon
} from "@heroicons/react/24/outline"

function FormatosR() {

  const [report, setReports] = useState([])
  const [activeIndexes, setActiveIndexes] = useState({}) // índice por reporte
  const [showDeleteConfirmIndex, setShowDeleteConfirmIndex] = useState(null)
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null)


  const deleteReport = (indexToDelete) => {
  const updatedReports = report.filter((_, i) => i !== indexToDelete)
  localStorage.setItem("communityReports", JSON.stringify(updatedReports))
  setReports(updatedReports)
  setShowDeleteConfirmIndex(null)
}

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("communityReports")) || []
    setReports(storedReports)

    // Inicializar índice 0 por cada reporte
    const initialIndexes = {}
    storedReports.forEach((_, i) => {
      initialIndexes[i] = 0
    })
    setActiveIndexes(initialIndexes)
  }, [])

  const handlePrev = (reportIndex, mediaLength) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [reportIndex]: (prev[reportIndex] - 1 + mediaLength) % mediaLength,
    }))
  }

  const handleNext = (reportIndex, mediaLength) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [reportIndex]: (prev[reportIndex] + 1) % mediaLength,
    }))
  }

  return (
    <div className="mt-10 space-y-6 overscroll-none overflow-y-auto max-h-[calc(100vh-99px)]">
      {report.length === 0 ? (
        <p className="text-center text-slate-600">No hay reportes disponibles.</p>
      ) : (
        <div className="grid gap-0">
          {report.map((reportItem, index) => {
            const media = reportItem.media || []
            const activeIndex = activeIndexes[index] || 0
            const activeMedia = media[activeIndex]

            return (
              <div
                key={index}
                className="p-4 border border-t-[#003049] border-b-[#003049]"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-black capitalize">
                    <strong>¡Atención Comunidad!</strong>
                  </span>
                  <span className="text-sm text-black ml-[550px] font-bold">{reportItem.date}</span>
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="inline-flex w-full justify-center rounded px-0 py-1 text-sm font-semibold text-black hover:bg-gray-200">
                        <EllipsisVerticalIcon aria-hidden="true" className="h-[22px] w-[22px] text-black" />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-50 origin-top-right rounded-md bg-white shadow-lg transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <div className="py-0">
                        <MenuItem>
                        {!showDeleteConfirmIndex &&(
                          <button
                            type="button"
                            onClick={() => deleteReport(index)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Eliminar
                          </button>
                        )}
                        </MenuItem>
                        <MenuItem>
                          <button
                            type="button"
                            onClick={() => {
                              setEditData(reportItem) // solo este reporte, no todos
                              setShowModal(true)
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Editar
                          </button>
                        
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>

                <span className="text-md text-black mb-2">
                  Se reporta un <strong className="capitalize">{reportItem.crimeType}</strong> en la dirección
                  <strong className="capitalize"> {reportItem.location}</strong>.
                </span>

                <p className="text-md text-black mb-2">Detalles de lo sucedido:</p>
                <p className="text-md text-black mb-2">{reportItem.description}</p>

                {/* Carrusel */}
                {media.length > 0 && (
                  <div className="mt-4 w-[600px] left-[138px] relative rounded-md overflow-hidden min-h-[240px]">
                    {activeMedia?.type === "image" ? (
                      <img
                        src={
                          activeMedia.base64.startsWith("data:image/")
                            ? activeMedia.base64
                            : `data:image/png;base64,${activeMedia.base64}`
                        }
                        alt={`Evidencia ${activeIndex + 1}`}
                        className="max-h-60 w-full object-contain rounded-md"
                      />
                    ) : (
                      <div className="relative w-full h-60 bg-red-800 rounded-md">
                        <video
                          controls
                          className="w-full h-full object-contain rounded-md"
                        >
                          <source src={activeMedia.base64} type="video/mp4" />
                          Tu navegador no soporta el video.
                        </video>
                        <VideoCameraIcon className="absolute top-2 left-2 w-6 h-6 text-black bg-white rounded-full p-1" />
                      </div>
                    )}

                    {/* Botones de navegación */}
                    <button
                      onClick={() => handlePrev(index, media.length)}
                      className="rounded-full absolute top-[95px] left-0 z-30 flex items-center justify-center w-[60px] h-[60px] px-4 hover:bg-gray-300 group"
                    >
                      <ChevronLeftIcon className="w-10 h-10 text-[#003049]" strokeWidth={4.5} />
                    </button>
                    <button
                      onClick={() => handleNext(index, media.length)}
                      className="rounded-full absolute top-[95px] right-0 z-30 flex items-center justify-center w-[60px] h-[60px] px-4 hover:bg-gray-300 group "
                    >
                      <ChevronRightIcon className="w-10 h-10 text-[#003049]" strokeWidth={4.5} />
                    </button>
                  </div>
                )}
                <div className="flex justify-between items-center mt-2">
                  <div className= "ml-[800px]">
                  <button className = "mr-2 px-1 py-1 rounded-md hover:bg-gray-300 transition duration-200">
                    <XMarkIcon className="h-5 w-5 text-[#D62828]" strokeWidth={4.5} />
                  </button>
                  <button
                    className = "px-1 py-1 rounded-md hover:bg-gray-300 transition duration-200">
                    <CheckIcon className="h-5 w-5 text-[#3ec46d]" strokeWidth={4.5} />
                  </button>
                  </div>
                </div>
                {showModal && (
                  <ReporteModal
                    initialData={editData}
                    onClose={() => setShowModal(false)}
                    onSubmit={(updatedReport) => {
                      const updatedReports = [...report]
                      const index = report.findIndex(
                        (r) => r.timestamp === updatedReport.timestamp
                      )

                      if (index !== -1) {
                        updatedReports[index] = updatedReport
                        localStorage.setItem("communityReports", JSON.stringify(updatedReports))
                        setReports(updatedReports)
                      }

                      setShowModal(false)
                    }}
                  />
                )}
              </div>

              
          
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FormatosR;
