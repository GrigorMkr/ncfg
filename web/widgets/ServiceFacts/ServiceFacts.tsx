import { Section } from "@/shared/ui/Section";
import { type ServiceFacts as ServiceFactsType } from "@/shared/api/types/service";
import { Calendar, Users, Monitor, FileText } from "lucide-react";

interface ServiceFactsProps {
  facts: ServiceFactsType;
}

interface FactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function FactCard({ icon, label, value }: FactCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-[#F1F5F9] p-6
                 hover:border-[#3B82F6]/30 hover:shadow-lg hover:-translate-y-0.5
                 transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#58A8E0] to-[#3B82F6] flex items-center justify-center text-white">
          {icon}
        </div>
        <span className="text-sm text-[#475569] font-medium">{label}</span>
      </div>
      <p className="text-xl md:text-2xl font-bold text-[#1E3A5F]">{value}</p>
    </div>
  );
}

export function ServiceFacts({ facts }: ServiceFactsProps) {
  const formatParticipants = (count: number) => {
    if (count >= 1000) {
      return `${Math.round(count / 1000)}K+`;
    }
    return `${count}+`;
  };

  return (
    <Section id="facts" background="gray" title="Ключевые факты">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <FactCard
          icon={<Calendar className="w-5 h-5" />}
          label="Опыт работы"
          value={`${facts.experienceYears} лет`}
        />
        <FactCard
          icon={<Users className="w-5 h-5" />}
          label="Участников"
          value={formatParticipants(facts.participantsCount)}
        />
        <FactCard
          icon={<Monitor className="w-5 h-5" />}
          label="Формат"
          value={facts.deliveryFormat}
        />
        <FactCard
          icon={<FileText className="w-5 h-5" />}
          label="Разработчик"
          value={facts.developedBy}
        />
      </div>

      {facts.dataOutputs && facts.dataOutputs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-[#1E3A5F] mb-4">
            Результаты работы
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {facts.dataOutputs.map((output, index) => (
              <li
                key={index}
                className="bg-white rounded-lg border border-[#F1F5F9] p-4 text-[#475569]"
              >
                {output}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
