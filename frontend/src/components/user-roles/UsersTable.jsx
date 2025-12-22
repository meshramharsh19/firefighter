import React from "react"; 

export default function UsersTable({ isDark, users, toggleUserStatus, onEdit }) {
  return (
    <table
      className="w-full border mt-4 text-sm"
      style={{
        borderColor: isDark ? "#1d1f23" : "#cccccc",
        backgroundColor: isDark ? "#0f1114" : "#ffffff",
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: isDark ? "#171b20" : "#f2f2f2",
            color: isDark ? "white" : "black",
          }}
        >
          <th className="p-2 text-left">User ID</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Role</th>
          <th className="p-2 text-left">Station</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Action</th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="6" className="p-4 text-center text-gray-500">
              No users found
            </td>
          </tr>
        ) : (
          users.map((u) => (
            <tr
              key={u.id}
              className="border-b"
              style={{
                borderColor: isDark ? "#1d1f23" : "#e0e0e0",
              }}
            >
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.station}</td>

              <td className="p-2">
                <button
                  onClick={() => toggleUserStatus(u)}
                  className={`
                    px-3 py-1 rounded text-white text-xs
                    transition-all duration-200
                    active:scale-[0.95]
                    ${
                      u.active
                        ? "bg-green-600 hover:bg-green-700 active:bg-green-800"
                        : "bg-red-600 hover:bg-red-700 active:bg-red-800"
                    }
                  `}
                >
                  {u.active ? "Active" : "Inactive"}
                </button>
              </td>

              <td className="p-2">
                <button
                  onClick={() => onEdit(u.id)}
                  className="
                    px-3 py-1 rounded text-white text-xs
                    bg-blue-600
                    transition-all duration-200
                    hover:bg-blue-700
                    active:bg-blue-800 active:scale-[0.95]
                  "
                >
                  Edit
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
