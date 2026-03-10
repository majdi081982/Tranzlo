"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Languages, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { account } from '@/lib/appwrite';
import { OAuthProvider } from 'appwrite';

const Login = () => {
  const handleGoogleLogin = () => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/login`
    );
  };

  const handleLinkedInLogin = () => {
    account.createOAuth2Session(
      OAuthProvider.Linkedin,
      `${window.location.origin}/`,
      `${window.location.origin}/login`
    );
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

            <Button variant="ghost" className="h-12 rounded-xl text-slate-600 hover:text-indigo-600">
              <Mail className="mr-2 h-4 w-4" /> Sign in with Email
            </Button>
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