import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIncidentNotification } from "../../../context/IncidentNotificationContext";

export default function IncidentToast() {
  const {
    notification,
    isMuted,
    muteNotification,
    unmuteNotification,
    dismissNotification,
  } = useIncidentNotification();

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (notification) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [notification]);

  // ✅ Saare hooks ke BAAD check karo — Rules of Hooks
  if (location.pathname === "/fire-fighter-dashboard") return null;
  if (!notification) return null;

  const handleGoToIncident = () => {
    dismissNotification();
    navigate(`/fire-fighter-dashboard`);
  };

  return (
    <>
      <style>{`
        @keyframes toast-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .toast-ping {
          animation: toast-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .incident-toast-btn:hover {
          background: #e63939 !important;
        }
        .incident-icon-btn:hover {
          background: rgba(255,255,255,0.08) !important;
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "24px",
          zIndex: 9999,
          width: "340px",
          transform: visible ? "translateX(0)" : "translateX(-120%)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div
          style={{
            background: "#17181A",
            border: "1px solid rgba(255, 77, 77, 0.5)",
            borderLeft: "4px solid #ff4d4d",
            borderRadius: "12px",
            boxShadow: "0 0 24px rgba(255, 60, 60, 0.25)",
            padding: "14px 16px",
            color: "#e6e6e6",
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span
                  className="toast-ping"
                  style={{
                    position: "absolute",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#ff4d4d",
                    opacity: 0.75,
                  }}
                />
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#ff4d4d",
                    display: "inline-block",
                  }}
                />
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#ff4d4d",
                  letterSpacing: "0.08em",
                }}
              >
                NEW INCIDENT
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <button
                className="incident-icon-btn"
                onClick={isMuted ? unmuteNotification : muteNotification}
                title={isMuted ? "Unmute siren" : "Mute siren"}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: isMuted ? "#6b7280" : "#ff4d4d",
                  padding: "5px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s",
                }}
              >
                {isMuted ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/>
                    <line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  </svg>
                )}
              </button>

              <button
                className="incident-icon-btn"
                onClick={dismissNotification}
                title="Dismiss"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#6b7280",
                  padding: "5px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.15s",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Incident name */}
          <div style={{ fontSize: "15px", fontWeight: 600, color: "#f1f1f1", marginBottom: "4px" }}>
            {notification.name}
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: "12px",
              color: "#8f8f8f",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            {notification.location}
          </div>

          {/* Go to Incident button */}
          <button
            className="incident-toast-btn"
            onClick={handleGoToIncident}
            style={{
              width: "100%",
              background: "#ff4444",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "9px",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            Go to Incident
          </button>
        </div>
      </div>
    </>
  );
}