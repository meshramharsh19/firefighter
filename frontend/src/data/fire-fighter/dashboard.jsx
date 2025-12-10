// No TypeScript types needed in JS

export const DASHBOARD_SUMMARY_STATS = [
  {
    id: "today",
    title: "Todays incident Count",
    value: 4,
    unit: "Incidentes",
    iconName: "Flame",
    colorClass: "red",
  },
  {
    id: "monthly",
    title: "This Month Incident Count",
    value: 145,
    unit: "Incidentes",
    iconName: "CalendarDays",
    colorClass: "orange",
  },
  {
    id: "active",
    title: "On Going Incident",
    value: 2,
    unit: "Incidentes",
    iconName: "AlertTriangle",
    colorClass: "blue",
  },
  {
    id: "pending_ack",
    title: "Pendiente de Reconocimiento",
    value: 1,
    unit: "Alerta",
    iconName: "MessageSquareWarning",
    colorClass: "red",
  },
];