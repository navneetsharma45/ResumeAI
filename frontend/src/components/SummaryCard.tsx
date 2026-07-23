type SummaryCardProps = {
  summary: string;
};

function SummaryCard({ summary }: SummaryCardProps) {
  return (
<div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20">      <h3 className="mb-4 text-xl font-bold">Summary</h3>
      <p>{summary}</p>
    </div>
  );
}

export default SummaryCard;