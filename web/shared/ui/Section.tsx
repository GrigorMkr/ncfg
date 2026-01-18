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
}

export function Section({
  children,
  className,
  containerClassName,
  title,
  lead,
  id,
  background = "white",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16 lg:py-24",
        background === "gray" && "bg-[#F8FAFC]",
        className
      )}
    >
      <Container className={containerClassName}>
        {(title || lead) && (
          <div className="mb-10 md:mb-12 lg:mb-16 text-center max-w-3xl mx-auto">
            {title && (
              <h2 className="text-[28px] md:text-4xl lg:text-[48px] font-bold text-[#1E3A5F] leading-tight tracking-tight">
                {title}
              </h2>
            )}
            {lead && (
              <p className="mt-4 text-lg md:text-xl text-[#475569] leading-relaxed">
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
