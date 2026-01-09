import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Shield, Users, Activity, Server, CheckCircle, XCircle, AlertCircle, Globe, MonitorCog,FileText } from "lucide-react";

const SystemStatus = () => {
  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: BarChart },
    { label: "System Status", href: "/admin/system-status", icon: MonitorCog },
    { label: "User Statistics", href: "/admin/user-statistics", icon: Users },
    { label: "Security Reports", href: "/admin/security-reports", icon: Shield },
    { label: "Blockchain", href: "/admin/blockchain", icon: Globe },
    { label: "System Logs", href: "/admin/system-logs", icon: Activity },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
    
  ];

  const services = [
    { name: "Web Server", status: "online", uptime: "99.9%", lastCheck: "2 min ago" },
    { name: "Database", status: "online", uptime: "99.7%", lastCheck: "1 min ago" },
    { name: "API Gateway", status: "online", uptime: "100%", lastCheck: "30 sec ago" },
    { name: "File Storage", status: "warning", uptime: "98.2%", lastCheck: "5 min ago" },
    { name: "Email Service", status: "offline", uptime: "95.1%", lastCheck: "1 hour ago" },
    { name: "Backup System", status: "online", uptime: "99.5%", lastCheck: "10 min ago" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="w-5 h-5 text-accent" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "offline":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "offline":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DashboardLayout menuItems={menuItems} title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Status</h1>
          <p className="text-muted-foreground">Monitor system health and service availability</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Health</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-accent">98.5%</div>
              <p className="text-xs text-muted-foreground">System uptime</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Services Online</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">4/6</div>
              <p className="text-xs text-muted-foreground">Active services</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">142ms</div>
              <p className="text-xs text-muted-foreground">Average response</p>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(service.status)}`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Last check: {service.lastCheck}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Server Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm">68%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Disk Usage</span>
                  <span className="text-sm">32%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Network Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Incoming Traffic</span>
                <span className="text-sm font-medium">1.2 GB/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Outgoing Traffic</span>
                <span className="text-sm font-medium">850 MB/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Connections</span>
                <span className="text-sm font-medium">2,347</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Failed Requests</span>
                <span className="text-sm font-medium text-destructive">12</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SystemStatus;