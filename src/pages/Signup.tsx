"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Languages, Building2, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Logic for Appwrite registration would go here
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });
    }, 1500);
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
            <Tabs defaultValue="company" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 p-1 rounded-xl h-12">
                <TabsTrigger value="company" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <Building2 className="w-4 h-4 mr-2" /> Company
                </TabsTrigger>
                <TabsTrigger value="translator" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  <User className="w-4 h-4 mr-2" /> Translator
                </TabsTrigger>
              </TabsList>

              <TabsContent value="company">
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="comp-name">Full Name</Label>
                    <Input id="comp-name" placeholder="John Doe" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Acme Inc." required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comp-email">Work Email</Label>
                    <Input id="comp-email" type="email" placeholder="john@company.com" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-url">Company URL (Optional)</Label>
                    <Input id="company-url" type="url" placeholder="https://company.com" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comp-password">Password</Label>
                    <Input id="comp-password" type="password" required className="h-11 rounded-xl" />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold mt-4" disabled={loading}>
                    {loading ? "Creating Account..." : "Sign up as Company"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="translator">
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trans-name">Full Name</Label>
                    <Input id="trans-name" placeholder="Jane Smith" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trans-email">Email Address</Label>
                    <Input id="trans-email" type="email" placeholder="jane@example.com" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="native-lang">Native Language</Label>
                    <Input id="native-lang" placeholder="e.g. Spanish" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trans-password">Password</Label>
                    <Input id="trans-password" type="password" required className="h-11 rounded-xl" />
                  </div>
                  <Button type="submit" className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold mt-4" disabled={loading}>
                    {loading ? "Creating Account..." : "Sign up as Translator"}
                  </Button>
                </form>
              </TabsContent>
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