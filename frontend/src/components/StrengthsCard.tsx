import { FaStar } from "react-icons/fa";

type StrengthsCardProps = {
  strengths: string[];
};

function StrengthsCard({ strengths }: StrengthsCardProps) {
  return (
<div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-500/20">      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-yellow-400">
        <FaStar />
        Strengths
      </h3>

      <ul className="list-disc space-y-2 pl-6">
        {strengths?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default StrengthsCard;