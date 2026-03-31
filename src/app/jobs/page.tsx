import { Search, Filter, Briefcase, MapPin, Clock } from "lucide-react";

export default function JobsPage() {
  const mockJobs = [
    { title: "Legal Document Translation (English to Spanish)", company: "Acme Legal", type: "Remote", budget: "$150", deadline: "2 Days", tags: ["Legal", "Contract"] },
    { title: "Medical Device Manual Localization", company: "MedTech Globals", type: "Remote", budget: "$400", deadline: "1 Week", tags: ["Medical", "Technical"] },
    { title: "On-site Consecutive Interpreter", company: "Global Summits", type: "On-site (New York)", budget: "$600/day", deadline: "Specific Date", tags: ["Interpretation"] },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background/50">
      <div className="bg-primary/5 border-b border-border/40 py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-64 h-64 bg-primary/10 blur-[80px] rounded-full" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Find Your Next Translation Job</h1>
          <div className="w-full max-w-2xl relative flex items-center shadow-lg">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by keywords, language, or specialty..." 
              className="w-full h-14 pl-12 pr-32 rounded-xl border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-primary text-primary-foreground px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-6">
          <div className="flex items-center gap-2 font-semibold text-lg pb-2 border-b border-border/40">
            <Filter className="w-5 h-5" /> Filters
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Source Language</label>
              <select className="w-full mt-1.5 h-10 rounded-md border border-input bg-background/50 px-3 text-sm focus:ring-primary outline-none">
                <option>Any Language</option>
                <option>English</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Target Language</label>
              <select className="w-full mt-1.5 h-10 rounded-md border border-input bg-background/50 px-3 text-sm focus:ring-primary outline-none">
                <option>Any Language</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <div className="mt-2 space-y-2">
                {['Legal', 'Medical', 'Technical', 'Literary'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" /> {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{mockJobs.length} Jobs Found</h2>
            <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none">
              <option>Most Recent</option>
              <option>Highest Budget</option>
            </select>
          </div>

          <div className="space-y-4">
            {mockJobs.map((job, idx) => (
              <div key={idx} className="glass p-6 rounded-xl border border-border/40 hover:border-primary/50 transition-all cursor-pointer group flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.company}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.type}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.deadline}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-3 text-left md:text-right mt-4 md:mt-0">
                  <span className="text-xl font-bold">{job.budget}</span>
                  <button className="bg-secondary text-secondary-foreground hover:bg-foreground/5 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-input">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
