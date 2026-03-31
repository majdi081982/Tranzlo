import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border/40 glass bg-background/50 shadow-xl space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Enter your email to sign in to your account</p>
        </div>
        
        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="name@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required 
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
              <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <input 
              id="password" 
              type="password" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required 
            />
          </div>
          
          <button type="submit" className="w-full h-10 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
            Sign In
          </button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/40" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-4 text-muted-foreground font-medium rounded-full border border-border/40">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 h-10 bg-background border border-border/60 shadow-sm rounded-md hover:bg-muted transition-colors text-sm font-medium">
            Google
          </button>
          <button className="flex items-center justify-center gap-2 h-10 bg-background border border-border/60 shadow-sm rounded-md hover:bg-muted transition-colors text-sm font-medium">
            LinkedIn
          </button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
