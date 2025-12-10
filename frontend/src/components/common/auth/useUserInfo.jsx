import { useEffect, useState } from "react";

export default function useUserInfo() {
  const [user, setUser] = useState({
    userId: null,
    name: "",
    phone: "",
    role: "",
    station: "",
    designation: "",
    initials: "",
    loginTime: null,
  });

  useEffect(() => {
    const session = sessionStorage.getItem("fireOpsSession");
    if (!session) return;

    const parsed = JSON.parse(session);

    const initials = parsed.name
      ? parsed.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "";

    setUser({
      userId: parsed.userId || null,
      name: parsed.name || "",
      phone: parsed.phone || "",
      role: parsed.role || "",
      station: parsed.station || "",      // 🔥 important for filtering incidents
      designation: parsed.designation || "",
      initials,
      loginTime: parsed.loginTime || null,
    });
  }, []);

  return user;
}
