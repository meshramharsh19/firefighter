import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LogsFilters({ filters, setFilters }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="grid md:grid-cols-3 gap-4">
        {/* SEARCH (auto apply) */}
        <Input
          className=" pl-10 bg-transparent border border-[#2E2E2E] rounded bg-[#141414] hover:border-red-700 focus-within:border-gray-300 text-white focus:outline-none focus:ring-0"
          placeholder="Search logs..."
          value={filters.search}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              search: e.target.value,
              page: 1, // reset pagination
            }))
          }
        />

        {/* MODULE FILTER (black background) */}
        <select
          value={filters.module}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              module: e.target.value,
              page: 1,
            }))
          }
          className="
            w-full p-2 rounded
            bg-[#141414] text-white
            border border-[#2E2E2E]
            focus:outline-none
            focus:border-gray-400
          "
        >
          <option value="all" className="bg-black text-white">
            All Modules
          </option>
          <option value="VEHICLE" className="bg-black text-white">
            Vehicle
          </option>
          <option value="USER" className="bg-black text-white">
            User
          </option>
          <option value="DRONE" className="bg-black text-white">
            Drone
          </option>
          <option value="INCIDENT" className="bg-black text-white">
            Incident
          </option>
        </select>
      </CardContent>
    </Card>
  );
}
