const stats = [
  { label: "People", value: 12 },
  { label: "Drones", value: 4 },
  { label: "Vehicles", value: 6 },
  { label: "Other Assets", value: 3 },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#111418] border border-white/10 rounded-xl p-5"
        >
          <p className="text-white/60">{s.label}</p>
          <h2 className="text-3xl font-bold mt-2">{s.value}</h2>
        </div>
      ))}
    </div>
  );
}
