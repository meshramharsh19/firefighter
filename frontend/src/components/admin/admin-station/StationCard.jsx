export default function StationCard({ station }) {
  return (
    <div className="bg-[#111418] border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6">

      {/* LEFT */}
      <div>
        <h2 className="text-xl font-semibold">{station.name}</h2>
        <p className="text-white/60">Station Code: {station.code}</p>
        <p className="text-white/60">City: {station.city}</p>
        <p className="text-white/60">Contact: {station.contact}</p>
      </div>

      {/* MIDDLE */}
      <div>
        <p className="text-sm text-white/60">Location</p>
        <p className="text-lg">{station.location}</p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-3">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            station.status === "Active"
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {station.status}
        </span>

        <div className="flex gap-2">
          <button className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10">
            View
          </button>
          <button className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
