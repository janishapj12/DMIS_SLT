import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Shield, Users, Activity, UserPlus, Clock, Globe, MonitorCog,FileText } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";

interface UserType {
  _id: string;
  name: string;
  email: string;
  joinDate: string;
  status: string;
}

const UserStatistics = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: BarChart },
    { label: "System Status", href: "/admin/system-status", icon: MonitorCog },
    { label: "User Statistics", href: "/admin/user-statistics", icon: Users },
    { label: "Security Reports", href: "/admin/security-reports", icon: Shield },
    { label: "Blockchain", href: "/admin/blockchain", icon: Globe },
    { label: "System Logs", href: "/admin/system-logs", icon: Activity },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
  ];

  // Fetch users from backend
  const fetchUsers = async () => {
    if (!token) return;

    try {
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        const formattedUsers = res.data.data.users.map((u: any) => ({
          _id: u._id,
          name: u.full_name || u.username || u.email,
          email: u.email,
          joinDate: u.createdAt
            ? new Date(u.createdAt).toLocaleDateString()
            : u.updatedAt
            ? new Date(u.updatedAt).toLocaleDateString()
            : "N/A",
          status: u.status || "Active",
        }));
        setUsers(formattedUsers);
      }
    } catch (err: any) {
      console.error("Failed to fetch users:", err);
      if (err.response?.status === 401) {
        alert("Unauthorized! Please login again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  // Delete user
  const handleDelete = async (id: string) => {
    if (!token) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        alert("User deleted successfully");
        setUsers(users.filter(u => u._id !== id));
      }
    } catch (err: any) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user. Check console for details.");
    }
  };

  return (
    <DashboardLayout menuItems={menuItems} title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Statistics</h1>
          <p className="text-muted-foreground">Monitor user activities and registration trends</p>
        </div>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">{users.length}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-accent">
                {users.filter(u => u.status === "Active").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {((users.filter(u => u.status === "Active").length / users.length) * 100 || 0).toFixed(1)}% of total users
              </p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Signups</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">{users.length > 0 ? 1 : 0}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">24m</div>
              <p className="text-xs text-muted-foreground">Session duration</p>
            </CardContent>
          </Card>
        </div>

        {/* User list */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "Inactive"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">Joined: {user.joinDate}</p>

                      <button
                        onClick={() => handleDelete(user._id)}
                        className="mt-2 px-3 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserStatistics;
