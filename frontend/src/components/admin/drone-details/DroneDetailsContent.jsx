'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SafeIcon from '@/components/common/SafeIcon'
import StatusBadge from '@/components/common/StatusBadge'
import { MOCK_DRONES, MOCK_DRONE_LOGS } from '@/data/DroneData'
import { MOCK_USERS } from '@/data/UserData'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select"

// ----------------------------------------------
const API = "http://localhost/fire-fighter-new/backend/controllers";
// ----------------------------------------------

export default function DroneDetailsContent() {

  const [activeTab, setActiveTab] = useState('overview')

  // STATES
  const [wards, setWards] = useState([])
  const [selectedWard, setSelectedWard] = useState("")
  const [drones, setDrones] = useState([])
  const [selectedDrone, setSelectedDrone] = useState(null)

  // Fetch Wards
  useEffect(() => {
    fetch(`${API}/wards.php`)
      .then(res => res.json())
      .then(data => setWards(data))
  }, [])

  // Fetch drones when ward selected
  useEffect(() => {
    if (!selectedWard) return;
    fetch(`${API}/drones-by-ward.php?ward=${selectedWard}`)
      .then(res => res.json())
      .then(data => {
        setDrones(data)
        setSelectedDrone(data[0] || null) // default first drone
      })
  }, [selectedWard])

  const getHealthStatusColor = (status) => {
    return {
      Optimal: "text-emerald-500",
      Degraded: "text-amber-500",
      "Requires Service": "text-red-500"
    }[status] || "text-muted-foreground"
  }

  const pilot = selectedDrone
    ? MOCK_USERS.find(u => u.id == 1) // later replace with real pilot DB link
    : null

  return (
    <div className="space-y-6 p-6">

      {/* WARD + DRONE SELECT DROPDOWNS */}
      <div className="flex gap-4 items-center border-b pb-3">

        {/* WARD SELECT */}
        <Select value={selectedWard} onValueChange={v => setSelectedWard(v)}>
          <SelectTrigger className="w-[200px] bg-black text-white">
            <SelectValue placeholder="Select Ward" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white">
            {wards.map((w,i)=>(
              <SelectItem key={i} value={w} className="hover:bg-gray-700">{w}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* DRONE SELECT (changes based on ward) */}
        <Select value={selectedDrone?.id+""} onValueChange={id=>{
          const d = drones.find(x=> x.id+""===id)
          setSelectedDrone(d)
        }}>
          <SelectTrigger className="w-[250px] bg-black text-white">
            <SelectValue placeholder="Select Drone" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white">
            {drones.length>0 ?
              drones.map(d=>(
                <SelectItem 
                  key={d.id} 
                  value={d.id+""} 
                  className="hover:bg-gray-700"
                >
                  {d.drone_name} ({d.drone_code})
                </SelectItem>
              ))
            :
              <SelectItem disabled>No Drones in this ward</SelectItem>
            }
          </SelectContent>
        </Select>

      </div>

      {/* If no drone selected */}
      {!selectedDrone && <p className="text-muted-foreground mt-4">Select ward → Select drone to view details</p>}

      {selectedDrone && (
      <>
      {/* HEADER */}
      {/* <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">{selectedDrone.drone_name}</h1>
        <Badge>{selectedDrone.status}</Badge>
      </div> */}

      {/* QUICK DETAILS */}
      {/* <div className="grid grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><b>ID:</b> {selectedDrone.id}</CardContent></Card>
        <Card><CardContent className="p-4"><b>Code:</b> {selectedDrone.drone_code}</CardContent></Card>
        <Card><CardContent className="p-4"><b>Ward:</b> {selectedDrone.ward}</CardContent></Card>
        <Card><CardContent className="p-4"><b>Battery:</b> {selectedDrone.battery}%</CardContent></Card>
      </div> */}
      </>
      )}
    </div>
  )
}
