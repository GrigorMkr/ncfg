"use client";

import { memo } from "react";
import { Send } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { useLeadForm, LEAD_FORM_FIELDS, LEAD_FORM_PRIVACY } from "@/shared/slices/lead-form";
import { FormSuccessMessage, FormErrorAlert, LeadFormField } from "./ui";

const GRID_FIELDS = LEAD_FORM_FIELDS.filter((f) => f.type !== "textarea");
const FULL_WIDTH_FIELDS = LEAD_FORM_FIELDS.filter((f) => f.type === "textarea");

function LeadFormInner() {
  const {
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useLeadForm();

  if (status === "success") {
    return <FormSuccessMessage />;
  }

  return (
    <Section
      id="lead-form"
      title="Оставить заявку"
      lead="Заполните форму, и мы свяжемся с вами для обсуждения сотрудничества"
      background="gray"
    >
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
        {status === "error" && <FormErrorAlert message={errorMessage} />}

        <div className="grid sm:grid-cols-2 gap-5">
          {GRID_FIELDS.map((field) => (
            <LeadFormField
              key={field.name}
              {...field}
              value={formData[field.name] ?? ""}
              onChange={handleChange}
            />
          ))}
        </div>

        {FULL_WIDTH_FIELDS.map((field) => (
          <LeadFormField
            key={field.name}
            {...field}
            value={formData[field.name] ?? ""}
            onChange={handleChange}
          />
        ))}

        <div className="pt-2">
          <Button
            type="submit"
            size="sm"
            className="w-full sm:w-auto h-10"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              "Отправка..."
            ) : (
              <>
                Отправить заявку
                <Send size={18} strokeWidth={1.75} className="ml-2" />
              </>
            )}
          </Button>
        </div>

        <p className="text-sm text-[#94A3B8]">{LEAD_FORM_PRIVACY}</p>
      </form>
    </Section>
  );
}

export const LeadForm = memo(LeadFormInner);
