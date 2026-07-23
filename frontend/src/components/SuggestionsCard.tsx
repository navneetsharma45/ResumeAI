import { FaLightbulb } from "react-icons/fa";

type SuggestionsCardProps = {
  suggestions: string[];
};

function SuggestionsCard({ suggestions }: SuggestionsCardProps) {
  return (
<div className="rounded-3xl border border-blue-500/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/20">      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-cyan-400">
        <FaLightbulb />
        AI Suggestions
      </h3>

      <ul className="list-disc space-y-2 pl-6">
        {suggestions?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionsCard;