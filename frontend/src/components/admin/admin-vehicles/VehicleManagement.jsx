import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SafeIcon from "@/components/common/SafeIcon";

// Components
import VehicleStats from "./VehicleStats";
import VehicleList from "./VehicleList";
import VehicleMap from "./VehicleMap";
import AddVehicleModal from "./AddVehicleModal";

const API = "http://localhost/fire-fighter-new/backend/controllers";

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedWard, setSelectedWard] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [openModal, setOpenModal] = useState(false);

  // ================= FETCH VEHICLES =================
  const loadVehicles = async () => {
    try {
      const res = await fetch(`${API}/get_vehicles.php`);
      const data = await res.json();
      setVehicles(data || []);
    } catch(e){ console.log("Fetch Error:", e); }
  };

  useEffect(()=>{ loadVehicles(); },[]);

  // ================= Add New Vehicle =================
  const handleAddVehicle = async (vehicleData) => {
    try {
      const res = await fetch(`${API}/add_vehicle.php`,{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify(vehicleData)
      });
      const data= await res.json();
      alert(data.message);
      setOpenModal(false);
      loadVehicles();   // live refresh
    } catch(e){ console.log(e); alert("Error adding vehicle"); }
  };


  // ================= Filter Logic =================
  const filteredVehicles = vehicles.filter((v)=>{
    const s = searchQuery.toLowerCase();
    const matchSearch =
      v.name.toLowerCase().includes(s) ||
      v.location.toLowerCase().includes(s) ||
      v.registration.toLowerCase().includes(s);

    const matchStatus = selectedStatus==="all" || v.status===selectedStatus;
    const matchWard   = selectedWard==="all"   || v.ward===selectedWard;

    return matchSearch && matchStatus && matchWard;
  });

  const wards=["all",...new Set(vehicles.map(v=>v.ward))];
  const statuses=["all","available","busy","en-route","maintenance"];

  return(
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicle Management</h1>
          <p className="text-muted-foreground">Manage & monitor station vehicles</p>
        </div>

        <Button onClick={()=>setOpenModal(true)} className="gap-2">
          <SafeIcon name="Plus" size={18}/> Add New Vehicle
        </Button>
      </div>

      {/* 🔥 Live Updating Stats */}
      <VehicleStats vehicles={vehicles}/>

      {/* Filters */}
      <Card>
        <CardHeader><CardTitle>Filters & Search</CardTitle></CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-3">

          {/* Search */}
          <div>
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <SafeIcon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
              <Input 
                className="pl-10"
                placeholder="Search by name, reg, location"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select value={selectedStatus}
              onChange={(e)=>setSelectedStatus(e.target.value)}
              className="w-full p-2 bg-[#141414] text-white border rounded">
              {statuses.map(s=><option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Ward Filter */}
          <div>
            <label className="text-sm font-medium">Ward</label>
            <select value={selectedWard}
              onChange={(e)=>setSelectedWard(e.target.value)}
              className="w-full p-2 bg-[#141414] text-white border rounded">
              {wards.map(w=><option key={w}>{w}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* View Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode}>
        <TabsList className="grid grid-cols-2 w-full md:w-auto">
          <TabsTrigger value="list"><SafeIcon name="List" size={16}/> List View</TabsTrigger>
          <TabsTrigger value="map"><SafeIcon name="Map" size={16}/> Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="mt-4">
          <VehicleList vehicles={filteredVehicles} onUpdated={loadVehicles}/>
        </TabsContent>

        <TabsContent value="map" className="mt-4">
          <VehicleMap vehicles={filteredVehicles}/>
        </TabsContent>
      </Tabs>

      {/* Modal */}
      <AddVehicleModal open={openModal} onClose={()=>setOpenModal(false)} onSubmit={handleAddVehicle}/>
    </div>
  );
}
