import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

export default function AddStationModal({ onClose }) {
  const [lat, setLat] = useState(21.1458);
  const [lng, setLng] = useState(79.0882);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#0f1114] w-[90%] max-w-5xl rounded-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Add Station</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Station Name" className="input" />
          <input placeholder="Station Code" className="input" />
          <input placeholder="City" className="input" />
          <input placeholder="Contact Number" className="input" />

          <input value={lat} readOnly className="input" />
          <input value={lng} readOnly className="input" />
        </div>

        {/* MAP */}
        <div className="mt-4">
          <MapContainer
            center={[lat, lng]}
            zoom={14}
            className="h-[300px] rounded-lg"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <Marker
              draggable
              position={[lat, lng]}
              eventHandlers={{
                dragend: (e) => {
                  const p = e.target.getLatLng();
                  setLat(p.lat.toFixed(6));
                  setLng(p.lng.toFixed(6));
                },
              }}
            />
          </MapContainer>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 mt-4">
          <button
            disabled={loading}
            onClick={handleSave}
            className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700"
          >
            {loading ? "Saving..." : "Save Station"}
          </button>
          <button onClick={onClose} className="border px-5 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
