"use client";

import { memo, useMemo } from "react";
import { Send } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { useLeadForm } from "@/shared/slices/lead-form";
import type { LeadFormField as LeadFormFieldType } from "@/shared/slices/lead-form";
import { FormSuccessMessage, FormErrorAlert, LeadFormField } from "./ui";
import { useTranslation } from "@/shared/i18n";

function LeadFormInner() {
  const { t } = useTranslation();

  const fields: LeadFormFieldType[] = useMemo(() => [
    { name: "name", label: t.form.name, type: "text", required: true, placeholder: t.form.namePlaceholder },
    { name: "email", label: t.form.email, type: "email", required: true, placeholder: t.form.emailPlaceholder },
    { name: "phone", label: t.form.phone, type: "tel", placeholder: t.form.phonePlaceholder },
    { name: "company", label: t.form.company, type: "text", placeholder: t.form.companyPlaceholder },
    { name: "message", label: t.form.message, type: "textarea", placeholder: t.form.messagePlaceholder, rows: 4 },
  ], [t]);

  const gridFields = fields.filter((f) => f.type !== "textarea");
  const fullWidthFields = fields.filter((f) => f.type === "textarea");

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
      title={t.sections.leadForm}
      lead={t.sections.leadFormLead}
      background="gray"
    >
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
        {status === "error" && <FormErrorAlert message={errorMessage} />}

        <div className="grid sm:grid-cols-2 gap-5">
          {gridFields.map((field) => (
            <LeadFormField
              key={field.name}
              {...field}
              value={formData[field.name] ?? ""}
              onChange={handleChange}
            />
          ))}
        </div>

        {fullWidthFields.map((field) => (
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
              t.btn.sending
            ) : (
              <>
                {t.btn.sendRequest}
                <Send size={18} strokeWidth={1.75} className="ml-2" />
              </>
            )}
          </Button>
        </div>

        <p className="text-sm text-[#94A3B8] dark:text-slate-400">{t.form.privacy}</p>
      </form>
    </Section>
  );
}

export const LeadForm = memo(LeadFormInner);
