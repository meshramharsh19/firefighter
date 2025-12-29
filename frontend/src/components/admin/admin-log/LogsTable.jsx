import { Card, CardContent } from "@/components/ui/card";

export default function LogsTable({ logs, loading }) {
  return (
    <Card>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Time</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Module</th>
              <th className="p-2 text-left">Action</th>
              <th className="p-2 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Loading logs...
                </td>
              </tr>
            ) : logs.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No logs found
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b hover:bg-muted/40"
                >
                  <td className="p-2">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="p-2">{log.user_name}</td>
                  <td className="p-2">{log.role}</td>
                  <td className="p-2">{log.module}</td>
                  <td className="p-2 font-semibold">
                    {log.action}
                  </td>
                  <td className="p-2">{log.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
