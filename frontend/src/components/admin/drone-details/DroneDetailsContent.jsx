"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FiSearch } from "react-icons/fi";

import DroneHeader from "./DroneHeader";
import QuickStats from "./QuickStats";
import OverviewTab from "./OverviewTab";
import HistoryTab from "./HistoryTab";
import MaintenanceTab from "./MaintenanceTab";
import AddDroneDialog from "./AddDroneDialog";
import EditDroneDialog from "./EditDroneDialog";


const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API = `${API_BASE}/admin/admin-drone-details`;

const LAST_STATION_KEY = "last_selected_station";
const LAST_DRONE_KEY_PREFIX = "last_selected_drone_";
const getDroneKey = (station) =>
  `${LAST_DRONE_KEY_PREFIX}${station}`;

export default function DroneDetailsContent() {
  const [stations, setStations] = useState([]);
  const [drones, setDrones] = useState([]);
  const [selectedStation, setSelectedStation] = useState("");
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const [stationOpen, setStationOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [stationSearch, setStationSearch] = useState("");

  const filteredStations = searchMode
    ? stations.filter((s) =>
      s.name.toLowerCase().includes(stationSearch.toLowerCase())
    )
    : stations;

  useEffect(() => {
    fetch(`${API_BASE}/admin/station/get_stations.php`)
      .then((res) => res.json())
      .then((data) => {
        const stationList = Array.isArray(data)
          ? data
          : data.stations || [];

        if (!stationList.length) return;

        setStations(stationList);

        const lastStation =
          localStorage.getItem(LAST_STATION_KEY);

        const stationToSelect = stationList.find(
          (s) => s.name === lastStation
        )
          ? lastStation
          : stationList[0].name;

        setSelectedStation(stationToSelect);
        fetchDronesByStation(stationToSelect);
      });
  }, []);

  useEffect(() => {
    const close = () => {
      setStationOpen(false);
      setSearchMode(false);
      setStationSearch("");
    };

    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);


  const fetchDronesByStation = (stationName) => {
    fetch(`${API}/getDronesByStation.php?station=${stationName}`)
      .then((res) => res.json())
      .then((data) => {
        setDrones(data || []);

        if (!data?.length) {
          setSelectedDrone(null);
          return;
        }

        const lastDrone = localStorage.getItem(
          getDroneKey(stationName)
        );

        const droneToSelect = data.find(
          (d) => d.drone_code === lastDrone
        )
          ? lastDrone
          : data[0].drone_code;

        fetchDroneDetails(droneToSelect, stationName);
      });
  };

  const fetchDroneDetails = (code, station = selectedStation) => {
    fetch(`${API}/getDroneDetails.php?drone_code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === false) return;

        setSelectedDrone(data);

        if (station && data.drone_code) {
          localStorage.setItem(
            getDroneKey(station),
            data.drone_code
          );
        }
      });
  };

  return (
    <div className="space-y-6 p-6">

      <div className="flex gap-6 items-end" onClick={(e) => e.stopPropagation()}>
        <div
          className="relative w-60"
          onClick={(e) => e.stopPropagation()}
        >
          <label className="text-md font-medium text-muted-foreground mb-2 block">
            Select Station:
          </label>

          <div
            onClick={() => setStationOpen((p) => !p)}
            className="h-9 w-full flex items-center px-3 rounded-md
                       bg-[#0D0F12] border border-[#2E2E2E] cursor-pointer"
          >
            <div className="flex-1">
              {searchMode ? (
                <input
                  autoFocus
                  value={stationSearch}
                  onChange={(e) =>
                    setStationSearch(e.target.value)
                  }
                  placeholder="Search station..."
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent text-sm text-[#FAFAFA]
                             outline-none w-full"
                />
              ) : (
                <span className="text-sm text-[#FAFAFA] truncate">
                  {selectedStation || "Select station"}
                </span>
              )}
            </div>

            <FiSearch
              size={16}
              className="text-muted-foreground hover:text-white ml-2"
              onClick={(e) => {
                e.stopPropagation();
                setSearchMode(true);
                setStationOpen(true);
              }}
            />
          </div>

          {stationOpen && (
            <div
              className="absolute z-50 mt-1 w-full rounded-md
                         bg-[#0D0F12] border border-[#2E2E2E]
                         shadow-lg max-h-[100px]
                         overflow-y-auto dark-scrollbar"
            >
              {filteredStations.length ? (
                filteredStations.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setSelectedStation(s.name);
                      fetchDronesByStation(s.name);
                      localStorage.setItem(
                        LAST_STATION_KEY,
                        s.name
                      );
                      setStationOpen(false);
                      setSearchMode(false);
                      setStationSearch("");
                    }}
                    className={`px-3 py-2 text-sm cursor-pointer
                      hover:bg-[#1A1D23]
                      ${selectedStation === s.name
                        ? "bg-[#1A1D23]"
                        : ""
                      }`}
                  >
                    {s.name}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No stations found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-md font-medium text-muted-foreground mb-2">
            Select Drone:
          </label>
          <select
            className="h-9 w-50 text-sm text-[#FAFAFA]
                       px-3 rounded-md bg-[#0D0F12]
                       border border-[#2E2E2E]"
            value={selectedDrone?.drone_code || ""}
            onChange={(e) => {
              const droneCode = e.target.value;
              fetchDroneDetails(droneCode);
            }}
          >
            {drones.map((d) => (
              <option
                key={d.drone_code}
                value={d.drone_code}
              >
                {d.drone_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DroneHeader
        selectedDrone={selectedDrone}
        onAddClick={() => setShowAddDialog(true)}
        onEditClick={() => setShowEditDialog(true)}
      />

      <QuickStats selectedDrone={selectedDrone} />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Flight History</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            selectedDrone={selectedDrone}
            refreshDrone={() =>
              fetchDroneDetails(selectedDrone?.drone_code)
            }
          />
        </TabsContent>

        <TabsContent value="history">
          <HistoryTab />
        </TabsContent>

        <TabsContent value="maintenance">
          <MaintenanceTab selectedDrone={selectedDrone} />
        </TabsContent>
      </Tabs>

      <AddDroneDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        stations={stations}
        onSuccess={() =>
          fetchDronesByStation(selectedStation)
        }
      />

      {selectedDrone && (
        <EditDroneDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          drone={selectedDrone}
          onSuccess={() =>
            fetchDroneDetails(selectedDrone.drone_code)
          }
        />
      )}
    </div>
  );
}
