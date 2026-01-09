import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Shield, Users, Activity, FileText, Globe, MonitorCog } from "lucide-react";
import { LogIn, Eye, User, Search, Filter, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

interface AuditLog {
  _id: string;
  action: string;
  description?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  type?: string;
  createdAt: string;
}

const AuditLogs = () => {
  const { user } = useAuth();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [error, setError] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 10;

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: BarChart },
    { label: "System Status", href: "/admin/system-status", icon: MonitorCog },
    { label: "User Statistics", href: "/admin/user-statistics", icon: Users },
    { label: "Security Reports", href: "/admin/security-reports", icon: Shield },
    { label: "Blockchain", href: "/admin/blockchain", icon: Globe },
    { label: "System Logs", href: "/admin/system-logs", icon: Activity },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
  ];

  const fetchAuditLogs = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("http://localhost:5000/api/audit-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const logsArray = Array.isArray(res.data.data) ? res.data.data : [];
      setAuditLogs(logsArray.reverse());
    } catch (err) {
      console.error("Error fetching audit logs:", err);
      setError("Failed to load audit logs. Please try again.");
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const getActionIcon = (type?: string) => {
    switch (type) {
      case "auth": return <LogIn className="w-4 h-4 text-blue-600" />;
      case "security": return <Shield className="w-4 h-4 text-red-600" />;
      case "profile": return <User className="w-4 h-4 text-green-600" />;
      case "access": return <Eye className="w-4 h-4 text-purple-600" />;
      default: return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionBadge = (type?: string) => {
    switch (type) {
      case "auth": return "bg-blue-100 text-blue-800 border-blue-200";
      case "security": return "bg-red-100 text-red-800 border-red-200";
      case "profile": return "bg-green-100 text-green-800 border-green-200";
      case "access": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      (log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       (log.details || log.description || "").toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  return (
    <DashboardLayout menuItems={menuItems} title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">View your account activity and security events</p>
        </div>

        {/* Filters */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Activity Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="auth">Authentication</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="profile">Profile</SelectItem>
                    <SelectItem value="access">Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity History */}
        {error && <p className="text-center text-red-600">{error}</p>}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Activity History ({filteredLogs.length} entries)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentLogs.length === 0 && (
              <p className="text-center py-8 text-muted-foreground">
                No activities match your current filters.
              </p>
            )}
            {currentLogs.map((log) => (
              <div key={log._id} className="border rounded-lg p-4 flex justify-between items-start space-x-3">
                <div className="flex items-start space-x-3">
                  {getActionIcon(log.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getActionBadge(log.type)}`}>
                        {log.type ? log.type.toUpperCase() : ""}
                      </span>
                      <h3 className="font-medium text-sm">{log.action}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{log.details || log.description}</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>IP Address: {log.ipAddress || "N/A"}</p>
                      <p>User Agent: {log.userAgent || "N/A"}</p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-blue-500 text-white" : ""}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
