import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: Array<{
    label: string;
    href: string;
    icon: React.ElementType;
  }>;
  title: string;
}

const DashboardLayout = ({ children, menuItems, title }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-2 left-2 z-50">
        <Button
          variant="outline"
          size="xs"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-neutral-400/20 hover:bg-neutral-400/30 text-black backdrop-blur-xs border-neutral-400"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <h2 className="text-xl font-bold text-sidebar-foreground">{title}</h2>
            <p className="text-sm text-sidebar-foreground/70">{user?.name}</p>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground hover:bg-sidebar-accent'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;