"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, DollarSign, Filter } from 'lucide-react';

const Jobs = () => {
  const mockJobs = [
    {
      id: 1,
      title: "Spanish Localization Specialist",
      company: "TechCorp Global",
      location: "Remote",
      type: "Contract",
      budget: "$500 - $1,500",
      time: "2 hours ago",
      languages: ["English", "Spanish"]
    },
    {
      id: 2,
      title: "Technical Manual Translation",
      company: "Industrial Minds",
      location: "Remote",
      type: "One-time",
      budget: "$2,000",
      time: "5 hours ago",
      languages: ["German", "English"]
    },
    {
      id: 3,
      title: "Legal Document Reviewer",
      company: "LegalEase Intl",
      location: "New York, USA",
      type: "Part-time",
      budget: "$45/hr",
      time: "1 day ago",
      languages: ["French", "English"]
    }
  ];

  return (
    <Layout>
      <div className="bg-slate-50 py-12">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Available Projects</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input className="pl-10 h-12 bg-white" placeholder="Search keywords, skills, or companies..." />
              </div>
              <Button size="lg" className="h-12 bg-indigo-600">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>

            <div className="space-y-4">
              {mockJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                      <p className="text-indigo-600 font-medium">{job.company}</p>
                    </div>
                    <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">{job.type}</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" /> {job.budget}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" /> {job.time}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {job.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="border-slate-200">{lang}</Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;