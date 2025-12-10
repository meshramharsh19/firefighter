import React from "react";
import { Truck, FileText, Users, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const links = [
  { to: "/vehicles", icon: Truck, label: "Vehicles", description: "Manage fleet" },
  { to: "/sops", icon: FileText, label: "SOPs", description: "Procedures" },
  { to: "/user-roles", icon: Users, label: "User Roles", description: "Permissions" },
  { to: "/logs", icon: Activity, label: "Audit Logs", description: "History" },
];

export default function QuickAccessLinks() {
  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Quick Access</h2>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-4">

        {links.map((link) => (
          <Link key={link.to} to={link.to} className="cursor-pointer group">
            
            <Card className=" bg-card transition hover:shadow-md hover:bg-muted/40 w-full">
              <CardHeader className="pb-1">
                <CardTitle className="flex items-center gap-3 text-sm">
                  <link.icon className="text-primary" size={18} />
                  {link.label}
                </CardTitle>
              </CardHeader>

              <CardContent className="text-xs text-muted-foreground">
                {link.description}
              </CardContent>
            </Card>

          </Link>
        ))}

      </div>
    </div>
  );
}
