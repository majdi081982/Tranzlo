"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Globe, 
  Zap, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container relative z-10 px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl transition-all duration-700 ease-out translate-y-0 opacity-100">
              <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-4 py-1 rounded-full">
                New: AI-Assisted Translation Workflow
              </Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Global communication, <br />
                <span className="text-indigo-600">made effortless.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                The leading marketplace for businesses to find professional translators. 
                Fast, reliable, and localized for every market in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/jobs/new">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 h-14 px-8 text-lg rounded-xl w-full sm:w-auto">
                    Post a Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/translators">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-2 w-full sm:w-auto">
                    Find Translators
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Professional Verified
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 100+ Languages
                </div>
              </div>
            </div>
            
            <div className="relative hidden lg:block transition-all duration-700 delay-200 ease-out scale-100 opacity-100">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                  alt="Team working together" 
                  className="w-full object-cover"
                />
              </div>
              {/* Floating element */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 animate-bounce">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Translation ready</p>
                    <p className="text-xs text-slate-500">In under 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-indigo-900 py-16 text-white">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">50k+</p>
              <p className="text-indigo-200 text-sm uppercase tracking-wider">Active Translators</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">120+</p>
              <p className="text-indigo-200 text-sm uppercase tracking-wider">Countries</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">1.2M</p>
              <p className="text-indigo-200 text-sm uppercase tracking-wider">Words Translated</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.9/5</p>
              <p className="text-indigo-200 text-sm uppercase tracking-wider">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container px-4 md:px-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why businesses choose Tranzlo</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We provide the tools and expertise you need to scale your business internationally without language barriers.
          </p>
        </div>
        <div className="container px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-8 w-8 text-blue-500" />,
                title: "Global Network",
                description: "Access specialized translators in over 100 languages and niche industries."
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-emerald-500" />,
                title: "Quality Guaranteed",
                description: "Our multi-step verification process ensures every translation is accurate and natural."
              },
              {
                icon: <Zap className="h-8 w-8 text-amber-500" />,
                title: "Fast Delivery",
                description: "Proprietary matching algorithms connect you with the right translator in minutes."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mb-6 p-3 bg-slate-50 inline-block rounded-2xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container px-4 md:px-8">
          <div className="bg-indigo-600 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Ready to expand your reach?</h2>
              <p className="text-indigo-100 mb-10 text-lg">
                Join thousands of companies and professional translators already using Tranzlo to bridge the communication gap.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 h-14 px-8 rounded-xl font-bold w-full sm:w-auto">
                    Start Translating Today
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-indigo-400 text-white hover:bg-indigo-700 h-14 px-8 rounded-xl w-full sm:w-auto">
                  Contact Sales
                </Button>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;