export interface LeadFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder: string;
  rows?: number;
}
