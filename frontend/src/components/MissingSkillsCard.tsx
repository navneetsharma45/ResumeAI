import { FaTimesCircle } from "react-icons/fa";

type MissingSkillsCardProps = {
  missingSkills: string[];
};

function MissingSkillsCard({ missingSkills }: MissingSkillsCardProps) {
  return (
<div className="rounded-3xl border border-red-500/20 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-red-500/20">      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-400">
        <FaTimesCircle />
        Missing Skills
      </h3>

      <div className="flex flex-wrap gap-2">
        {missingSkills?.map((skill, index) => (
          <span
            key={index}
            className="rounded-full bg-red-600 px-3 py-1"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default MissingSkillsCard;