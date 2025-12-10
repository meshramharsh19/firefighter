import React from "react";

export default function UsersTable({ isDark, users, toggleUserStatus }) {
  return (
    <table
      className="w-full border"
      style={{ borderColor: isDark ? "#1d1f23" : "#cccccc" }}
    >
      <thead>
        <tr style={{ backgroundColor: isDark ? "#171b20" : "#e6e6e6" }}>
          <th className="p-2">User ID</th>
          <th className="p-2">Name</th>
          <th className="p-2">Role</th>
          <th className="p-2">Station</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr
            key={u.id}
            className="border-b"
            style={{ borderColor: isDark ? "#1d1f23" : "#dddddd" }}
          >
            <td className="p-2">{u.id}</td>
            <td className="p-2">{u.name}</td>
            <td className="p-2">{u.role}</td>
            <td className="p-2">{u.station}</td>
            <td className="p-2">
              <button
                onClick={() => toggleUserStatus(u)}
                className={`px-3 py-1 rounded-lg text-white ${
                  u.active ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {u.active ? "Active" : "Inactive"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
