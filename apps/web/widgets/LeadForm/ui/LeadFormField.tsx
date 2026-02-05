import { memo } from "react";
import { cn } from "@/shared/lib/cn";
import type { LeadFormField as LeadFormFieldType } from "@/shared/slices/lead-form";

const inputClassName = cn(
  "w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white",
  "text-slate-900 placeholder:text-slate-400",
  "focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20",
  "transition-all duration-200"
);

const textareaClassName = cn(
  "w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white resize-none",
  "text-slate-900 placeholder:text-slate-400",
  "focus:outline-none focus:border-[#0ea5e9] focus:ring-2 focus:ring-[#0ea5e9]/20",
  "transition-all duration-150"
);

interface LeadFormFieldProps extends LeadFormFieldType {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function LeadFormFieldInner({
  name,
  label,
  type,
  required,
  placeholder,
  rows,
  value,
  onChange,
}: LeadFormFieldProps) {
  const labelClassName = "block text-sm font-semibold text-slate-800 mb-2";

  if (type === "textarea") {
    return (
      <div>
        <label htmlFor={name} className={labelClassName}>
          {label}
        </label>
        <textarea
          id={name}
          name={name}
          rows={rows ?? 4}
          value={value}
          onChange={onChange}
          className={textareaClassName}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={inputClassName}
        placeholder={placeholder}
      />
    </div>
  );
}

export const LeadFormField = memo(LeadFormFieldInner);
