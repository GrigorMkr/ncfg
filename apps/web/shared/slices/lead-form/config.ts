import type { LeadFormField } from "./types";

const LEAD_FORM_FIELDS: LeadFormField[] = [
  { name: "name", label: "Имя *", type: "text", required: true, placeholder: "Иван Петров" },
  { name: "email", label: "Email *", type: "email", required: true, placeholder: "ivan@company.ru" },
  { name: "phone", label: "Телефон", type: "tel", placeholder: "+7 (999) 123-45-67" },
  { name: "company", label: "Компания", type: "text", placeholder: "ООО «Компания»" },
  {
    name: "message",
    label: "Сообщение",
    type: "textarea",
    placeholder: "Расскажите о вашем запросе...",
    rows: 4,
  },
];

const LEAD_FORM_SUCCESS = {
  title: "Заявка отправлена!",
  message: "Спасибо за обращение. Мы свяжемся с вами в ближайшее время.",
} as const;

const LEAD_FORM_PRIVACY =
  "Нажимая кнопку, вы соглашаетесь с обработкой персональных данных";

export { LEAD_FORM_FIELDS, LEAD_FORM_SUCCESS, LEAD_FORM_PRIVACY };
