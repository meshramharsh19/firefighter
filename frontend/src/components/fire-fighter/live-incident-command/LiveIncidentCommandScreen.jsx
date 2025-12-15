"use client";

import React, { useState } from "react";
import SafeIcon from "@/components/common/SafeIcon";

// Panels
import CommandToolbar from "./CommandToolbar";
import VTSLivePanel from "./VTSLivePanel";
import DroneLivePanel from "./DroneLivePanel";
import DroneCameraPanel from "./DroneCameraPanel";
import DigitalTwinPanel from "./DigitalTwinPanel";

// MUI
import { Button } from "@mui/material";

export default function LiveIncidentCommandScreen({
  incidentId = "INC-20251120-003",
  incidentName = "Major Structural Fire - Downtown",
}) {
  const [viewMode, setViewMode] = useState("split");
  const [maximizedPanel, setMaximizedPanel] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Handlers
  const handleMaximizePanel = (panel) => {
    setMaximizedPanel(panel);
    setViewMode("full");
  };

  const handleExitMaximize = () => {
    setMaximizedPanel(null);
    setViewMode("split");
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setMaximizedPanel(null);
  };

  const handleFullscreen = () => {
    document.documentElement.requestFullscreen?.();
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    document.fullscreenElement && document.exitFullscreen();
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-background">
      
      {/* Toolbar */}
      <CommandToolbar
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        onFullscreen={handleFullscreen}
        onExitFullscreen={handleExitFullscreen}
        isFullscreen={isFullscreen}
        incidentId={incidentId}
        incidentName={incidentName}
      />

      {/* Main Content */}
      {/* FIX APPLIED HERE ↓↓↓↓ */}
      <div className="p-4 min-h-[calc(100vh-128px)] overflow-visible bg-[#0A0A0A]">
        
        {/* ---------- SPLIT MODE ---------- */}
        {viewMode === "split" && !maximizedPanel && (
          <div className="grid grid-cols-2 gap-4 pb-4 overflow-visible">
            
            <div className="rounded-lg min-h-[50vh] h-[70vh] overflow-hidden bg-[#1F1F1F]">
              <VTSLivePanel onMaximize={() => handleMaximizePanel("vts")} />
            </div>

            <div className="rounded-lg min-h-[50vh] h-[70vh] overflow-hidden bg-[#1F1F1F]">
              <DroneLivePanel
                onMaximize={() => handleMaximizePanel("drone-location")}
              />
            </div>

            <div className="rounded-lg min-h-[50vh] h-[70vh] overflow-hidden bg-[#1F1F1F]">
              <DroneCameraPanel
                onMaximize={() => handleMaximizePanel("drone-camera")}
              />
            </div>

            <div className="rounded-lg min-h-[40vh] h-[70vh] overflow-hidden bg-[#1F1F1F]">
              <DigitalTwinPanel
                onMaximize={() => handleMaximizePanel("3d-twin")}
              />
            </div>

          </div>
        )}

        {/* ---------- FULL MODE ---------- */}
        {viewMode === "full" && maximizedPanel && (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden rounded-lg">
              {maximizedPanel === "vts" && (
                <VTSLivePanel isMaximized onExit={handleExitMaximize} />
              )}
              {maximizedPanel === "drone-location" && (
                <DroneLivePanel isMaximized onExit={handleExitMaximize} />
              )}
              {maximizedPanel === "drone-camera" && (
                <DroneCameraPanel isMaximized onExit={handleExitMaximize} />
              )}
              {maximizedPanel === "3d-twin" && (
                <DigitalTwinPanel isMaximized onExit={handleExitMaximize} />
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <Button
                variant="outlined"
                onClick={handleExitMaximize}
                startIcon={<SafeIcon name="X" />}
              >
                Exit Fullscreen
              </Button>
            </div>
          </div>
        )}

        {/* ---------- FOCUS MODE ---------- */}
        {viewMode === "focus" && !maximizedPanel && (
          <div className="h-full flex flex-col gap-4">
            <div className="flex-1 overflow-hidden rounded-lg">
              <VTSLivePanel />
            </div>

            <div className="grid grid-cols-3 gap-2 h-32 overflow-hidden">
              <DroneLivePanel />
              <DroneCameraPanel />
              <DigitalTwinPanel />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
