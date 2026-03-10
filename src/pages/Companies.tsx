"use client";

import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Globe, Shield, Zap, CheckCircle2 } from 'lucide-react';

const Companies = () => {
  return (
    <Layout>
      <div className="py-20">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Tranzlo for Enterprise</h1>
            <p className="text-xl text-slate-600">
              The world's fastest-growing companies use Tranzlo to scale their international operations and reach global customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Built for scale, security, and speed.</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Shield className="text-indigo-600 h-6 w-6" />,
                    title: "ISO-Certified Security",
                    description: "Your data and documents are protected with enterprise-grade encryption and strict confidentiality agreements."
                  },
                  {
                    icon: <Zap className="text-indigo-600 h-6 w-6" />,
                    title: "API & Integrations",
                    description: "Connect Tranzlo directly to your CMS, GitHub, or internal tools for seamless localization workflows."
                  },
                  {
                    icon: <Globe className="text-indigo-600 h-6 w-6" />,
                    title: "Global Compliance",
                    description: "Ensure your translations meet local regulations and cultural norms in every target market."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 p-2 bg-indigo-50 rounded-lg">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
              <h3 className="text-2xl font-bold mb-8">Trusted by global leaders</h3>
              <div className="space-y-6">
                {[
                  "Accelerated localization workflows by 40%",
                  "Supported 45+ languages out of the box",
                  "Dedicated project management and 24/7 support",
                  "Customized glossary and style guide enforcement"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 h-5 w-5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="w-full mt-12 bg-white text-slate-900 hover:bg-slate-100 font-bold h-14 rounded-xl">
                Get a Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Companies;