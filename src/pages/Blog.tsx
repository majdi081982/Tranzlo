"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      title: "How Localization Drives Global Business Growth",
      excerpt: "Learn why simply translating isn't enough when you're expanding into new territories...",
      author: "Sarah Johnson",
      date: "May 12, 2024",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
    },
    {
      title: "The Future of AI in Professional Translation",
      excerpt: "Will machines replace human translators? We explore the symbiotic relationship between humans and AI...",
      author: "Dr. Marc Lee",
      date: "May 8, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "10 Common Cultural Mistakes to Avoid",
      excerpt: "Avoid these pitfalls when launching your marketing campaign in international markets...",
      author: "Maria Garcia",
      date: "May 5, 2024",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2959d93?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <Layout>
      <div className="py-20 bg-slate-50">
        <div className="container px-4 md:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">The Tranzlo Blog</h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Insights, news, and expertise from the world of professional translation and localization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post, i) => (
              <Card key={i} className="overflow-hidden border-none shadow-lg rounded-3xl group">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">{post.category}</div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-slate-600 text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="pt-4 border-t flex flex-col gap-4">
                  <div className="flex items-center justify-between w-full text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" /> {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </div>
                  </div>
                  <Button variant="ghost" className="p-0 h-auto font-bold text-indigo-600 hover:text-indigo-700 hover:bg-transparent justify-start">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;