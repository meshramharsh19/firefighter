export default function StationFilters({ filters, setFilters }) {
  return (
    <div className="bg-[#111418] border border-white/10 rounded-xl p-6 mb-8">

      <h3 className="text-lg font-semibold mb-4">Filters & Search</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* SEARCH */}
        <div>
          <label className="block text-sm mb-1">Search</label>
          <div className="relative">
            <input
              placeholder="Search by station name, code, city"
              className="w-full bg-black border border-white/20 rounded-lg pl-10 py-2"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <span className="absolute left-3 top-2.5 text-white/50">🔍</span>
          </div>
        </div>

        {/* STATUS */}
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            className="w-full bg-black border border-white/20 rounded-lg py-2 px-3"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* CITY */}
        <div>
          <label className="block text-sm mb-1">City</label>
          <select
            className="w-full bg-black border border-white/20 rounded-lg py-2 px-3"
            value={filters.city}
            onChange={(e) =>
              setFilters({ ...filters, city: e.target.value })
            }
          >
            <option>All</option>
            <option>Nagpur</option>
            <option>Pune</option>
          </select>
        </div>
      </div>
    </div>
  );
}
