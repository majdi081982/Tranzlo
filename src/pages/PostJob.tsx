"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import LanguageSelector from '@/components/LanguageSelector';
import { supabase } from '@/lib/supabase';
import { ArrowRight, FileText, Globe, DollarSign, CheckCircle2, Loader2 } from 'lucide-react';

const PostJob = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sourceLanguage: '',
    targetLanguage: '',
    budget: '',
    deadline: ''
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Authentication required", description: "Please log in to post a project.", variant: "destructive" });
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('jobs').insert([
        {
          title: formData.title,
          description: formData.description,
          source_language: formData.sourceLanguage,
          target_language: formData.targetLanguage,
          budget: parseFloat(formData.budget),
          deadline: formData.deadline,
          user_id: user.id,
          user_name: user.user_metadata.full_name || 'Anonymous',
          status: 'open'
        }
      ]);

      if (error) throw error;
      
      toast({
        title: "Project Posted!",
        description: "Your translation project is now live and visible to experts.",
      });
      setStep(4);
    } catch (error: any) {
      toast({
        title: "Error posting project",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-slate-50 min-h-[calc(100vh-16rem)] py-12">
        <div className="container px-4 md:px-8 max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= s ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          <Card className="border-none shadow-xl rounded-[2.5rem] overflow-hidden">
            {step === 1 && (
              <>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                    <FileText className="text-indigo-600 h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Project Details</CardTitle>
                  <CardDescription>Tell us about the content you need translated.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Mobile App Localization for Spanish Market" 
                      className="h-12 rounded-xl" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe the context, target audience, and any specific requirements..." 
                      className="min-h-[150px] rounded-xl pt-3"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <Button onClick={handleNext} className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-lg">
                    Next Step <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </>
            )}

            {step === 2 && (
              <>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                    <Globe className="text-indigo-600 h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Languages</CardTitle>
                  <CardDescription>Select the source and target languages.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label>Source Language</Label>
                    <LanguageSelector 
                      value={formData.sourceLanguage}
                      onValueChange={(val) => setFormData({...formData, sourceLanguage: val})}
                      placeholder="Translate from..." 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Target Language</Label>
                    <LanguageSelector 
                      value={formData.targetLanguage}
                      onValueChange={(val) => setFormData({...formData, targetLanguage: val})}
                      placeholder="Translate to..." 
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handleBack} className="flex-1 h-14 rounded-xl font-bold">Back</Button>
                    <Button onClick={handleNext} className="flex-[2] h-14 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-lg">
                      Next Step <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </>
            )}

            {step === 3 && (
              <>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                    <DollarSign className="text-indigo-600 h-6 w-6" />
                  </div>
                  <CardTitle className="text-2xl font-bold">Budget & Timeline</CardTitle>
                  <CardDescription>How much are you looking to spend?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Estimate Budget ($)</Label>
                      <Input 
                        id="budget" 
                        type="number" 
                        placeholder="500" 
                        className="h-12 rounded-xl" 
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <Input 
                        id="deadline" 
                        type="date" 
                        className="h-12 rounded-xl" 
                        value={formData.deadline}
                        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                    <h4 className="font-bold text-indigo-900 mb-2">Tranzlo Guarantee</h4>
                    <p className="text-sm text-indigo-700 leading-relaxed">
                      Your payment is held securely in escrow and only released when you're 100% satisfied with the translation.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={handleBack} className="flex-1 h-14 rounded-xl font-bold">Back</Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={loading}
                      className="flex-[2] h-14 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold text-lg"
                    >
                      {loading ? <Loader2 className="animate-spin h-6 w-6" /> : "Post Project Now"}
                    </Button>
                  </div>
                </CardContent>
              </>
            )}

            {step === 4 && (
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="text-emerald-600 h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Successfully Posted!</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Your project is now being matched with top-rated translators. We'll notify you when you receive your first proposal.
                </p>
                <div className="flex flex-col gap-3">
                  <Button className="h-12 bg-indigo-600 rounded-xl" onClick={() => navigate('/jobs')}>
                    View Your Project
                  </Button>
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    Post Another Job
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PostJob;