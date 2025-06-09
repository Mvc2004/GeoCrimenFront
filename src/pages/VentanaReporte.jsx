import { useEffect, useRef, useState } from "react";
import { XMarkIcon, VideoCameraIcon, PhotoIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';


function ReporteModal({ initialData, onClose, onSubmit }) {

  const { t, i18n } = useTranslation();
  const [reportData, setReportData] = useState({
    crimeType: "",
    date: "",
    location: "",
    descripcion: "",
  });
  const [mediaFiles, setMediaFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  useEffect(() => {
    if (initialData) {
      // Split datetime if it exists
      let date = initialData.date
      let time = ""

      if (initialData.date && initialData.date.includes("T")) {
        const [datePart, timePart] = initialData.date.split("T")
        date = datePart
        time = timePart.substring(0, 5) // Get HH:MM from time part
      }

      setReportData({
        crimeType: initialData.crimeType || "",
        date: date || "",
        time: time || "",
        location: initialData.location || "",
        descripcion: initialData.descripcion || "",
      })
      setMediaFiles(initialData.media || [])
    }
  }, [initialData])

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
        setReportData({
        crimeType: "",
        date: "",
        time: "",
        location: "",
        descripcion: "",
        })
        setMediaFiles([])
        onClose()
    }

const handleReport = async () => {
  console.log("Datos del reporte:");
  if (
    !reportData.crimeType ||
    !reportData.date ||
    !reportData.location ||
    !reportData.descripcion
  ) {
    alert(t("reportRequired"));
    return;
  }
const combinedDateTime = reportData.time
      ? `${reportData.date}T${reportData.time}:00`
      : `${reportData.date}T00:00:00`

  const storedReports = JSON.parse(localStorage.getItem("communityReports")) || [];
  let updatedReports;

  const newReport = {
    ...reportData,
    date: combinedDateTime,
    media: mediaFiles,
    timestamp: initialData?.timestamp || new Date().toISOString(),
  };

  if (initialData) {
      // Editar reporte existente
      updatedReports = storedReports.map((r) => (r.timestamp === initialData.timestamp ? newReport : r))
    } else {
      // Crear nuevo reporte
      updatedReports = [newReport, ...storedReports]
    }

  //localStorage.setItem("communityReports", JSON.stringify(updatedReports));

  alert(initialData ? t("reportUpdated") : t("reportCreated"));

  setReportData({
    crimeType: "",
    date: "",
    time: "",
    location: "",
    descripcion: "",
  });
  setMediaFiles([]);
  onClose();

  if (onSubmit) {
    onSubmit(newReport);
  }
};
const getLocation = () => {
    if (!navigator.geolocation) {
      alert(t("noGeolocation"))
      return
    }

setIsGettingLocation(true)
    const apiKey = "590f7aa7ad8496782ccda3353b3c6e4";
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //const { latitude, longitude } = position.coords
        const latitude = 4.081200;
        const longitude = -76.192800;
        console.log("Ubicación obtenida:", latitude, longitude);
        // Attempt to get address from coordinates using Nominatim (OpenStreetMap)
        //fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=es`)
        fetch(`http://localhost:3000/api/geocoding?lat=${latitude}&lng=${longitude}`)
        .then((response) => response.json())
          .then((data) => {
            if (data && data.address) {
              setReportData((prev) => ({
                ...prev,
                location: data.address,
                latitude,
                longitude,
              }));
            } else {
              alert("No se pudo encontrar la dirección exacta");
            }
          })
          .catch((error) => {
            console.error("Error al obtener dirección:", error);
            alert("Error al obtener la dirección desde el backend");
          })
          .finally(() => {
            setIsGettingLocation(false);
          });
      },
      (error) => {

        console.error("Error al obtener ubicación:", error);
        alert(t("location"));
      }
    );
  }

  const handleMediaUpload = (file, tipo) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setMediaFiles((prev) => [
        ...prev,
        {
          file,
          base64: event.target.result,
          type: tipo === "imagen" ? "image" : "video",
          tipoArchivoId: tipo === "imagen" ? 1 : 2,
        },
      ]);
    };
    reader.readAsDataURL(file);
  };
  

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
      <form className="relative w-[700px] mb-4 border-white/50 rounded-lg bg-white/90">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-[10px] hover:bg-gray-300 rounded-md text-sm w-8 h-8 flex justify-center items-center"
        >
          <XMarkIcon className="w-7 h-7 text-gray-500" />
        </button>

        <div className="px-4 py-4">
          <h2 className="text-xl font-bold text-gray-500 mb-4 text-center">{t("anonimoReport")}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="crimeType" className="block text-sm text-gray-500 font-medium mb-1">{t("crimeType")}</label>
              <select
                id="crimeType"
                value={reportData.crimeType}
                onChange={handleInputChange}
                className="w-full p-2 text-md border border-gray-300 rounded-md bg-white/80"
                required
              >
                <option value="">{t("selectType")}</option>
                <option value="hurto">{t("robbery")}</option>
                <option value="homicidio">{t("homicide")}</option>
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm text-gray-500 font-medium mb-1">{t("date")}</label>
              <input
                id="date"
                type="date"
                value={reportData.date}
                onChange={handleInputChange}
                className="w-full p-2 text-md border border-gray-300 rounded-md bg-white/80"
                required
              />
            </div>
            <div>
                <label htmlFor="time" className="block text-sm text-gray-500 font-medium mb-1">
                  {t("hour")}
                </label>
                <input
                  id="time"
                  type="time"
                  value={reportData.time}
                  onChange={handleInputChange}
                  className="w-full p-2 text-md border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm text-gray-500 font-medium mb-1">{t("ubication")}</label>
            <div className="flex">
              <input
                id="location"
                type="text"
                value={reportData.location}
                onChange={handleInputChange}
                placeholder={t("enterAddress")}
                className="w-full p-2 text-sm border border-gray-300 rounded-l-md bg-white/80"
                required
              />
              <button
                  type="button"
                  onClick={getLocation}
                  className="px-3 bg-gray-200 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-300 flex items-center"
                  disabled={isGettingLocation}
                >
                  {isGettingLocation ? (
                    <div className="w-5 h-5 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <MapPinIcon className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              </div>
              {reportData.latitude && (
              <p className="text-xs text-gray-500 mt-1">
                Coordenadas: {reportData.latitude.toFixed(6)}, {reportData.longitude.toFixed(6)}
              </p>
            )}
          </div>

          <div className="mb-4">

            <label htmlFor="descripcion" className="block text-sm font-medium mb-1">{t("description")}</label>
            <textarea
              id="descripcion"
              value={reportData.descripcion}
              onChange={handleInputChange}
              rows="4"
              placeholder={t("describeIncident")}
              className="w-full p-2 text-sm border border-gray-300 rounded-md bg-white/80"
              required
            ></textarea>
          </div>

          {mediaFiles.length > 0 && (
            <div className="mb-4">

              <label className="block text-sm font-medium mb-2">{t("evidence")}</label>
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
                  {t("cancel")}
                </button>
                <button
                  type="button"
                  onClick={handleReport}
                  className="inline-flex items-center py-2.5 px-4 text-xs font-bold text-center text-white bg-[#003049] rounded-lg focus:ring-4 focus:ring-gray-700 hover:bg-gray-700"
                >
                  {t("submit")}
                </button>
              </div>

          <div className="flex space-x-3">
            {/* Botón para subir imagen */}
            <label className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md cursor-pointer">
              <PhotoIcon className="w-5 h-5 text-black" />
              <span className="text-sm text-black">Imagen</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e.target.files[0], "imagen")}
              />
            </label>

            {/* Botón para subir video */}
            <label className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md cursor-pointer">
              <VideoCameraIcon className="w-5 h-5 text-black" />
              <span className="text-sm text-black">Video</span>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleMediaUpload(e.target.files[0], "video")}
              />
            </label>
          </div>
        </div>

        <div className="px-3 py-2 bg-white/40 rounded-b-lg">
          <p className="text-xs text-gray-600">
            <strong>{t("100")}</strong>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ReporteModal;