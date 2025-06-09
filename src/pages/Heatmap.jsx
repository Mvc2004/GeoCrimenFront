import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.heat";

const centerTulua = [4.0847, -76.1954];

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    }).addTo(map);

    return () => heat.remove();
  }, [map, points]);

  return null;
};

function Heatmap() {
  const [heatmapPoints, setHeatmapPoints] = useState([]);
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/reportes/reportesAprobados")
      .then((res) => res.json())
      .then((data) => {
        const reportesValidos = data.data.filter(r => r.ubi_lat && r.ubi_lng);
        setReportes(reportesValidos);

        const puntos = reportesValidos.map(r => [r.ubi_lat, r.ubi_lng]);
        setHeatmapPoints(puntos);
      })
      .catch((err) => {
        console.error("Error al obtener reportes aprobados:", err);
      });
  }, []);

  return (
    <MapContainer center={centerTulua} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatmapLayer points={heatmapPoints} />

      {reportes.map((r) => (
        <Marker key={r.id_reporte} position={[r.ubi_lat, r.ubi_lng]}>
          <Popup>
            <strong>Tipo:</strong> {r.id_crimen === 1 ? "Hurto" : r.id_crimen === 2 ? "Homicidio" : "Otro"}<br />
            <strong>Ubicación:</strong> {r.ubicacion_reporte}<br />
            <strong>Fecha:</strong> {new Date(r.fecha_reporte).toLocaleString("es-CO")}<br />
            <strong>Descripción:</strong><br />{r.descripcion}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Heatmap;
