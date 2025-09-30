import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Shield, Users, Activity, AlertTriangle, CheckCircle, XCircle, Eye, Globe, MonitorCog,FileText } from "lucide-react";

const SecurityReports = () => {
  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: BarChart },
    { label: "System Status", href: "/admin/system-status", icon: MonitorCog },
    { label: "User Statistics", href: "/admin/user-statistics", icon: Users },
    { label: "Security Reports", href: "/admin/security-reports", icon: Shield },
    { label: "Blockchain", href: "/admin/blockchain", icon: Globe },
    { label: "System Logs", href: "/admin/system-logs", icon: Activity },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
    
  ];

  const securityAlerts = [
    {
      id: 1,
      type: "Failed Login Attempts",
      severity: "high",
      count: 15,
      lastOccurrence: "5 minutes ago",
      source: "192.168.1.45"
    },
    {
      id: 2,
      type: "Suspicious API Calls",
      severity: "medium",
      count: 8,
      lastOccurrence: "1 hour ago",
      source: "10.0.0.23"
    },
    {
      id: 3,
      type: "Unauthorized Access Attempt",
      severity: "high",
      count: 3,
      lastOccurrence: "2 hours ago",
      source: "External"
    },
    {
      id: 4,
      type: "Malware Detection",
      severity: "critical",
      count: 1,
      lastOccurrence: "3 hours ago",
      source: "Email Gateway"
    },
  ];

  const vulnerabilities = [
    {
      id: 1,
      title: "Outdated SSL Certificate",
      severity: "medium",
      status: "resolved",
      reportDate: "2024-01-10"
    },
    {
      id: 2,
      title: "Weak Password Policy",
      severity: "high",
      status: "pending",
      reportDate: "2024-01-08"
    },
    {
      id: 3,
      title: "Unencrypted Data Transfer",
      severity: "critical",
      status: "in-progress",
      reportDate: "2024-01-05"
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "in-progress":
        return <Eye className="w-4 h-4 text-blue-600" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  return (
    <DashboardLayout menuItems={menuItems} title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Reports</h1>
          <p className="text-muted-foreground">Monitor security alerts and vulnerability assessments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-accent">85/100</div>
              <p className="text-xs text-muted-foreground">Good security posture</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-destructive">27</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">12</div>
              <p className="text-xs text-muted-foreground">3 critical, 5 high, 4 medium</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-accent">1,423</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Recent Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    <div>
                      <h3 className="font-medium">{alert.type}</h3>
                      <p className="text-sm text-muted-foreground">Source: {alert.source}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.count} occurrences • {alert.lastOccurrence}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Vulnerability Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilities.map((vuln) => (
                  <div key={vuln.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(vuln.status)}
                      <div>
                        <h3 className="font-medium text-sm">{vuln.title}</h3>
                        <p className="text-xs text-muted-foreground">Reported: {vuln.reportDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(vuln.severity)}`}>
                        {vuln.severity.toUpperCase()}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{vuln.status.replace('-', ' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Security Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Firewall Effectiveness</span>
                  <span className="text-sm">94%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Intrusion Detection</span>
                  <span className="text-sm">87%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Data Encryption</span>
                  <span className="text-sm">98%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Access Control</span>
                  <span className="text-sm">91%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SecurityReports;