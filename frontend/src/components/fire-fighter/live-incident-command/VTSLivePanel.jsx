"use client";

import React, { useEffect, useRef } from "react";
import SafeIcon from "@/components/common/SafeIcon";
import { Button, Chip } from "@mui/material";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.body.appendChild(s);
  });
}

function loadCss(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function forceCesiumResize() {
  const viewer = window.viewer;
  if (!viewer) return;
  setTimeout(() => {
    try {
      viewer.resize();
      viewer.scene.requestRender();
    } catch (_) {}
  }, 300);
}

export default function VTSLivePanel({
  onMaximize,
  isMaximized = false,
  onExit,
}) {
  const cesiumInitRef = useRef(false);

  useEffect(() => {
    async function initCesium() {
      try {
        loadCss("https://cesium.com/downloads/cesiumjs/releases/1.96/Build/Cesium/Widgets/widgets.css");
        loadCss("/assets/css/style.css");

        if (!cesiumInitRef.current) {
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/cesium/1.96.0/Cesium.js");
          await loadScript("/assets/js/globel.js");
          await loadScript("/assets/js/map.js");
          cesiumInitRef.current = true;
        }

        if (window.initMap) {
          window.initMap();
          forceCesiumResize();
        }
      } catch (err) {
        console.error("VTSLivePanel Cesium Error:", err);
      }
    }

    initCesium();
  }, []);

  useEffect(() => {
    forceCesiumResize();
  }, [isMaximized]);

  return (
    <div className={`flex flex-col h-full ${isMaximized ? "p-6" : "p-4"}`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SafeIcon name="Navigation" className="h-5 w-5  text-[#dc2626]" />
          <h3 className={`font-semibold ${isMaximized ? "text-xl" : "text-lg"}`}>
            VTS Live 3D Map
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
          {!isMaximized && (
            <button onClick={onMaximize} className="p-1 hover:bg-muted rounded">
              <SafeIcon name="Maximize2" className="h-4 w-4" />
            </button>
          )}
          {isMaximized && (
            <button onClick={onExit} className="p-1 hover:bg-muted rounded">
              <SafeIcon name="X" className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* CESIUM MAP */}
      <div
        id="map-container"
        className="rounded-lg overflow-hidden border-2 border border-dashed border-[#2E2E2E]"
        style={{
          height: isMaximized ? "100%" : "300px",
          width: "100%",
        }}
      ></div>

    </div>
  );
}
