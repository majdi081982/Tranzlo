"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import ConnectionStatus from './ConnectionStatus';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Jobs', href: '/jobs' },
    { name: 'Translators', href: '/translators' },
    { name: 'Companies', href: '/companies' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="hidden lg:block">
            <ConnectionStatus />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center space-x-4 pl-4 border-l">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="font-semibold">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm">Get Started</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-6 mt-8">
                <Logo className="mb-4" />
                <div className="mb-4">
                  <ConnectionStatus />
                </div>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-semibold hover:text-indigo-600 border-b pb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 pt-4">
                  <Link to="/signup" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-indigo-600">Get Started</Button>
                  </Link>
                  <Link to="/login" className="w-full" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Log in</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;