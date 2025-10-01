import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Shield, Users, Activity, Search, Filter, AlertCircle, CheckCircle, Info, AlertTriangle, Globe, MonitorCog,FileText } from "lucide-react";
import { useState } from "react";

const SystemLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: BarChart },
    { label: "System Status", href: "/admin/system-status", icon: MonitorCog },
    { label: "User Statistics", href: "/admin/user-statistics", icon: Users },
    { label: "Security Reports", href: "/admin/security-reports", icon: Shield },
    { label: "Blockchain", href: "/admin/blockchain", icon: Globe },
    { label: "System Logs", href: "/admin/system-logs", icon: Activity },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
  ];

  const logs = [
    {
      id: 1,
      timestamp: "2024-01-16 14:30:25",
      level: "error",
      source: "Authentication Service",
      message: "Failed login attempt for user: admin@techcorp.com",
      details: "Invalid credentials provided. IP: 192.168.1.45"
    },
    {
      id: 2,
      timestamp: "2024-01-16 14:28:15",
      level: "info",
      source: "User Management",
      message: "New user registration completed",
      details: "User ID: 1247, Email: newuser@example.com"
    },
    {
      id: 3,
      timestamp: "2024-01-16 14:25:42",
      level: "warning",
      source: "Database Service",
      message: "High memory usage detected",
      details: "Memory usage at 85%. Consider scaling resources."
    },
    {
      id: 4,
      timestamp: "2024-01-16 14:22:18",
      level: "error",
      source: "File Storage",
      message: "Upload failed due to insufficient storage",
      details: "Available space: 2.3GB, Required: 5.1GB"
    },
    {
      id: 5,
      timestamp: "2024-01-16 14:20:03",
      level: "info",
      source: "Backup Service",
      message: "Automated backup completed successfully",
      details: "Backup size: 12.4GB, Duration: 45 minutes"
    },
    {
      id: 6,
      timestamp: "2024-01-16 14:15:36",
      level: "warning",
      source: "API Gateway",
      message: "Rate limit exceeded for client",
      details: "Client IP: 10.0.0.23, Requests: 1000/hour"
    },
    {
      id: 7,
      timestamp: "2024-01-16 14:12:44",
      level: "info",
      source: "System Maintenance",
      message: "Scheduled maintenance task completed",
      details: "Cache cleanup completed. 2.1GB freed."
    },
    {
      id: 8,
      timestamp: "2024-01-16 14:10:22",
      level: "error",
      source: "Email Service",
      message: "SMTP server connection failed",
      details: "Unable to connect to mail.techcorp.com:587"
    },
  ];

  const getLogIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-600" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === "all" || log.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const logCounts = {
    error: logs.filter(log => log.level === "error").length,
    warning: logs.filter(log => log.level === "warning").length,
    info: logs.filter(log => log.level === "info").length,
    total: logs.length
  };

  return (
    <DashboardLayout menuItems={menuItems} title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Logs</h1>
          <p className="text-muted-foreground">Monitor system events, errors, and activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Logs</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">{logCounts.total}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Errors</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-destructive">{logCounts.error}</div>
              <p className="text-xs text-muted-foreground">Critical issues</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warnings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-yellow-600">{logCounts.warning}</div>
              <p className="text-xs text-muted-foreground">Attention needed</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Info</CardTitle>
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-blue-600">{logCounts.info}</div>
              <p className="text-xs text-muted-foreground">System events</p>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Log Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-48">
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="error">Errors</SelectItem>
                    <SelectItem value="warning">Warnings</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>System Logs ({filteredLogs.length} entries)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getLogIcon(log.level)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getLogLevelBadge(log.level)}`}>
                            {log.level.toUpperCase()}
                          </span>
                          <span className="text-sm text-muted-foreground">{log.source}</span>
                        </div>
                        <h3 className="font-medium text-sm">{log.message}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredLogs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No logs match your current filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SystemLogs;