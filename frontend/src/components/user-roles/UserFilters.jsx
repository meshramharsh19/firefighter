import React, { useEffect, useState } from "react";

export default function UserFilters({ isDark, roles, filters, setFilters }) {
  const [stations, setStations] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // 🔥 FETCH STATIONS SAFELY
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch(`${API_BASE}/admin/station/get_stations.php`);
        const data = await res.json();

        // Handle BOTH response formats
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

  const base = `
    px-4 py-3 pr-10 rounded-lg border outline-none transition-all duration-200
    appearance-none
    hover:border-red-500
    focus:border-red-500 focus:ring-2 focus:ring-red-500/40
    ${isDark ? "bg-[#0f1114] text-white" : "bg-white text-black"}
  `;

  const DropdownIcon = () => (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white-500"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      <input
        className={base}
        placeholder="Search Name"
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />

      {/* 🔥 STATION FILTER */}
      <div className="relative">
        <select
          className={base}
          onChange={(e) => setFilters({ ...filters, station: e.target.value })}
        >
          <option value="">All Stations</option>

          {stations.map((s, i) => {
            const name = typeof s === "string" ? s : s.name;
            const key = typeof s === "string" ? i : s.id;

            return (
              <option key={key} value={name}>
                {name}
              </option>
            );
          })}
        </select>
        <DropdownIcon />
      </div>

      {/* ROLE */}
      <div className="relative">
        <select
          className={base}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <DropdownIcon />
      </div>

      {/* STATUS */}
      <div className="relative">
        <select
          className={base}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <DropdownIcon />
      </div>

      {/* SORT */}
      <div className="relative">
        <select
          className={base}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
        >
          <option value="">Sort By</option>
          <option value="id_asc">ID ↑</option>
          <option value="id_desc">ID ↓</option>
        </select>
        <DropdownIcon />
      </div>
    </div>
  );
}
