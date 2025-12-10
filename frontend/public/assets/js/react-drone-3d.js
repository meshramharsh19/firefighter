// public/assets/js/react-drone-3d.js
(function () {
  let droneEntity = null;
  let isDroneFirstUpdate = false;

  async function updateDroneLocationCesium(droneLat, droneLng) {
    try {
      // Cesium ready?
      if (typeof Cesium === "undefined") {
        console.warn("Cesium not ready yet");
        return;
      }

      // viewer global from partner's code (try few common names)
      const v =
        window.viewer ||
        window.VIEWER ||
        window.cesiumViewer ||
        window.V ||
        window.v;

      if (!v) {
        console.warn("Cesium viewer not found on window");
        return;
      }

      const carto = Cesium.Cartographic.fromDegrees(droneLng, droneLat);
      const updated = await Cesium.sampleTerrainMostDetailed(
        v.terrainProvider,
        [carto]
      );

      const groundHeight = updated[0].height || 0;
      const finalHeight = groundHeight + 100;

      const position = Cesium.Cartesian3.fromDegrees(
        droneLng,
        droneLat,
        finalHeight
      );

      if (!droneEntity) {
        droneEntity = v.entities.add({
          id: "droneEntity",
          position,
          model: {
            uri: "../assets/model/drone.glb",
            scale: 0.5,
            minimumPixelSize: 64,
          },
        });
      } else {
        droneEntity.position = position;
      }

      if (!isDroneFirstUpdate) {
        v.trackedEntity = droneEntity;

        v.flyTo(droneEntity, {
          offset: new Cesium.HeadingPitchRange(
            0,
            Cesium.Math.toRadians(-45),
            500
          ),
        });

        isDroneFirstUpdate = true;
      }
    } catch (err) {
      console.error("Cesium: Error in updateDroneLocationCesium:", err);
    }
  }

  // 👇 Ye function React se call hoga
  window.updateDroneFromReact = function (drone) {
    if (!drone || !drone.latitude || !drone.longitude) return;
    updateDroneLocationCesium(drone.latitude, drone.longitude);
  };
})();
