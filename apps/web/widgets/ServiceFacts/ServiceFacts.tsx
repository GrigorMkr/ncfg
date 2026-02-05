import { Section } from "@/shared/ui/Section";

interface Fact {
  label: string;
  value: string;
}

interface ServiceFactsProps {
  facts: Fact[];
}

export function ServiceFacts({ facts }: ServiceFactsProps) {
  if (!facts || facts.length === 0) return null;

  return (
    <Section title="Факты" background="gray">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200/80"
          >
            <div className="text-3xl font-bold text-slate-900 mb-2">{fact.value}</div>
            <div className="text-sm text-slate-600">{fact.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
