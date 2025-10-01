import DashboardLayout from "@/components/DashboardLayout";
import { Globe, User, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

interface ChainUser { username: string; full_name: string; email: string; role: string; }

const BlockChainUser = () => {
  const { user, token } = useAuth();
  const [chainUser, setChainUser] = useState<ChainUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const menuItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: BarChart3 },
    { label: "Profile", href: "/user/profile", icon: User },
    { label: "Blockchain", href: "/user/blockchain-user", icon: Globe },
  ];

  const fetchChainUser = async () => {
    if (!user?.walletAddress || !token) return;
    setLoading(true); setError(null);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/get-chain-user",
        { walletAddress: user.walletAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success && res.data.data.chainUser) setChainUser(res.data.data.chainUser);
      else { setChainUser(null); setError("No blockchain data found."); }
    } catch (err: any) {
      setChainUser(null); setError(err.response?.data?.message || "Error fetching blockchain data.");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchChainUser(); }, [user, token]);

  return (
    <DashboardLayout menuItems={menuItems} title="Blockchain User">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Blockchain User Info</h2>
        {loading && <p>Loading blockchain data...</p>}
        {!loading && error && <p className="text-red-500">{error}</p>}
        {!loading && chainUser && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
              <h3 className="font-semibold mb-2">User Details</h3>
              <p><strong>Username:</strong> {chainUser.username}</p>
              <p><strong>Full Name:</strong> {chainUser.full_name}</p>
              <p><strong>Email:</strong> {chainUser.email}</p>
              <p><strong>Role:</strong> {chainUser.role}</p>
              <p><strong>Wallet Address:</strong> {user.walletAddress}</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BlockChainUser;
