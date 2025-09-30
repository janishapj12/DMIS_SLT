// src/pages/Signup.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";
import HeroGradient from "../components/HeroGradient/HeroGradient.js";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await signup(username, email, fullName, password);
      if (success) {
        toast({
          title: "Account created",
          description: "Welcome to TechCorp!",
        });
        navigate('/user/dashboard');
      } else {
        toast({
          title: "Signup failed",
          description: "Unable to create account",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <HeroGradient />
      <div className="header-container min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md dashboard-card bg-neutral-400/20 hover:bg-neutral-400/30 text-neutral-50 backdrop-blur-md border-neutral-400">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <UserPlus className="w-12 h-12 text-neutral-200" />
            </div>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription className="text-neutral-200">
              Sign up for a new user account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} className="bg-neutral-400/20" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" type="text" placeholder="Enter your full name" value={fullName} onChange={e => setFullName(e.target.value)} className="bg-neutral-400/20" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="bg-neutral-400/20" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} className="bg-neutral-400/20" required />
              </div>
              <Button type="submit" className="w-full hover:bg-blue-800" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <p className="text-neutral-200">
                Already have an account? <Link to="/login" className="text-neutral-50 font-extrabold hover:underline">Sign in</Link>
              </p>
              <p className="text-muted-foreground mt-2">
                <Link to="/" className="text-neutral-50 font-extrabold hover:underline">Back to Home</Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Signup;
