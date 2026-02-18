import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/station`;

function ChangeMapCenter({ station }) {
  const map = useMap();

  useEffect(() => {
    if (station) {
      map.setView([station.lat, station.lng], 15);
    }
  }, [station, map]);

  return null;
}

export default function StationsMap({ selectedStation }) {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const res = await fetch(`${API}/get_stations.php`);
      const data = await res.json();

      if (data.status) {
        setStations(data.stations);
      }
    } catch (err) {
      console.error("Map station fetch failed", err);
    }
  };

  return (
    <div className="bg-[#111418] p-4 rounded-xl border border-white/10">
      <MapContainer center={[18.5204, 73.8567]} zoom={12} className="h-[350px] rounded-lg">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {selectedStation && <ChangeMapCenter station={selectedStation} />}

        {stations.map((s) => (
          <Marker key={s.id} position={[s.lat, s.lng]}>
            <Popup>
              <strong>{s.name}</strong>
              <br />
              Code: {s.code}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
