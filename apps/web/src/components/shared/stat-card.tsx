interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/80 p-5">
      <p className="text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-sm text-fog">{label}</p>
    </div>
  );
}
