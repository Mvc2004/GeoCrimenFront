import { useEffect, useRef, useState } from "react";
import { XMarkIcon, VideoCameraIcon, PhotoIcon } from "@heroicons/react/24/solid";

function ReporteModal({ initialData, onClose, onSubmit }) {
  const [reportData, setReportData] = useState({
    crimeType: "",
    date: "",
    location: "",
    description: "",
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setReportData({
        crimeType: initialData.crimeType,
        date: initialData.date,
        location: initialData.location,
        description: initialData.description,
      });
      setMediaFiles(initialData.media || []);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setReportData((prev) => ({ ...prev, [id]: value }));
  };

    useEffect(() => {
      return () => {
        mediaFiles.forEach((media) => URL.revokeObjectURL(media.preview))
      }
    }, [mediaFiles])
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => {
      const type = file.type.includes("image") ? "image" : "video";
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({ type, base64: event.target.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newFiles).then((results) => {
      setMediaFiles((prev) => [...prev, ...results]);
    });
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };
    const handleCancel = () => {
        setShowModal(false)
        setReportData({
        crimeType: "",
        date: "",
        location: "",
        description: "",
        })
        setImagePreview(null)
    }
const handleReport = async () => {
  if (
    !reportData.crimeType ||
    !reportData.date ||
    !reportData.location ||
    !reportData.description
  ) {
    alert("Por favor completa todos los campos requeridos.");
    return;
  }

  const storedReports = JSON.parse(localStorage.getItem("communityReports")) || [];
  let updatedReports;

  const newReport = {
    ...reportData,
    media: mediaFiles,
    timestamp: initialData?.timestamp || new Date().toISOString(),
  };

  if (initialData) {
    // Editar reporte existente
    updatedReports = storedReports.map((r) =>
      r.timestamp === initialData.timestamp ? newReport : r
    );
  } else {
    // Crear nuevo reporte
    updatedReports = [newReport, ...storedReports];
  }

  localStorage.setItem("communityReports", JSON.stringify(updatedReports));

  alert(initialData ? "Reporte actualizado con éxito." : "Reporte enviado con éxito.");

  setReportData({
    crimeType: "",
    date: "",
    location: "",
    description: "",
  });
  setMediaFiles([]);
  onClose();

  if (onSubmit) {
    onSubmit(newReport);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
      <form className="relative w-[700px] mb-4 border-white/50 rounded-lg bg-white/90">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-[10px] hover:bg-gray-300 rounded-md text-sm w-8 h-8 flex justify-center items-center"
        >
          <XMarkIcon className="w-7 h-7 text-black" />
        </button>

        <div className="px-4 py-4">
          <h2 className="text-xl font-bold mb-4 text-center">Reporte Anónimo de Delitos</h2>

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
                <option value="hurto">Hurto</option>
                <option value="homicidio">Homicidio</option>
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
              className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white/80"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium mb-1">Descripción</label>
            <textarea
              id="description"
              value={reportData.description}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white/80"
              required
            ></textarea>
          </div>

          {mediaFiles.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Evidencia adjunta</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mediaFiles.map((media, index) => (
                  <div key={index} className="relative group">
                    {media.type === "image" ? (
                      <img
                        src={media.base64}
                        alt={`Evidencia ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="h-24 w-full relative bg-gray-200 rounded-md flex items-center justify-center">
                        <VideoCameraIcon className="w-8 h-8 text-gray-500" />
                        <video
                          src={media.base64}
                          className="absolute inset-0 w-full h-full object-cover rounded-md opacity-0 group-hover:opacity-100"
                          controls
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-500">
          <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-white bg-[#D32F2F] rounded-lg hover:bg-[#B71C1C] focus:ring-4 focus:ring-red-300"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleReport}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-white bg-[#003049] rounded-lg focus:ring-4 focus:ring-gray-700 hover:bg-gray-700"
                >
                  Enviar reporte anónimo
                </button>
              </div>

          <div className="flex space-x-1">
            <input
              type="file"
              id="media-upload"
              ref={fileInputRef}
              accept="image/*,video/*"
              onChange={handleMediaChange}
              multiple
              className="hidden"
            />
            <label
              htmlFor="media-upload"
              className="inline-flex justify-center items-center p-2 text-gray-500 rounded-md hover:bg-gray-300"
            >
              <div className="flex items-center">
                <PhotoIcon className="w-6 h-6 text-black" />
                <VideoCameraIcon className="w-6 h-6 text-black ml-1" />
              </div>
            </label>
          </div>
        </div>

        <div className="px-3 py-2 bg-white/40 rounded-b-lg">
          <p className="text-xs text-gray-600">
            <strong>Reporte 100% anónimo:</strong> No recopilamos ninguna información personal ni datos que puedan identificarte.
          </p>
        </div>
      </form>
    </div>
  );
}

export default ReporteModal;
