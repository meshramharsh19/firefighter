import React, { useEffect, useState, useRef } from "react";

export default function UserFilters({ isDark, roles, filters, setFilters }) {
  const [stations, setStations] = useState([]);
  const [stationSearch, setStationSearch] = useState("");
  const [stationOpen, setStationOpen] = useState(false);
  const dropdownRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/station/get_stations.php`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setStations(data);
        } else if (Array.isArray(data.stations)) {
          setStations(data.stations);
        } else {
          setStations([]);
        }
      } catch (error) {
        console.error("Failed to fetch stations", error);
        setStations([]);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setStationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStations = stations.filter((s) => {
    const name = typeof s === "string" ? s : s.name;
    return name.toLowerCase().includes(stationSearch.toLowerCase());
  });

  const baseInput = `
    px-4 py-3 rounded-lg border outline-none transition-all duration-200
    hover:border-red-500
    focus:border-red-500 focus:ring-2 focus:ring-red-500/40
    ${isDark ? "bg-[#0f1114] text-white border-gray-700" : "bg-white text-black border-gray-300"}
  `;

  return (
    <div className="flex gap-4 mb-4 flex-wrap">

      <input
        className={baseInput}
        placeholder="Search Name"
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />

      <div className="relative w-64" ref={dropdownRef}>
        <div
          onClick={() => setStationOpen(!stationOpen)}
          className={`${baseInput} cursor-pointer flex justify-between items-center`}
        >
          <span>
            {filters.station || "All Stations"}
          </span>
          <span>▼</span>
        </div>

        {stationOpen && (
          <div
            className={`absolute z-50 mt-1 w-full rounded-lg border shadow-lg ${
              isDark ? "bg-[#0f1114] border-gray-700" : "bg-white border-gray-300"
            }`}
          >
            <input
              type="text"
              placeholder="Search station..."
              className={`w-full px-3 py-2 border-b outline-none ${
                isDark
                  ? "bg-[#0f1114] text-white border-gray-700"
                  : "bg-white text-black border-gray-200"
              }`}
              value={stationSearch}
              onChange={(e) => setStationSearch(e.target.value)}
            />

            <div className="max-h-48 overflow-y-auto">
              <div
                onClick={() => {
                  setFilters({ ...filters, station: "" });
                  setStationOpen(false);
                }}
                className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
              >
                All Stations
              </div>

              {filteredStations.length === 0 && (
                <div className="px-4 py-2 text-gray-400">
                  No stations found
                </div>
              )}

              {filteredStations.map((s, i) => {
                const name = typeof s === "string" ? s : s.name;
                const key = typeof s === "string" ? i : s.id;

                return (
                  <div
                    key={key}
                    onClick={() => {
                      setFilters({ ...filters, station: name });
                      setStationOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <select
        className={baseInput}
        onChange={(e) => setFilters({ ...filters, role: e.target.value })}
      >
        <option value="">All Roles</option>
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        className={baseInput}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <select
        className={baseInput}
        onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
      >
        <option value="">Sort By</option>
        <option value="id_asc">ID ↑</option>
        <option value="id_desc">ID ↓</option>
      </select>

    </div>
  );
}
