import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Shield, Users, Activity, AlertTriangle, CheckCircle, XCircle, Eye, Globe, Lock, MonitorCog,FileText } from "lucide-react";

const BlockChain = () => {
  const menuItems = [
     { label: "Dashboard", href: "/admin/dashboard", icon: BarChart },
    { label: "System Status", href: "/admin/system-status", icon: MonitorCog },
    { label: "User Statistics", href: "/admin/user-statistics", icon: Users },
    { label: "Security Reports", href: "/admin/security-reports", icon: Shield },
    { label: "Blockchain", href: "/admin/blockchain", icon: Globe },
    { label: "System Logs", href: "/admin/system-logs", icon: Activity },
    { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
    
  ];

  const transactions = [
    { hash: '0x1a2b...3c4d', function: 'registerUser', from: '0xAlice...', gas: '21,000', status: 'Success', time: '2 mins ago' },
    { hash: '0x5e6f...7g8h', function: 'assignRole', from: '0xBob...', gas: '45,000', status: 'Success', time: '5 mins ago' },
    { hash: '0x9i0j...1k2l', function: 'updatePermissions', from: '0xCharlie...', gas: '32,000', status: 'Failed', time: '8 mins ago' },
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
<div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Blockchain Status</h2>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-green-600 font-medium">Connected to Ethereum Mainnet</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Network Info</h3>
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Network:</span>
              <span className="text-sm font-medium text-gray-900">Ethereum</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Chain ID:</span>
              <span className="text-sm font-medium text-gray-900">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Latest Block:</span>
              <span className="text-sm font-medium text-gray-900">18,234,567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gas Price:</span>
              <span className="text-sm font-medium text-gray-900">25 Gwei</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Smart Contract</h3>
            <Lock className="w-6 h-6 text-green-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Address:</span>
              <span className="text-sm font-mono text-blue-600">0xABC...123</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Version:</span>
              <span className="text-sm font-medium text-gray-900">v1.2.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Users:</span>
              <span className="text-sm font-medium text-gray-900">1,247</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Today:</span>
              <span className="text-sm font-medium text-gray-900">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">This Week:</span>
              <span className="text-sm font-medium text-gray-900">1,023</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total:</span>
              <span className="text-sm font-medium text-gray-900">15,467</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Failed:</span>
              <span className="text-sm font-medium text-red-600">23</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        
        {/* Mobile view */}
        <div className="sm:hidden">
          {transactions.map((tx, index) => (
            <div key={index} className="p-4 border-b border-gray-200 last:border-b-0">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-mono text-blue-600 truncate flex-1 mr-2">
                  {tx.hash}
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  tx.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {tx.status}
                </span>
              </div>
              <div className="text-sm text-gray-900 mb-1">{tx.function}</div>
              <div className="text-sm font-mono text-gray-600 mb-1">{tx.from}</div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Gas: {tx.gas}</span>
                <span>{tx.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TX Hash</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Function</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gas Used</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-blue-600">
                    {tx.hash}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.function}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                    {tx.from}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {tx.gas}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      tx.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {tx.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default BlockChain;