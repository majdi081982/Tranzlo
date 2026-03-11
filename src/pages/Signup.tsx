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

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validatePassword = (pass: string) => {
    const hasUppercase = /[A-Z]/.test(pass);
    const hasLowercase = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const isLongEnough = pass.length >= 8;
    return hasUppercase && hasLowercase && hasNumber && isLongEnough;
  };

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  const handleLinkedInSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: { redirectTo: window.location.origin }
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fullName || !email || !password) {
      toast({ title: "Required Fields", description: "Please fill in all basic information.", variant: "destructive" });
      return;
    }

    if (userRole === 'company' && !companyName) {
      toast({ title: "Required Field", description: "Company Name is required for business accounts.", variant: "destructive" });
      return;
    }

    if (userRole === 'translator' && !nativeLang) {
      toast({ title: "Required Field", description: "Please select your native language.", variant: "destructive" });
      return;
    }

    if (!validatePassword(password)) {
      toast({ 
        title: "Weak Password", 
        description: "Password must be at least 8 characters long and include uppercase, lowercase, and a number.", 
        variant: "destructive" 
      });
      return;
    }

    setLoading(true);
    
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
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Registration Successful!",
        description: "Please check your email to verify your account.",
      });
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 py-12">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <Languages className="h-10 w-10 text-indigo-600" />
            <span className="text-3xl font-bold tracking-tight text-indigo-900">Tranzlo</span>
          </Link>
        </div>
        
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Join Tranzlo today and start translating.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Button 
                variant="outline" 
                className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-3 text-slate-700 font-medium"
                onClick={handleGoogleSignup}
              >
                <FcGoogle className="w-5 h-5" />
                Google
              </Button>
              <Button 
                variant="outline" 
                className="h-12 rounded-xl border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-3 text-slate-700 font-medium"
                onClick={handleLinkedInSignup}
              >
                <FaLinkedin className="w-5 h-5 text-[#0077b5]" />
                LinkedIn
              </Button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or register with email</span>
              </div>
            </div>

            <Tabs defaultValue="company" className="w-full" onValueChange={setUserRole}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1 rounded-xl h-12">
                <TabsTrigger value="company" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Building2 className="w-4 h-4 mr-2" /> Company
                </TabsTrigger>
                <TabsTrigger value="translator" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <User className="w-4 h-4 mr-2" /> Translator
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name <span className="text-red-500">*</span></Label>
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        id="full-name" 
                        placeholder="John Doe" 
                        required 
                        className="h-11 pl-10 rounded-xl" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                      />
                    </div>
                  </div>

                  {userRole === 'company' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name <span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input 
                            id="company-name" 
                            placeholder="Acme Corp" 
                            required 
                            className="h-11 pl-10 rounded-xl" 
                            value={companyName} 
                            onChange={(e) => setCompanyName(e.target.value)} 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-url">Company Website (Optional)</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input 
                            id="company-url" 
                            type="url"
                            placeholder="https://example.com" 
                            className="h-11 pl-10 rounded-xl" 
                            value={companyUrl} 
                            onChange={(e) => setCompanyUrl(e.target.value)} 
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
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
                  
                  {userRole === 'translator' && (
                    <div className="space-y-2">
                      <Label htmlFor="native-lang">Native Language <span className="text-red-500">*</span></Label>
                      <LanguageSelector 
                        id="native-lang" 
                        value={nativeLang} 
                        onValueChange={setNativeLang} 
                        placeholder="Select your native language"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
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
                    <p className="text-[10px] text-slate-500">Min. 8 characters, with uppercase, lowercase, and a number.</p>
                  </div>
                  <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold mt-4" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : `Sign up as ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`}
                  </Button>
                </form>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 pb-8">
            <div className="text-sm text-center text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-bold hover:underline">
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