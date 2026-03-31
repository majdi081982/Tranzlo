import { User, UploadCloud, Save } from "lucide-react";

export default function TranslatorOnboarding() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-2xl p-8 rounded-2xl glass border border-border/40 shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Complete Translator Profile</h1>
            <p className="text-muted-foreground mt-1">Stand out to top companies looking for your skills.</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Native Language</label>
              <input type="text" className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. English" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Languages</label>
              <input type="text" className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Spanish, French, German" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Specializations</label>
            <input type="text" className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Legal, Medical, IT, General" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Hourly Rate ($USD)</label>
            <input type="number" min="0" className="w-full h-10 rounded-md border border-input bg-background/50 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="25" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload CV (PDF limited to 5MB)</label>
            <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border/60 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer group">
              <div className="flex flex-col items-center space-y-2 text-muted-foreground group-hover:text-primary">
                <UploadCloud className="w-8 h-8" />
                <span className="text-sm font-medium">Click to upload your CV</span>
              </div>
            </div>
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
