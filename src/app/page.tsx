import { Globe, Languages, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <main className="z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary shadow-sm hover:scale-105 transition-transform cursor-pointer">
          <Sparkles className="w-4 h-4" />
          <span>The Next-Gen Translation Marketplace</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          Bridge the World with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 animate-gradient-x">
             Tranzlo
          </span>
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mt-4 leading-relaxed">
          Connect with top-tier translators globally or find premium translation projects for your business. Fast, secure, and professional.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
          <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300">
            Find a Translator
          </button>
          <button className="px-8 py-4 glass text-foreground font-semibold rounded-xl hover:bg-foreground/5 hover:-translate-y-1 transition-all duration-300">
            Join as Translator
          </button>
        </div>

        {/* Feature Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full">
          {[
            { icon: Globe, title: "Global Reach", desc: "Connect with language experts from every continent instantly." },
            { icon: ShieldCheck, title: "Secured Contracts", desc: "Your CVs, jobs, and messages are protected with enterprise-grade security." },
            { icon: Languages, title: "100+ Languages", desc: "From localized dialects to mainstream global languages." }
          ].map((feature, idx) => (
            <div key={idx} className="glass p-8 rounded-2xl flex flex-col items-start space-y-4 hover:border-primary/50 transition-colors">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-foreground/60 text-left leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
