interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepCardProps {
  step: Step;
}

export function StepCard({ step }: StepCardProps) {
  return (
    <div
      className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6
                 hover:border-[#0ea5e9]/40 dark:hover:border-[#38bdf8]/40 hover:shadow-[0_20px_40px_-12px_rgba(14,165,233,0.15)] hover:-translate-y-1
                 transition-all duration-300"
    >
      <div className="icon-badge w-12 h-12 rounded-xl flex items-center justify-center text-[#0ea5e9] text-xl font-bold mb-4">
        {step.id}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{step.description}</p>
    </div>
  );
}
