"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Clock, DollarSign, Filter, Globe } from 'lucide-react';
import { databases, DATABASE_ID, COLLECTION_JOBS } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { formatDistance } from 'date-fns';

const Jobs = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_JOBS,
        [Query.orderDesc('created_at')]
      );
      setJobs(response.documents || []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="bg-slate-50 py-12">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Available Projects</h1>
            
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  className="pl-10 h-12 bg-white" 
                  placeholder="Search keywords, skills, or companies..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button size="lg" className="h-12 bg-indigo-600" onClick={fetchJobs}>
                <Filter className="mr-2 h-4 w-4" /> Refresh
              </Button>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-500">No projects found. Be the first to post one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div key={job.$id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                        <p className="text-indigo-600 font-medium">{job.user_name || 'Verified Client'}</p>
                      </div>
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">One-time</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-1 uppercase">
                        <Globe className="h-4 w-4" /> {job.source_language} → {job.target_language}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" /> ${job.budget}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {job.created_at ? formatDistance(new Date(job.created_at), new Date(), { addSuffix: true }) : 'Recently'}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Badge variant="outline" className="border-slate-200">{job.source_language}</Badge>
                        <Badge variant="outline" className="border-slate-200">{job.target_language}</Badge>
                      </div>
                      <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Jobs;