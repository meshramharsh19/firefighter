import { useEffect, useState } from "react";
import LogsFilters from "./LogsFilters";
import LogsTable from "./LogsTable";
import LogsPagination from "./LogsPagination";

const LOGS_API =
  "http://localhost/fire-fighter-new/backend/controllers/logs/get_logs.php";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    module: "all",
    page: 1,
    limit: 20,
  });

  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH LOGS ================= */
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: filters.search,
        module: filters.module === "all" ? "" : filters.module,
        page: filters.page,
        limit: filters.limit,
      });

      const res = await fetch(`${LOGS_API}?${params.toString()}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setLogs(data.logs || []);
        setTotalPages(data.pages || 1);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error("Logs fetch failed", err);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  /* 🔁 AUTO FETCH:
     - page change
     - module change
     - search change
  */
  useEffect(() => {
    fetchLogs();
  }, [filters.page, filters.module, filters.search]);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">System Logs</h1>
        <p className="text-muted-foreground">
          Complete audit trail of all activities
        </p>
      </div>

      {/* FILTERS (auto apply) */}
      <LogsFilters
        filters={filters}
        setFilters={setFilters}
      />

      {/* TABLE */}
      <LogsTable logs={logs} loading={loading} />

      {/* PAGINATION */}
      <LogsPagination
        page={filters.page}
        totalPages={totalPages}
        onChange={(page) =>
          setFilters((p) => ({ ...p, page }))
        }
      />
    </div>
  );
}
