import { useEffect, useState } from "react"
import ReporteModal from "./VentanaReporte"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline"
import { CalendarIcon, MapPinIcon, ShieldExclamationIcon, VideoCameraIcon, HandRaisedIcon} from "@heroicons/react/24/outline"

//const [reports, setReports] = useState([]);

function FormatosR({ onEdit, reports = [], setReports }) {
  //const [report, setReports] = useState([])
  // const [activeIndexes, setActiveIndexes] = useState({}) // índice por reporte
  // const [showDeleteConfirmIndex, setShowDeleteConfirmIndex] = useState(null)
  // const [showModal, setShowModal] = useState(false)
  // const [editData, setEditData] = useState(null)
  // const [reports, setReports] = useState([]);

  const [activeIndexes, setActiveIndexes] = useState({})
  const [showDeleteConfirmIndex, setShowDeleteConfirmIndex] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState(null)

  useEffect(() => {
    const initialIndexes = {};
    reports.forEach((_, i) => {
      initialIndexes[i] = 0;
    });
    setActiveIndexes(initialIndexes);
  }, [reports]);

  const deleteReport = (indexToDelete) => {
    const updatedReports = reports.filter((_, i) => i !== indexToDelete)
    localStorage.setItem("communityReports", JSON.stringify(updatedReports))
    setReports(updatedReports)
    setShowDeleteConfirmIndex(null)
  }

  //nuevos metodos
  const aprobarReporte = async (id_reporte) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reportes/${id_reporte}/aprobar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //body: JSON.stringify(comentario),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al aprobar el reporte");
      }
      alert("Reporte aprobado");
    } catch (error) {
      console.error("Error al aprobar:", error);
    }
  };
  
  const rechazarReporte = async (id_reporte) => {
    try {
      const response = awaitfetch(`http://localhost:3000/api/reportes/${id_reporte}/rechazar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al rechazar el reporte");
      }
      alert("Reporte rechazado");
    } catch (error) {
      console.error("Error al rechazar:", error);
    }
  };

  // useEffect(() => {
  //   const storedReports = JSON.parse(localStorage.getItem("communityReports")) || []
  //   setReports(storedReports)

  //   // Inicializar índice 0 por cada reporte
  //   const initialIndexes = {}
  //   storedReports.forEach((_, i) => {
  //     initialIndexes[i] = 0
  //   })
  //   setActiveIndexes(initialIndexes)
  // }, [])

  // 
  
  // useEffect(() => {
  //   const fetchReports = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/api/reportes/reportesPendientes");
  //       const data = await response.json();
  //       if (response.ok) {
  //         setReports(data.data || []);
  //         const initialIndexes = {};
  //         (data.data || []).forEach((_, i) => {
  //           initialIndexes[i] = 0;
  //         });
  //         setActiveIndexes(initialIndexes);
  //       } else {
  //         console.error("Error al cargar reportes pendientes:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener reportes pendientes:", error);
  //     }
  //   };
  
  //   fetchReports();
  // }, []);
  

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

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""

    try {
      const date = new Date(dateString)

      // Check if date is valid
      if (isNaN(date.getTime())) return dateString

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }

      return date.toLocaleDateString("es-ES", options)
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString
    }
  }

  return (
    <div className="mt-6 space-y-6 overscroll-none overflow-y-auto max-h-[calc(100vh-99px)] px-4">
      {reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="bg-gray-100 rounded-full p-4 mb-4">
            <ShieldExclamationIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No hay reportes disponibles</h3>
          <p className="text-gray-500 max-w-md">
            Cuando la comunidad reporte incidentes, aparecerán aquí para mantener a todos informados.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reports.map((reportItem, index) => {
            const media = reportItem.media || []
            const activeIndex = activeIndexes[index] || 0
            const activeMedia = media[activeIndex]
            const formattedDate = formatDate(reportItem.fecha_reporte  || reportItem.date)

            return (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#003049] to-[#003f5c] px-5 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <HandRaisedIcon className="h-6 w-6 text-white mr-2" />
                    <span className="text-lg font-bold text-white">¡Atención Comunidad!</span>
                  </div>
                  <Menu as="div" className="relative">
                    <MenuButton className="inline-flex justify-center rounded-full p-2 text-white hover:bg-white/10 transition-colors">
                      <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                    </MenuButton>

                    <MenuItems className="absolute right-0 z-10 mt-1 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <MenuItem>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => {
                                setEditData(reportItem)
                                setShowModal(true)
                              }}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Editar
                            </button>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => deleteReport(index)}
                              className={`${
                                active ? "bg-gray-100" : ""
                              } flex w-full items-center px-4 py-2 text-sm text-red-600`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Eliminar
                            </button>
                          )}
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Info section */}
                  <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start">
                      <div className="bg-red-100 rounded-full p-2 mr-3">
                        <ShieldExclamationIcon className="h-8 w-8 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-0.5">Tipo de incidente</p>
                        <p className="text-md font-medium capitalize">{ reportItem.id_crimen == 1 ? 'Hurto': reportItem.id_crimen == 2 ? 'Homicidio' : 'otro'}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-blue-100 rounded-full p-2 mr-3">
                        <MapPinIcon className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-0.5">Ubicación</p>
                        <p className="text-md font-medium">{reportItem.ubicacion_reporte}</p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-start">
                      <div className="bg-amber-100 rounded-full p-2 mr-3">
                        <CalendarIcon className="h-8 w-8 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-0.5">Fecha y hora</p>
                        <p className="text-md font-medium">{new Date(reportItem.fecha_reporte).toLocaleString('es-CO', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</p>
                      </div>
                    </div>
                  </div>

                  {/* Descripcion */}
                  <div className="mt-5 mb-4">
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Detalles del delito:</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      {reportItem.descripcion}
                    </p>
                  </div>

                  {/* Media carousel */}
                  {media.length > 0 && (
                    <div className="relative rounded-lg overflow-hidden mb-4">
                      <div className=" bg-gray-50 aspect-video flex items-center justify-center rounded-lg border border-gray-100">
                      {media.length > 0 && (
                        <div className="relative rounded-lg overflow-hidden mb-4">
                          <div className="bg-gray-50 aspect-video flex items-center justify-center rounded-lg border border-gray-100">
                            {activeMedia.tipoArchivoId === 1 ? (
                              <img
                                src={activeMedia.url}
                                alt={`Evidencia ${activeIndex + 1}`}
                                className="max-h-[full] max-w-full object-contain"
                              />
                            ) : (
                            <div className="relative w-full h-full">
                              <video controls className="w-full h-full object-contain">
                              <source src={activeMedia.url} type="video/mp4" />
                                Tu navegador no soporta el video.
                              </video>
                              <VideoCameraIcon className="absolute top-2 left-2 w-6 h-6 text-white bg-black/50 rounded-full p-1" />
                            </div>
                            )}
                        </div>

                {/* Botones de navegación si hay más de 1 */}
                {media.length > 1 && (
                  <>
                    <button
                      onClick={() => handlePrev(index, media.length)}
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                      aria-label="Anterior"
                    >
                      <ChevronLeftIcon className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => handleNext(index, media.length)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                      aria-label="Siguiente"
                    >
                      <ChevronRightIcon className="w-5 h-5" strokeWidth={2.5} />
                    </button>

                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                    {media.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveIndexes((prev) => ({ ...prev, [index]: i }))}
                        className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-white" : "bg-white/50"}`}
                        aria-label={`Ir a media ${i + 1}`}
                      />
                    ))}
                  </div>
                      </>
                    )}
                  </div>
                )}
                  </div>
                      {/* Navigation buttons */}
                      {media.length > 1 && (
                        <>
                          <button
                            onClick={() => handlePrev(index, media.length)}
                            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                            aria-label="Anterior"
                          >
                            <ChevronLeftIcon className="w-5 h-5" strokeWidth={2.5} />
                          </button>
                          <button
                            onClick={() => handleNext(index, media.length)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
                            aria-label="Siguiente"
                          >
                            <ChevronRightIcon className="w-5 h-5" strokeWidth={2.5} />
                          </button>

                          {/* Indicators */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                            {media.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setActiveIndexes((prev) => ({ ...prev, [index]: i }))}
                                className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-white" : "bg-white/50"}`}
                                aria-label={`Ir a imagen ${i + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-end items-center mt-4 space-x-2">
                    <button 
                      onClick={() => rechazarReporte(reportItem.id_reporte)}
                      className="flex items-center px-3 py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                      <XMarkIcon className="h-4 w-4 mr-1" strokeWidth={2.5} />
                     
                    </button>
                    <button 
                      onClick={() => aprobarReporte(reportItem.id_reporte)}
                      className="flex items-center px-3 py-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-100 transition-colors">
                      <CheckIcon className="h-4 w-4 mr-1" strokeWidth={2.5} />
                      
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <ReporteModal
          initialData={editData}
          onClose={() => setShowModal(false)}
          onSubmit={(updatedReport) => {
            const updatedReports = [...reports]
            const index = reports.findIndex((r) => r.timestamp === updatedReport.timestamp)

            if (index !== -1) {
              updatedReports[index] = updatedReport
              //localStorage.setItem("communityReports", JSON.stringify(updatedReports))
              setReports(updatedReports)
            }

            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}

export default FormatosR
