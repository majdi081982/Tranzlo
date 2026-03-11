"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Solutions: [
      { name: 'Browse Jobs', href: '/jobs' },
      { name: 'Find Translators', href: '/translators' },
      { name: 'Enterprise', href: '/companies' },
    ],
    Resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'API Docs', href: '#' },
      { name: 'Success Stories', href: '#' },
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Privacy Policy', href: '#' },
    ],
  };

  return (
    <footer className="bg-slate-50 border-t">
      <div className="container px-4 py-12 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              The world's most trusted marketplace for professional human translation and localization.
            </p>
            <div className="flex space-x-5">
              <Twitter className="h-5 w-5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer" />
              <Linkedin className="h-5 w-5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer" />
              <Github className="h-5 w-5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer" />
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-slate-900 mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Tranzlo. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;