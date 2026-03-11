"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Languages, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) toast({ title: "Login Error", description: error.message, variant: "destructive" });
  };

  const handleLinkedInLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) toast({ title: "Login Error", description: error.message, variant: "destructive" });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({ title: "Welcome back!", description: "Successfully logged in." });
      navigate('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <Languages className="h-10 w-10 text-indigo-600" />
            <span className="text-3xl font-bold tracking-tight text-indigo-900">Tranzlo</span>
          </Link>
        </div>
        
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Login to access your Tranzlo account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {!showEmailForm ? (
              <>
                <Button 
                  variant="outline" 
                  className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-3"
                  onClick={handleGoogleLogin}
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pjax/google.png" className="w-5 h-5" alt="Google" />
                  Continue with Google
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-3"
                  onClick={handleLinkedInLogin}
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" className="w-5 h-5" alt="LinkedIn" />
                  Continue with LinkedIn
                </Button>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="h-12 rounded-xl text-slate-600 hover:text-indigo-600"
                  onClick={() => setShowEmailForm(true)}
                >
                  <Mail className="mr-2 h-4 w-4" /> Sign in with Email
                </Button>
              </>
            ) : (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="name@example.com" 
                      required 
                      className="h-11 pl-10 rounded-xl" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" className="text-xs text-indigo-600 font-medium hover:underline">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      className="h-11 pl-10 rounded-xl" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold mt-2" disabled={loading}>
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign In"}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full h-10 rounded-xl text-slate-500"
                  onClick={() => setShowEmailForm(false)}
                >
                  Back to social login
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-8">
            <div className="text-sm text-center text-slate-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;