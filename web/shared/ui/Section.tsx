import { cn } from "@/shared/lib/cn";
import { Container } from "./Container";
import { type ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  title?: string;
  lead?: string;
  id?: string;
  background?: "white" | "gray";
  dividerTop?: boolean;
}

export function Section({
  children,
  className,
  containerClassName,
  title,
  lead,
  id,
  background = "white",
  dividerTop = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16 relative overflow-hidden",
        background === "gray" && "bg-mesh",
        className
      )}
    >
      {background === "gray" && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#0ea5e9]/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#38bdf8]/5 blur-3xl" />
        </div>
      )}
      <Container className={containerClassName + " relative"}>
        {dividerTop && (
          <div className="border-t border-slate-200/80 mb-12 md:mb-16" />
        )}
        {(title || lead) && (
          <div className="mb-8 md:mb-10 text-center max-w-3xl mx-auto">
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 text-lg md:text-xl text-slate-600 leading-relaxed">
                {lead}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
