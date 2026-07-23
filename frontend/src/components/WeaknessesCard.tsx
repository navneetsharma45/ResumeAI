import { FaTimesCircle } from "react-icons/fa";

type WeaknessesCardProps = {
  weaknesses: string[];
};

function WeaknessesCard({ weaknesses }: WeaknessesCardProps) {
  return (
<div className="rounded-3xl border border-yellow-500/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-yellow-500/20">      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-orange-400">
        <FaTimesCircle />
        Weaknesses
      </h3>

      <ul className="list-disc space-y-2 pl-6">
        {weaknesses?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default WeaknessesCard;