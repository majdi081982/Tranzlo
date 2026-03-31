import { Briefcase, Send, DollarSign, Calendar } from "lucide-react";

export default function PostJobPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl p-8 rounded-2xl glass border border-border/40 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Briefcase className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Post a Translation Job</h1>
            <p className="text-muted-foreground mt-1">Provide clear requirements to match with the best talent.</p>
          </div>
        </div>

        <form className="space-y-8">
          {/* Job Details Section */}
          <div className="space-y-6 bg-background/30 p-6 rounded-xl border border-border/40">
            <h2 className="text-xl font-semibold border-b border-border/40 pb-2">1. Basic Information</h2>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <input type="text" className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Legal Contract Translation from English to Spanish" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Source Language</label>
                <select className="w-full h-10 rounded-md border border-input bg-background/50 px-3 text-sm focus:ring-primary outline-none">
                  <option>Select Language</option>
                  <option>English</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Language</label>
                <select className="w-full h-10 rounded-md border border-input bg-background/50 px-3 text-sm focus:ring-primary outline-none">
                  <option>Select Language</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Project Description</label>
              <textarea rows={6} className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="Describe the scope of the project..."></textarea>
            </div>
          </div>

          {/* Budget & Timeline */}
          <div className="space-y-6 bg-background/30 p-6 rounded-xl border border-border/40">
            <h2 className="text-xl font-semibold border-b border-border/40 pb-2">2. Budget & Timeline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <label className="text-sm font-medium">Fixed Budget (USD)</label>
                <div className="relative flex items-center">
                  <DollarSign className="absolute left-3 w-4 h-4 text-muted-foreground" />
                  <input type="number" min="5" className="w-full h-10 rounded-md border border-input bg-background/50 pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="500" />
                </div>
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-medium">Deadline</label>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3 w-4 h-4 text-muted-foreground" />
                  <input type="date" className="w-full h-10 rounded-md border border-input bg-background/50 pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
                  <input type="radio" name="jobType" className="rounded-full text-primary focus:ring-primary bg-background/50" defaultChecked /> Remote Translation
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer">
                  <input type="radio" name="jobType" className="rounded-full text-primary focus:ring-primary bg-background/50" /> On-Site Interpretation
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button type="button" className="px-6 py-2 rounded-lg font-medium border border-border/60 hover:bg-foreground/5 transition-colors">
              Save Draft
            </button>
            <button type="button" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-md">
              <Send className="w-4 h-4" /> Publish Job Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
