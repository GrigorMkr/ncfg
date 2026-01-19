"use client";

import { useState } from "react";
import Link from "next/link";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

interface Service {
  title: string;
  description: string;
  href: string;
  image: string | null;
}

interface Tab {
  id: string;
  label: string;
  services: Service[];
}

interface ServicesProps {
  title: string;
  tabs: Tab[];
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-[#F1F5F9] hover:border-[#E2E8F0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Stub image like News section */}
      <div className="aspect-[16/9] bg-gradient-to-br from-[#1E3A5F] to-[#3B82F6] flex items-center justify-center">
        <span className="text-white/20 text-5xl font-bold">НЦФГ</span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-[#1E3A5F] mb-2">
          {service.title}
        </h3>
        <p className="text-[#475569] text-sm leading-relaxed mb-4 flex-1">
          {service.description}
        </p>
        <Button href={service.href} size="sm">
          Подробнее
        </Button>
      </div>
    </article>
  );
}

function OtherServicesCard({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "min-h-[280px] flex flex-col items-center justify-center",
        "bg-white border border-[#E2E8F0] shadow-sm",
        "hover:-translate-y-1 hover:shadow-lg hover:border-[#3B82F6]/30",
        "transition-all duration-300"
      )}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-4 right-4 w-24 h-24 border-2 border-[#1E3A5F] rounded-full" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-[#1E3A5F] rounded-full" />
      </div>

      <span className="text-lg font-semibold text-[#1E3A5F]">Другие услуги</span>

      <span className="text-sm text-[#475569] mt-1 group-hover:text-[#3B82F6] transition-colors">Смотреть все →</span>
    </Link>
  );
}

export function Services({ title, tabs }: ServicesProps) {
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = tabs[activeTab];

  return (
    <Section id="services" title={title} background="gray">
      <div className="flex justify-center gap-2 mb-12">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(index)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full transition-colors",
              activeTab === index
                ? "bg-[#1E3A5F] text-white"
                : "bg-white text-[#475569] border border-[#E2E8F0] hover:bg-[#F1F5F9]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentTab.services.slice(0, 3).map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
        <OtherServicesCard href="/services" />
      </div>
    </Section>
  );
}
