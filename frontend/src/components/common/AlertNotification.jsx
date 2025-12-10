import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SafeIcon from "@/components/common/SafeIcon"

export default function AlertNotification({
  incidentId,
  incidentName,
  location,
  severity,
  onAcknowledge,
  onView
}) {
  const [isBlinking, setIsBlinking] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getSeverityColor = () => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-orange-600 text-white"
      case "medium":
        return "bg-amber-600 text-white"
      case "low":
        return "bg-blue-600 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleAcknowledge = () => {
    setIsBlinking(false)
    onAcknowledge()
  }

  if (!mounted) return null

  return (
    <Card
      className={`border-2 ${
        isBlinking ? "animate-blink-border border-primary" : "border-border"
      } ${isBlinking ? "glow-red" : ""}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <SafeIcon name="AlertTriangle" size={20} className="text-primary" />
            <CardTitle className="text-lg">New Incident Alert</CardTitle>
          </div>
          <Badge className={getSeverityColor()}>
            {severity?.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <SafeIcon name="Hash" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium">{incidentId}</span>
          </div>
          <div className="flex items-center gap-2">
            <SafeIcon name="FileText" size={16} className="text-muted-foreground" />
            <span className="text-sm">{incidentName}</span>
          </div>
          <div className="flex items-center gap-2">
            <SafeIcon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleAcknowledge}
            className="flex-1"
            variant={isBlinking ? "default" : "secondary"}
          >
            <SafeIcon name="Check" size={16} className="mr-2" />
            Acknowledge
          </Button>

          <Button
            onClick={onView}
            className="flex-1"
            variant="outline"
          >
            <SafeIcon name="Eye" size={16} className="mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
