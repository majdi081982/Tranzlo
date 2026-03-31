import { Check } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Free Trial",
      price: "$0",
      description: "14-day full access to test out the marketplace.",
      features: ["Up to 3 job applications", "Basic profile visibility", "Community access"],
      button: "Start Free Trial",
      highlight: false,
    },
    {
      name: "Pro Translator",
      price: "$19/mo",
      description: "Everything you need to grow your freelance business.",
      features: ["Unlimited job applications", "Priority profile ranking", "Direct messaging with companies", "Advanced analytics"],
      button: "Subscribe to Pro",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Scalable translation solutions for your business.",
      features: ["Unlimited job postings", "Dedicated account manager", "API access", "White-glove matching"],
      button: "Contact Sales",
      highlight: false,
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center py-24 px-4 overflow-hidden relative">
      <div className="text-center max-w-3xl mb-16 space-y-4 relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Simple, transparent pricing</h1>
        <p className="text-xl text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full z-10 relative">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

        {plans.map((plan, idx) => (
          <div key={idx} className={`relative p-8 rounded-3xl glass border flex flex-col h-full bg-background/60 shadow-lg ${plan.highlight ? 'border-primary ring-1 ring-primary scale-105 z-10' : 'border-border/40'}`}>
            {plan.highlight && (
              <div className="absolute top-0 right-4 -translate-y-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Most Popular</span>
              </div>
            )}
            
            <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-extrabold">{plan.price}</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 flex-1 min-h-[40px]">{plan.description}</p>
            
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-center gap-3 text-sm">
                  <div className="rounded-full p-1 bg-primary/10 text-primary">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button className={`w-full py-3 rounded-xl font-semibold transition-all shadow-sm ${plan.highlight ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-input'}`}>
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
