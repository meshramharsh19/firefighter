import StationCard from "./StationCard";

const stations = [
  {
    name: "Katraj Fire Station",
    code: "ST-001",
    city: "Pune",
    contact: "9876543210",
    status: "Active",
    location: "South Sector Yard",
  },
  {
    name: "Civil Lines Station",
    code: "ST-002",
    city: "Nagpur",
    contact: "9123456789",
    status: "Inactive",
    location: "Central Zone",
  },
];

export default function StationList({ filters }) {
  const filteredStations = stations.filter((s) => {
    return (
      (filters.status === "all" || s.status === filters.status) &&
      (filters.city === "All" || s.city === filters.city) &&
      (s.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        s.code.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {filteredStations.map((station, i) => (
        <StationCard key={i} station={station} />
      ))}
    </div>
  );
}
