import { memo } from "react";
import { CheckCircle } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { LEAD_FORM_SUCCESS } from "@/shared/slices/lead-form";

function FormSuccessMessageInner() {
  return (
    <Section id="lead-form" background="gray">
      <div className="max-w-xl mx-auto text-center py-14">
        <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6 animate-fade-in text-emerald-600">
          <CheckCircle className="w-10 h-10" strokeWidth={1.75} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          {LEAD_FORM_SUCCESS.title}
        </h2>
        <p className="text-slate-600 text-lg">{LEAD_FORM_SUCCESS.message}</p>
      </div>
    </Section>
  );
}

export const FormSuccessMessage = memo(FormSuccessMessageInner);
