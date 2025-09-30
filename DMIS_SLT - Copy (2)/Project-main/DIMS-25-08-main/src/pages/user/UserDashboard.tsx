import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, User, Settings, FileText, Bell, Shield, Clock, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();

  const menuItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: BarChart3 },
    { label: "Profile", href: "/user/profile", icon: User },
    { label: "Blockchain", href: "/user/blockchain-user", icon: Globe },
   
  ];

  const recentActivities = [
    { action: "Profile updated", timestamp: "2 hours ago", type: "update" },
    { action: "Password changed", timestamp: "1 day ago", type: "security" },
    { action: "Login from new device", timestamp: "3 days ago", type: "access" },
    { action: "Email preferences updated", timestamp: "1 week ago", type: "update" },
  ];

  const securityAlerts = [
    { message: "Your password will expire in 14 days", type: "warning", urgent: false },
    { message: "New login from Chrome on Windows", type: "info", urgent: false },
    { message: "Security settings updated", type: "success", urgent: false },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "security":
        return <Shield className="w-4 h-4 text-blue-600" />;
      case "access":
        return <User className="w-4 h-4 text-green-600" />;
      case "update":
        return <Settings className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
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

  return (
    <DashboardLayout menuItems={menuItems} title="User Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Here's an overview of your account activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Completion
                {user?.email}
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-accent">85%</div>
              <p className="text-xs text-muted-foreground">Complete your profile</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-primary">Good</div>
              <p className="text-xs text-muted-foreground">Your account is secure</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Login</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-sm">Today</div>
              <p className="text-xs text-muted-foreground">2 hours ago</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                View All Activities
              </Button>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Security Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityAlerts.map((alert, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                Manage Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <User className="w-4 h-4 mr-2" />
                Update Profile
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Shield className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Download Data
              </Button>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Member since</span>
                <span className="text-sm font-medium">January 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total logins</span>
                <span className="text-sm font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Profile updates</span>
                <span className="text-sm font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Security events</span>
                <span className="text-sm font-medium">3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;