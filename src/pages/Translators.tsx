"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, Search, MapPin } from 'lucide-react';

const Translators = () => {
  const translators = [
    {
      name: "Elena Rodriguez",
      initials: "ER",
      role: "Certified Spanish Translator",
      rating: 4.9,
      reviews: 124,
      location: "Madrid, Spain",
      languages: ["Spanish (Native)", "English", "Portuguese"],
      image: "https://i.pravatar.cc/150?u=elena"
    },
    {
      name: "Hans Schmidt",
      initials: "HS",
      role: "Technical German Expert",
      rating: 5.0,
      reviews: 89,
      location: "Berlin, Germany",
      languages: ["German (Native)", "English", "French"],
      image: "https://i.pravatar.cc/150?u=hans"
    },
    {
      name: "Yuki Tanaka",
      initials: "YT",
      role: "English-Japanese Specialist",
      rating: 4.8,
      reviews: 215,
      location: "Tokyo, Japan",
      languages: ["Japanese (Native)", "English"],
      image: "https://i.pravatar.cc/150?u=yuki"
    }
  ];

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="container px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2">Hire Top Translators</h1>
                <p className="text-slate-600 text-lg">Browse through our curated list of verified language experts.</p>
              </div>
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input className="pl-10 h-12 rounded-xl" placeholder="Search by language or skill..." />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {translators.map((t, i) => (
                <div key={i} className="border border-slate-100 rounded-3xl p-6 hover:shadow-xl transition-shadow bg-slate-50/50">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-md">
                      <AvatarImage src={t.image} />
                      <AvatarFallback>{t.initials}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-slate-900">{t.name}</h3>
                    <p className="text-indigo-600 text-sm font-medium mb-2">{t.role}</p>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                      <Star className="h-4 w-4 fill-current" /> {t.rating} 
                      <span className="text-slate-400 font-normal">({t.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" /> {t.location}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {t.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="bg-white text-xs font-normal border-slate-100">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 border-2 border-indigo-100 font-bold rounded-xl h-12">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Translators;