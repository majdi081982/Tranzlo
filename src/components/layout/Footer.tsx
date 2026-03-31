import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background py-8">
      <div className="container max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Tranzlo
          </span>
          <p className="text-sm text-foreground/60 mt-1">© {new Date().getFullYear()} Tranzlo Platform. All rights reserved.</p>
        </div>
        <nav className="flex gap-6 text-sm text-foreground/70">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link>
        </nav>
      </div>
    </footer>
  );
}
