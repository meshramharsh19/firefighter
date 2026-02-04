export default function StationCard({ station, onViewMap, onEditStation }) {
  return (
    <div className="bg-[#111418] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6 hover:border-red-500/40 transition">

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">{station.name}</h2>
        <p className="text-white/60 text-sm">Station Code: {station.code}</p>
        <div className="flex gap-4 text-sm text-white/60">
          <p>Lat: {station.lat}</p>
          <p>Lng: {station.lng}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="bg-red-600/10 text-red-400 px-4 py-2 rounded-lg text-sm border border-red-600/20">
          Fire Station • Pune Zone
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <span className="px-3 py-1 rounded-full text-sm bg-green-600/20 text-green-400">
          Active
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onViewMap && onViewMap(station)}
            className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            View on Map
          </button>

          <button
            onClick={() => onEditStation && onEditStation(station)}
            className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
