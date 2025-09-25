import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Shield, Users, BarChart3 } from "lucide-react";
import HeroGradient from "../components/HeroGradient/HeroGradient.tsx";

const Index = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="fixed inset-0 w-screen h-screen z-[-1]">
        <HeroGradient />
      </div> 
    <div className="header-container min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-neutral-50 mb-4">
            TechCorp Dashboard
          </h1>
          <p className="text-xl text-neutral-400  mb-8">
            Professional admin and user management system
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/login')} size="lg" className="hover:bg-blue-800">
              Login
            </Button>
            <Button onClick={() => navigate('/signup')} variant="w2b" size="lg">
              Sign Up
            </Button>

            <Button onClick={() => navigate('/bio')} variant="w2b" size="lg">
              Bio
            </Button>
            
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl lg:max-w-full mx-auto">
          <Card className="dashboard-card text-center bg-neutral-400/20 hover:bg-neutral-400/30 text-neutral-50 backdrop-blur-md border-neutral-400">
            <Shield className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Admin Control</h3>
            <p className="text-neutral-200">
              Comprehensive system monitoring and user management
            </p>
          </Card>

          <Card className="dashboard-card text-center bg-neutral-400/20 hover:bg-neutral-400/30 text-neutral-50 backdrop-blur-md border-neutral-400">
            <Users className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
            <p className="text-neutral-200">
              Personal profile management and audit logs
            </p>
          </Card>

          <Card className="dashboard-card text-center bg-neutral-400/20 hover:bg-neutral-400/30 text-neutral-50 backdrop-blur-md border-neutral-400">
            <BarChart3 className="w-12 h-12 text-neutral-200 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-neutral-200">
              Real-time system statistics and security reports
            </p>
          </Card>
        </div>

        
      </div>
    </div>
    </section>
  );
};

export default Index;