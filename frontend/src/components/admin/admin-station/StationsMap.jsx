import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const stations = [
  { name: "Katraj Fire Station", lat: 21.1458, lng: 79.0882 },
  { name: "Civil Lines", lat: 21.1490, lng: 79.0801 },
];

export default function StationsMap() {
  return (
    <div className="bg-[#111418] p-4 rounded-xl border border-white/10">
      <MapContainer center={[21.1458, 79.0882]} zoom={13} className="h-[350px]">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {stations.map((s, i) => (
          <Marker key={i} position={[s.lat, s.lng]}>
            <Popup>{s.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
