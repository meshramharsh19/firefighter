import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LogsFilters({ filters, setFilters }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>

      <CardContent className="grid md:grid-cols-4 gap-4">
        <Input
          placeholder="Search logs..."
          value={filters.search}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              search: e.target.value,
              page: 1,
            }))
          }
          className="bg-[#141414] text-white border border-[#2E2E2E]"
        />

        <select
          value={filters.module}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              module: e.target.value,
              page: 1,
            }))
          }
          className="bg-[#141414] text-white border border-[#2E2E2E] p-2 rounded"
        >
          <option value="all">All Modules</option>
          <option value="VEHICLE">Vehicle</option>
          <option value="USER">User</option>
          <option value="DRONE">Drone</option>
          <option value="INCIDENT">Incident</option>
        </select>

        <Input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((p) => ({
              ...p,
              date: e.target.value,
              page: 1,
            }))
          }
          className="bg-[#141414] text-white border border-[#2E2E2E]"
        />

        <button
          onClick={() =>
            setFilters((p) => ({
              ...p,
              date: "",
              page: 1,
            }))
          }
          className="border border-[#2E2E2E] rounded text-gray-300 hover:text-white"
        >
          Clear Date
        </button>
      </CardContent>
    </Card>
  );
}
