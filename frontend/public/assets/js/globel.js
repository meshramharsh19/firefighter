let gridData = "https://support.oystermap.com:8443/app_service_pmc_dev/api/common/getGridData";
const vehicalInventoryUrl = "https://support.oystermap.com:8443/app_service_pmc_dev/api/common/getFireStationData";
const supportToken = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNlYm83MTQ2QGFuZGluZXdzLmNvbSIsImlhdCI6MTc2MDA3MzI2NiwiZXhwIjoxNzYwMTE2NDY2LCJhcHBpZCI6MH0.HXA5pATJjJf-F3zSRdVRXSCDOCqib7xV3P69tKFmqvXdG_APlhvYTLyzEOTsxDf_cxYBJkHNQCr04bkJq5tNpg";
let routingUrl = "https://oystermap.com/OysterRouteIOT/api/GenerateRoute";
let terrainUrl = "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Terrain_Ward_56";  //old terrian
// let terrainUrl = "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Terrain/Entire_Dem"; 
let tilesetUrl = "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_08/Cesium%203D/Cesium3D/tileset.json";
let baseUrl = "https://a.tile.openstreetmap.org/";
// let baseUrl = "https://mapapi.genesysmap.com/app/tiles/{TileMatrix}/{TileCol}/{TileRow}.png";
let heightAjustment=700;
const meshConfig = [{
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_New_01/Cesium3D/tileset.json",
    offsetHeight: -72.17
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_New_02/Cesium3D/tileset.json",
    offsetHeight: -72.17
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_New_03/Cesium3D/tileset.json",
    offsetHeight: -70.88
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_New_04/Cesium3D/tileset.json",
    offsetHeight: -70.82
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_New_05/tileset.json",
    offsetHeight: -72.21
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_New_06/Cesium3D/tileset.json",
    offsetHeight:-72.17
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_New_07/Cesium3D/tileset.json",
    offsetHeight: -72.12
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_08/Cesium%203D/Cesium3D/tileset.json",
    offsetHeight: -71.52
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_09/Cesium3D/Scene/Cesium3D.json",
    offsetHeight: 0.02
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_10/Cesium%203D/Part_01/Cesium3D/tileset.json",
    offsetHeight: -72.28
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_10/Cesium%203D/Part_02/Cesium3D/tileset.json",
    offsetHeight: -72.28
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_10/Cesium%203D/Part_03/Cesium3D/tileset.json",
    offsetHeight: -72.28
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_10/Cesium%203D/Part_04/Cesium3D/tileset.json",
    offsetHeight: -72.28
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_11/Cesium%203D/Part_01/Cesium3D/tileset.json",
    offsetHeight: -72.63
}, {
    url: "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Mesh_Model/Block_11/Cesium%203D/Part_02/Cesium3D/tileset.json",
    offsetHeight: -72.63
}];
let droneFly = {
    height: 800, // relative height above terrain
    path_lat_lon: [
        [18.45771, 73.85486]
        // [18.45820, 73.85520],
        // [18.45870, 73.85580],
        // [18.45850, 73.85650],
        // [18.45790, 73.85700],
        // [18.45720, 73.85680],
        // [18.45670, 73.85620],
        // [18.45680, 73.85540],
        // [18.45730, 73.85490],
        // [18.45771, 73.85486] // back to start
    ]
};

let vehicleEntity = null;
let tileset = null;
let routeCoords =[];
let trafficCoords =[];

// let terrainUrl = "https://pmc-stage.s3.dualstack.ap-south-1.amazonaws.com/data/Terrain/merge-output";