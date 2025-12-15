"use client";

import React, { useState } from "react";
import SafeIcon from "@/components/common/SafeIcon";
import { Button, Chip } from "@mui/material";

export default function DigitalTwinPanel({
  onMaximize,
  isMaximized = false,
  onExit,
}) {
  // Placeholder values (STATIC)
  const dtData = {
    title: "AI Detection",
    modelRenderUrl: "/assets/images/dt-placeholder.png",
    fireLocationFloor: 2,
    windDirection: "NE — 12 km/h",
    hazards: [
      { type: "Smoke", status: "Warning", locationFloor: 2 },
      { type: "High Temp", status: "Confirmado", locationFloor: 2 },
    ],
    floors: 5,
    dtAssetId: "ASSET-XXXX",
  };

  const [selectedFloor, setSelectedFloor] = useState(dtData.fireLocationFloor);

  return (
    <div className={`flex flex-col h-full ${isMaximized ? "p-6" : "p-4"}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SafeIcon name="Box" className="h-5 w-5 text-[#dc2626]" />

          <h3
            className={`font-semibold ${isMaximized ? "text-xl" : "text-base"}`}
          >
            {dtData.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Chip
            label={
              <span className="px-2 py-0.5 text-xs bg-red-600 text-white rounded animate-pulse">
                LIVE
              </span>
            }
            color="error"
            size="small"
            className="animate-pulse text-xs"
          />

          {/* {!isMaximized && (
            <Button variant="outlined" size="small" onClick={onMaximize}>
              <SafeIcon name="Maximize2" className="h-4 w-4" />
            </Button>
          )} */}

          {isMaximized && (
            <Button variant="outlined" size="small" onClick={onExit}>
              <SafeIcon name="X" className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 3D MODEL VIEW (STATIC PLACEHOLDER) */}
      <div
        className={`flex-1 rounded-lg border-2 border-dashed border border-[#2E2E2E] bg-muted/20 flex items-center justify-center mb-4 overflow-hidden`}
      >
        <div className="text-muted-foreground text-sm">Fire Detection</div>
      </div>

      {/* CONTENT */}
      <div className="space-y-3">
        {/* FIRE LOCATION */}
        {/* <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-2">
            <SafeIcon name="Flame" className="h-4 w-4 text-red-500" />
            <span className="text-sm text-muted-foreground">Fire Location</span>
          </div>
          <Chip label={`Floor ${dtData.fireLocationFloor}`} size="small" color="error" />
        </div> */}

        {/* WIND */}
        {/* <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2">
            <SafeIcon name="Wind" className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Wind</span>
          </div>
          <span className="font-medium text-sm">{dtData.windDirection}</span>
        </div> */}

        {/* HAZARDS LIST */}
        {isMaximized && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm font-medium mb-2">
              Detected Hazards (Placeholder)
            </p>

            <div className="space-y-2">
              {dtData.hazards.map((hazard, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs p-2 rounded bg-background border border-border"
                >
                  <div className="flex items-center gap-2">
                    <SafeIcon
                      name="AlertTriangle"
                      className="h-3 w-3 text-yellow-500"
                    />
                    <span className="text-muted-foreground">{hazard.type}</span>
                  </div>

                  <Chip
                    label={hazard.status}
                    size="small"
                    color={hazard.status === "Confirmado" ? "error" : "default"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FLOOR SELECTOR */}
        {/* {isMaximized && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm font-medium mb-2">Select Floor</p>

            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: dtData.floors }).map((_, floor) => (
                <Button
                  key={floor}
                  variant={selectedFloor === floor ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setSelectedFloor(floor)}
                >
                  {floor === 0 ? "G" : floor}
                </Button>
              ))}
            </div>
          </div>
        )} */}

        {/* ASSET ID */}
        {isMaximized && (
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs">
            <p className="text-muted-foreground">
              Asset ID:{" "}
              <span className="font-mono font-medium">{dtData.dtAssetId}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
