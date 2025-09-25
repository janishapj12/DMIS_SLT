import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  Save } from "lucide-react";
import { BarChart3, User, Settings, FileText, Bell, Shield, Clock, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Profile = () => {
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    full_name: "",
    email: "",
    role: ""
  });

  useEffect(() => {
    if (!user || !token) return; // wait until token is available

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setProfile({
            username: res.data.data.user.username,
            full_name: res.data.data.user.full_name,
            email: res.data.data.user.email,
            role: res.data.data.user.role
          });
        }
      } catch (err) {
        toast({ title: "Error", description: "Failed to fetch user data", variant: "destructive" });
      }
    };

    fetchUser();
  }, [user, token, toast]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) return;
    setLoading(true);

    try {
      const { username, full_name, email } = profile;
      const res = await axios.put(`http://localhost:5000/api/users/${user.id}`,
        { username, full_name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast({ title: "Profile updated", description: "Your profile information has been saved." });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to update profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="User Dashboard" menuItems={[
       { label: "Dashboard", href: "/user/dashboard", icon: BarChart3 },
    { label: "Profile", href: "/user/profile", icon: User },
    { label: "Blockchain", href: "/user/blockchain-user", icon: Globe },
    
    ]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account information</p>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={profile.username} onChange={e => setProfile(prev => ({ ...prev, username: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={profile.full_name} onChange={e => setProfile(prev => ({ ...prev, full_name: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={profile.email} onChange={e => setProfile(prev => ({ ...prev, email: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={profile.role} disabled /> {/* readonly */}
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                <Save className="w-4 h-4 mr-2" /> {loading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
