"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Languages, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Admin: [
      { name: 'Dashboard', href: '/admin' },
      { name: 'Moderation', href: '/admin/moderation' },
      { name: 'Analytics', href: '/admin/analytics' },
    ],
    Company: [
      { name: 'Post a Job', href: '/jobs/new' },
      { name: 'Find Translators', href: '/translators' },
      { name: 'Enterprise', href: '/enterprise' },
    ],
    Translator: [
      { name: 'Browse Jobs', href: '/jobs' },
      { name: 'Your Profile', href: '/profile' },
      { name: 'Earnings', href: '/earnings' },
    ],
  };

  return (
    <footer className="bg-slate-50 border-t">
      <div className="container px-4 py-12 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Languages className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold text-indigo-900">Tranzlo</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Connecting the world through professional human translation and localization.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-indigo-600 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-indigo-600 cursor-pointer" />
              <Github className="h-5 w-5 text-muted-foreground hover:text-indigo-600 cursor-pointer" />
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-indigo-900 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-indigo-600 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Tranzlo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;