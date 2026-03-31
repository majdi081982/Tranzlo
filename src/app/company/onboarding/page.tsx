import { Building2, Save } from "lucide-react";

export default function CompanyOnboarding() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl p-8 rounded-2xl glass border border-border/40 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-xl text-primary">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Complete Company Profile</h1>
            <p className="text-muted-foreground mt-1">Let translators know who they are working with.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name</label>
              <input type="text" className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Acme Corp" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <input type="text" className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Legal, Medical, IT" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Website URL</label>
            <input type="url" className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="https://example.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company Description</label>
            <textarea rows={4} className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none resize-none" placeholder="We are looking for expert translators to help expand our global reach..."></textarea>
          </div>

          <div className="pt-4 border-t border-border/40 flex justify-end">
            <button type="button" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <Save className="w-4 h-4" /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
