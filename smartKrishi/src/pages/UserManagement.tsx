
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Shield, User, Users, Edit, Trash2, Filter, Search, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const users = [
  {
    id: "user1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 555-123-4567",
    role: "Admin",
    status: "active",
    farms: ["Green Valley Farm", "Sunrise Acres"],
    lastLogin: "Today, 10:24 AM",
  },
  {
    id: "user2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 555-234-5678",
    role: "Farmer",
    status: "active",
    farms: ["Green Valley Farm"],
    lastLogin: "Yesterday, 3:15 PM",
  },
  {
    id: "user3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 555-345-6789",
    role: "Agronomist",
    status: "active",
    farms: ["Sunrise Acres"],
    lastLogin: "Oct 15, 9:30 AM",
  },
  {
    id: "user4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 555-456-7890",
    role: "Viewer",
    status: "inactive",
    farms: ["Green Valley Farm"],
    lastLogin: "Sep 28, 2:45 PM",
  },
];

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Shield className="h-4 w-4 text-red-500" />;
      case "farmer":
        return <User className="h-4 w-4 text-green-500" />;
      case "agronomist":
        return <User className="h-4 w-4 text-blue-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold text-soil-800">User Management</h1>
        <Button 
          onClick={() => {
            toast({
              title: "Feature Coming Soon",
              description: "Adding new users will be available in the next update",
            });
          }}
          className="bg-soil-600 hover:bg-soil-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-soil-800">Users ({users.length})</CardTitle>
            <div className="flex w-full sm:w-auto gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-soil-500" />
                <input 
                  type="text"
                  placeholder="Search users..."
                  className="pl-8 pr-4 py-2 w-full sm:w-auto border border-soil-200 rounded-md focus:outline-none focus:ring-2 focus:ring-soil-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="text-soil-600">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-soil-200">
                  <th className="text-left py-3 px-4 text-soil-600 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-soil-600 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 text-soil-600 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-soil-600 font-medium">Farms</th>
                  <th className="text-left py-3 px-4 text-soil-600 font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-soil-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-soil-500">
                      No users found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-soil-100 hover:bg-soil-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-soil-200 flex items-center justify-center text-soil-700 font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-soil-800">{user.name}</div>
                            <div className="text-xs text-soil-500">Last login: {user.lastLogin}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-soil-700 flex items-center">
                          <Mail className="h-3 w-3 mr-1" /> 
                          {user.email}
                        </div>
                        <div className="text-soil-700 text-sm flex items-center">
                          <Phone className="h-3 w-3 mr-1" /> 
                          {user.phone}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          {getRoleIcon(user.role)}
                          <span className="ml-1.5 text-soil-700">{user.role}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-soil-700">
                          {user.farms.join(", ")}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={cn(
                          "px-2 py-1 text-xs rounded-full",
                          user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        )}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4 text-soil-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
