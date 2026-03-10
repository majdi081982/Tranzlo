"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Languages, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    { name: 'Blogger', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Languages className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold tracking-tight text-indigo-900">Tranzlo</span>
        </Link>

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
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">Log in</Button>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
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
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-lg font-semibold hover:text-indigo-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <hr className="my-4" />
                <Button className="w-full bg-indigo-600">Get Started</Button>
                <Button variant="outline" className="w-full">Log in</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;