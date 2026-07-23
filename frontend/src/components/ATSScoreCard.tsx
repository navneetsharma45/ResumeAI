import "react-circular-progressbar/dist/styles.css";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

type ATSScoreCardProps = {
  animatedScore: number;
  scoreColor: string;
  scoreLabel: string;
  matchScore: number;

};

function ATSScoreCard({
  animatedScore,
  scoreColor,
  scoreLabel,
  matchScore,
}: ATSScoreCardProps) {
  return (
<div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/20">      <h2 className="mb-6 text-center text-2xl font-bold">
        ATS Score
      </h2>

      <div className="mx-auto h-48 w-48">
        <CircularProgressbar
          value={animatedScore}
          text={`${animatedScore}%`}
          styles={buildStyles({
            pathColor: scoreColor,
            trailColor: "#334155",
            textColor: "#ffffff",
            textSize: "16px",
          })}
        />
      </div>

      <p className="mt-5 text-center text-xl font-bold">
  {scoreLabel}
</p>

<div className="mt-6 rounded-lg bg-slate-800 p-4 text-center">
  <p className="text-sm text-slate-400">Job Match Score</p>

  <p className="text-3xl font-bold text-cyan-400">
    {matchScore}%
  </p>
</div>
    </div>
  );
}

export default ATSScoreCard;