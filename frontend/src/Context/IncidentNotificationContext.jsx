import { createContext, useContext, useEffect, useRef, useState } from "react";

const IncidentNotificationContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const INCIDENT_API = `${API_BASE}/fire-fighter/fire-fighter-dashboard`;

export function IncidentNotificationProvider({ children, station }) {
  const [notification, setNotification] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const isMutedRef = useRef(false);
  const knownIdsRef = useRef(new Set());
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/alert.mp3");
    audioRef.current.volume = 1;
    audioRef.current.loop = true;

    const unlock = () => document.removeEventListener("click", unlock);
    document.addEventListener("click", unlock);

    return () => {
      audioRef.current?.pause();
      document.removeEventListener("click", unlock);
    };
  }, []);

  useEffect(() => {
    if (!station) return;

    const url = `${INCIDENT_API}/stream_incidents.php?station=${encodeURIComponent(station)}`;
    const es = new EventSource(url);

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);

        // Pehli baar — sirf IDs note karo, notification mat dikhao
        if (isFirstLoadRef.current) {
          data.forEach((i) => knownIdsRef.current.add(i.id));
          isFirstLoadRef.current = false;
          return;
        }

        // Sirf bilkul naye IDs jo pehle kabhi nahi dekhe
        const brandNew = data.filter(
          (i) => i.isNewAlert && !knownIdsRef.current.has(i.id)
        );

        if (brandNew.length > 0) {
          const newest = brandNew[brandNew.length - 1];
          knownIdsRef.current.add(newest.id);

          setNotification(newest);
          setIsMuted(false);
          isMutedRef.current = false;

          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }

      } catch (err) {
        console.error("SSE notification parse error", err);
      }
    };

    es.onerror = () => console.error("SSE notification error — will auto-reconnect");

    return () => es.close();
  }, [station]);

  const muteNotification = () => {
    isMutedRef.current = true;
    setIsMuted(true);
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const unmuteNotification = () => {
    isMutedRef.current = false;
    setIsMuted(false);
    if (notification) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const dismissNotification = () => {
    setNotification(null);
    setIsMuted(false);
    isMutedRef.current = false;
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  return (
    <IncidentNotificationContext.Provider
      value={{
        notification,
        isMuted,
        muteNotification,
        unmuteNotification,
        dismissNotification,
      }}
    >
      {children}
    </IncidentNotificationContext.Provider>
  );
}

export function useIncidentNotification() {
  return useContext(IncidentNotificationContext);
}