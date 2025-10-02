import React, { useState, useEffect } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { User, Wallet } from "lucide-react";
import HeroGradient from "@/components/HeroGradient/HeroGradient";
import axios from "axios";


declare global {
  interface Window {
    ethereum?: any;
  }
}


const API_BASE_URL = 'http://localhost:5000/api/auth';

// Convert ArrayBuffer <-> base64url
const arrayBufferToBase64url = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let str = '';
  bytes.forEach(b => str += String.fromCharCode(b));
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const base64urlToArrayBuffer = (str: string) => {
  const binary = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

const BiometricAuth: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('user@example.com'); // can be dynamic input
  const navigate = useNavigate();

  useEffect(() => {
    setIsSupported(!!window.PublicKeyCredential);
    const registered = localStorage.getItem(`biometric_registered_${username}`);
    setIsRegistered(!!registered);
  }, [username]);

  // ---------------- Registration ----------------
  const registerBiometric = async () => {
    try {
      setStatus('Registering...');
      const res = await fetch(`${API_BASE_URL}/register-begin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const options = await res.json();

      options.challenge = base64urlToArrayBuffer(options.challenge);
      options.user.id = base64urlToArrayBuffer(options.user.id);

      const cred = await navigator.credentials.create({ publicKey: options }) as PublicKeyCredential;

      const payload = {
        username,
        response: {
          credentialId: arrayBufferToBase64url(cred.rawId),
          attestationObject: arrayBufferToBase64url((cred.response as AuthenticatorAttestationResponse).attestationObject),
          clientDataJSON: arrayBufferToBase64url((cred.response as AuthenticatorAttestationResponse).clientDataJSON)
        }
      };

      const verifyRes = await fetch(`${API_BASE_URL}/register-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await verifyRes.json();
      if (result.success) {
        setStatus('Registration successful');
        setIsRegistered(true);
        localStorage.setItem(`biometric_registered_${username}`, 'true');
        navigate('/user/dashboard');
      } else {
        setStatus(result.error || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('Registration failed');
    }
  };

  // ---------------- Authentication ----------------
  const authenticateBiometric = async () => {
    try {
      setStatus('Authenticating...');
      const res = await fetch(`${API_BASE_URL}/authenticate-begin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      });
      const options = await res.json();

      options.challenge = base64urlToArrayBuffer(options.challenge);
      options.allowCredentials = options.allowCredentials.map((c: any) => ({
        ...c,
        id: base64urlToArrayBuffer(c.id)
      }));

      const cred = await navigator.credentials.get({ publicKey: options }) as PublicKeyCredential;

      const payload = {
        username,
        response: {
          credentialId: arrayBufferToBase64url(cred.rawId),
          authenticatorData: arrayBufferToBase64url((cred.response as AuthenticatorAssertionResponse).authenticatorData),
          clientDataJSON: arrayBufferToBase64url((cred.response as AuthenticatorAssertionResponse).clientDataJSON),
          signature: arrayBufferToBase64url((cred.response as AuthenticatorAssertionResponse).signature),
          userHandle: (cred.response as AuthenticatorAssertionResponse).userHandle
            ? arrayBufferToBase64url((cred.response as AuthenticatorAssertionResponse).userHandle!)
            : null
        }
      };

      const verifyRes = await fetch(`${API_BASE_URL}/authenticate-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await verifyRes.json();
      if (result.success) {
        setStatus('Authentication successful');
        localStorage.setItem('auth_token', result.token);
        navigate('/user/dashboard');
      } else {
        setStatus(result.error || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('Authentication failed');
    }
  };

  if (!isSupported) return <div>WebAuthn is not supported in this browser.</div>;

  return (
    // <div style={{ padding: 20 }}>
    //   <input
    //     type="email"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //     placeholder="Enter your email"
    //     style={{ marginBottom: 10, padding: 5 }}
    //   />
    //   {!isRegistered ? (
    //     <button onClick={registerBiometric}>Register Biometric</button>
    //   ) : (
    //     <button onClick={authenticateBiometric}>Authenticate</button>
    //   )}
    //   <p>{status}</p>
    // </div>
    
    <section>
  <HeroGradient />
  <div className="header-container min-h-screen flex items-center justify-center p-4">
    <Card className="w-full max-w-md dashboard-card bg-neutral-400/20 hover:bg-neutral-400/30 text-neutral-50 backdrop-blur-md border-neutral-400">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <User className="w-12 h-12 text-neutral-200" />
        </div>
        <CardTitle className="text-2xl">Biometric Login</CardTitle>
        <CardDescription className="text-neutral-200">
          Use your email and biometric authentication to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your email"
              className="bg-neutral-400/20"
              required
            />
          </div>

          {!isRegistered ? (
            <Button onClick={registerBiometric} className="w-full">
              Register Biometric
            </Button>
          ) : (
            <Button onClick={authenticateBiometric} className="w-full">
              Authenticate
            </Button>
          )}

          <p className="text-sm text-center text-neutral-200">{status}</p>
        </div>
      </CardContent>
    </Card>
  </div>
</section>


  );
};

export default BiometricAuth;
