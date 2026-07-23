import { FaCheckCircle } from "react-icons/fa";

type SkillsCardProps = {
  skills: string[];
};

function SkillsCard({ skills }: SkillsCardProps) {
  return (
<div className="rounded-3xl border border-green-500/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/20">      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-green-400">
        <FaCheckCircle />
        Skills
      </h3>

      <div className="flex flex-wrap gap-2">
        {skills?.map((skill, index) => (
          <span
            key={index}
            className="rounded-full bg-green-600 px-3 py-1"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SkillsCard;