"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Languages, Building2, User, Loader2, Mail, Lock, UserCircle, Globe } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import LanguageSelector from '@/components/LanguageSelector';
import Logo from '@/components/Logo';

const Signup = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [nativeLang, setNativeLang] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [userRole, setUserRole] = useState("company");

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validatePassword = (pass: string) => {
    return pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass);
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName || !email || !password) {
      toast({ title: "Missing Fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }

    if (!validatePassword(password)) {
      toast({ 
        title: "Weak Password", 
        description: "Password must be at least 8 characters with an uppercase letter and a number.", 
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            native_language: userRole === 'translator' ? nativeLang : null,
            role: userRole,
            company_name: userRole === 'company' ? companyName : null,
            company_url: userRole === 'company' ? companyUrl : null,
          }
        }
      });

      if (error) {
        throw error;
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a verification link to complete your registration.",
        });
        navigate('/login');
      }
    } catch (err: any) {
      const isNetworkError = err.message === 'Failed to fetch';
      toast({
        title: "Registration Failed",
        description: isNetworkError 
          ? "Connection error: Unable to reach the authentication server. Please check if your Supabase instance is online." 
          : err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        
        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
          <CardHeader className="space-y-1 pb-6 text-center bg-white">
            <CardTitle className="text-3xl font-black text-indigo-950">Create Account</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Join the Tranzlo community today.
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            <Tabs defaultValue="company" className="w-full" onValueChange={setUserRole}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1 rounded-2xl h-14">
                <TabsTrigger value="company" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
                  <Building2 className="w-4 h-4 mr-2" /> Company
                </TabsTrigger>
                <TabsTrigger value="translator" className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-indigo-600 data-[state=active]:shadow-sm">
                  <User className="w-4 h-4 mr-2" /> Translator
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSignupSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="full-name" 
                      placeholder="Jane Doe" 
                      required 
                      className="h-12 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)} 
                    />
                  </div>
                </div>

                {userRole === 'company' && (
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        id="company-name" 
                        placeholder="Tranzlo Inc." 
                        required 
                        className="h-12 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500" 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)} 
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="jane@example.com" 
                      required 
                      className="h-12 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      id="password" 
                      type="password" 
                      required 
                      className="h-12 pl-10 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black text-lg shadow-lg shadow-indigo-100 mt-4" disabled={loading}>
                  {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Sign Up Now"}
                </Button>
              </form>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-10 bg-white border-t border-slate-50 pt-6">
            <div className="text-sm text-center text-slate-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-black hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;