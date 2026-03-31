import Link from 'next/link';
import { Globe, Building, User } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl border border-border/40 glass bg-background/50 shadow-xl space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Globe className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Join Tranzlo to connect globally</p>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm font-medium text-center">I am registering as a...</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 p-4 border border-input rounded-xl hover:border-primary hover:bg-primary/5 transition-all outline-none focus:ring-2 focus:ring-primary h-24 shadow-sm group bg-background">
              <Building className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">Company</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 border border-input rounded-xl hover:border-primary hover:bg-primary/5 transition-all outline-none focus:ring-2 focus:ring-primary h-24 shadow-sm group bg-background">
              <User className="h-6 w-6 text-foreground/70 group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium">Translator</span>
            </button>
          </div>
        </div>
        
        <form className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="name">Full Name / Company Name</label>
            <input 
              id="name" 
              type="text" 
              placeholder="John Doe"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="name@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required 
            />
          </div>
          <div className="space-y-2">
             <label className="text-sm font-medium" htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required 
            />
          </div>
          
          <button type="submit" className="w-full h-10 mt-2 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors">
            Create Account & Start 14-Day Free Trial
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
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
