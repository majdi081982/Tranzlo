import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl mx-auto items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Globe className="h-6 w-6 text-primary" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Tranzlo
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/80">
          <Link href="/jobs" className="hover:text-primary transition-colors">Find Jobs</Link>
          <Link href="/translators" className="hover:text-primary transition-colors">Translators</Link>
          <Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
            Log in
          </Link>
          <Link href="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-sm hover:opacity-90 transition-opacity">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
