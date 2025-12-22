import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import SafeIcon from "@/components/common/SafeIcon"
import { toast } from "react-hot-toast" // ⭐ Import toast

export default function FirefighterHeader({
  userName = "Firefighter",
  sessionEndTime,
  hasNewAlerts = false,
}) {
  const [timeRemaining, setTimeRemaining] = useState("")
  const [mounted, setMounted] = useState(false)
  
  // Refs to prevent duplicate toasts
  const warningShownRef = useRef(false)
  const prevAlertStateRef = useRef(hasNewAlerts)

  // ⭐ New Alert Toast Logic
  useEffect(() => {
    if (hasNewAlerts && !prevAlertStateRef.current) {
      toast.error("New Emergency Alert Detected!", {
        duration: 5000,
        style: {
          border: '1px solid #ef4444',
          background: '#333',
          color: '#fff',
        },
        icon: '🚨'
      });
    }
    prevAlertStateRef.current = hasNewAlerts;
  }, [hasNewAlerts]);

  useEffect(() => {
    setMounted(true)

    if (!sessionEndTime) return

    const updateTimer = () => {
      const now = new Date()
      const diff = sessionEndTime.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining("Session Expired")
        return
      }

      // ⭐ Session Warning Toast (5 minutes remaining)
      // 300000ms = 5 minutes. Check a small window to ensure we catch it.
      if (diff <= 300000 && diff > 298000 && !warningShownRef.current) {
         toast("Session expiring in 5 minutes", {
           icon: "⚠️",
           style: {
             border: '1px solid #f59e0b', // Amber
             padding: '16px',
             color: '#713200',
           },
         });
         warningShownRef.current = true;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [sessionEndTime])

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="h-8 w-32 rounded bg-muted animate-pulse" />
          <div className="h-10 w-24 rounded bg-muted animate-pulse" />
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        
        {/* Left Logo + Branding */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <SafeIcon name="Flame" size={20} className="text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">FireCommand Pro</span>
          </div>

          {hasNewAlerts && (
            <Badge variant="destructive" className="animate-pulse-glow">
              <SafeIcon name="AlertTriangle" size={14} className="mr-1" />
              New Alert
            </Badge>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {sessionEndTime && (
            <div className="hidden sm:flex items-center gap-2 rounded-md bg-muted px-3 py-1.5">
              <SafeIcon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">{timeRemaining}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src="https://spark-builder.s3.us-east-1.amazonaws.com/image/2025/11/20/f57aed3b-5c9b-4fa3-8853-46e9870116f0.png"
                alt={userName}
              />
              <AvatarFallback>
                {userName.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block text-sm font-medium">
              {userName}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => (window.location.href = "./firefighter-login.html")}
          >
            <SafeIcon name="LogOut" size={20} />
          </Button>
        </div>

      </div>
    </header>
  )
}