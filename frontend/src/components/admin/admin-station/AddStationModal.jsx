import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { toast } from "react-hot-toast";

function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], 14);
    setTimeout(() => map.invalidateSize(), 200);
  }, [lat, lng, map]);

  return null;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/station`;

export default function AddStationModal({ onClose, stationData }) {
  const isEditMode = !!stationData;

  const [stationName, setStationName] = useState("");
  const [code, setCode] = useState("");
  const [lat, setLat] = useState(18.5064749);
  const [lng, setLng] = useState(73.868444);
  const [loading, setLoading] = useState(false);

  // Prefill when editing
  useEffect(() => {
    if (stationData) {
      setStationName(stationData.name);
      setCode(stationData.code);
      setLat(parseFloat(stationData.lat));
      setLng(parseFloat(stationData.lng));
    }
  }, [stationData]);

  const searchLocation = async (name) => {
    if (!name || name.length < 2) return;

    try {
      const res = await fetch(
        `${API}/pune_fire_stations.php?q=${encodeURIComponent(name)}`,
      );
      const data = await res.json();

      if (data.length > 0) {
        setLat(parseFloat(data[0].lat));
        setLng(parseFloat(data[0].lng));
      }
    } catch (err) {
      console.error(err);
      toast.error("Station search failed");
    }
  };

  const handleSave = async () => {
    if (!stationName || !code) {
      toast.error("Station name and code required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        stationName,
        code,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };

      // Only send ID in edit mode
      if (stationData?.id) {
        payload.id = stationData.id;
      }

      const res = await fetch(
        `${API}/${stationData ? "update_station.php" : "add_station.php"}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (data.status) {
        toast.success(stationData ? "Station updated" : "Station added");
        onClose();
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70  flex justify-center items-center z-[9999]">
      <div className="bg-[#0f1114] w-[95%] max-w-5xl rounded-2xl p-6 shadow-2xl border border-gray-800 relative z-[10000]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-white">
            {isEditMode ? "Edit Station" : "Add Station"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            placeholder="Station Name"
            value={stationName}
            onChange={(e) => {
              const value = e.target.value;
              setStationName(value);
              searchLocation(value);
            }}
            className="bg-[#1a1d21] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-red-500"
          />

          <input
            placeholder="Station Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            readOnly={isEditMode}
            className={`bg-[#1a1d21] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-red-500 ${
              isEditMode ? "opacity-60 cursor-not-allowed" : ""
            }`}
          />

          <input
            value={lat}
            readOnly
            className="bg-[#111317] border border-gray-800 p-3 rounded-lg text-gray-400"
          />
          <input
            value={lng}
            readOnly
            className="bg-[#111317] border border-gray-800 p-3 rounded-lg text-gray-400"
          />
        </div>

        <div className="mt-2 relative z-[10001]">
          <MapContainer
            center={[lat, lng]}
            zoom={14}
            className="h-[320px] rounded-xl overflow-hidden border border-gray-800"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RecenterMap lat={lat} lng={lng} />
            <Marker
              draggable
              position={[lat, lng]}
              eventHandlers={{
                dragend: (e) => {
                  const p = e.target.getLatLng();
                  setLat(p.lat);
                  setLng(p.lng);
                },
              }}
            />
          </MapContainer>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSave}
            className="bg-red-600 px-6 py-2 rounded-lg text-white font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
                ? "Update Station"
                : "Save Station"}
          </button>
        </div>
      </div>
    </div>
  );
}
