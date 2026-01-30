import { useState, useEffect } from "react";

const API = `${import.meta.env.VITE_API_BASE_URL}/admin/admin-drone-details`;

export default function PilotList({ station, selectedPilot, setSelectedPilot }) {
  const [pilots, setPilots] = useState([]);

  useEffect(() => {
    if (station) {
      fetch(`${API}/getPilotsByStation.php?station=${station}`)
        .then((res) => res.json())
        .then((data) => setPilots(data))
        .catch(() => console.error("Error fetching pilots"));
    }
  }, [station]);

  const getPilotStatusBadge = (status) => {
    return status === "assigned"
      ? "bg-red-600/20 text-red-500 border border-red-500/40"
      : "bg-emerald-600/20 text-emerald-500 border border-emerald-500/40";
  };

  return (
    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
      {pilots.map((p) => (
        <div
          key={p.id}
          onClick={() => p.pilot_status !== "assigned" && setSelectedPilot(p)}
          className={`
            flex justify-between items-center p-3 border rounded-lg transition
            ${p.pilot_status === "assigned" 
              ? "opacity-50 cursor-not-allowed" 
              : "cursor-pointer hover:bg-[#241510] hover:border-[#dc2626]"}
            ${selectedPilot?.id === p.id ? "border-[#dc2626] bg-[#241510]" : "border-[#2E2E2E]"}
          `}
        >
          <div>
            <p className="font-medium text-sm">{p.fullName}</p>
            <p className="text-xs text-muted-foreground">{p.designation}</p>
            <p className="text-xs text-muted-foreground">{p.phone}</p>
          </div>

          <span className={`px-2 py-1 text-[10px] rounded-md font-medium border ${getPilotStatusBadge(p.pilot_status)}`}>
            {p.pilot_status.toUpperCase()}
          </span>
        </div>
      ))}

      {pilots.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-4">No pilots available in this station.</p>
      )}
    </div>
  );
}