"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Section } from "@/shared/ui/Section";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Произошла ошибка при отправке");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Произошла ошибка");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (status === "success") {
    return (
      <Section id="lead-form" background="gray">
        <div className="max-w-xl mx-auto text-center py-12">
          <CheckCircle className="w-16 h-16 text-[#10B981] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-4">
            Заявка отправлена!
          </h2>
          <p className="text-[#475569] text-lg">
            Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="lead-form"
      title="Оставить заявку"
      lead="Заполните форму, и мы свяжемся с вами для обсуждения сотрудничества"
      background="gray"
    >
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5">
        {status === "error" && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle size={20} />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#1E3A5F] mb-2"
            >
              Имя *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white",
                "text-[#0F172A] placeholder:text-[#94A3B8]",
                "focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)]",
                "transition-all duration-150"
              )}
              placeholder="Иван Петров"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#1E3A5F] mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white",
                "text-[#0F172A] placeholder:text-[#94A3B8]",
                "focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)]",
                "transition-all duration-150"
              )}
              placeholder="ivan@company.ru"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#1E3A5F] mb-2"
            >
              Телефон
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white",
                "text-[#0F172A] placeholder:text-[#94A3B8]",
                "focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)]",
                "transition-all duration-150"
              )}
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-[#1E3A5F] mb-2"
            >
              Компания
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={cn(
                "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white",
                "text-[#0F172A] placeholder:text-[#94A3B8]",
                "focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)]",
                "transition-all duration-150"
              )}
              placeholder="ООО «Компания»"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#1E3A5F] mb-2"
          >
            Сообщение
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white resize-none",
              "text-[#0F172A] placeholder:text-[#94A3B8]",
              "focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)]",
              "transition-all duration-150"
            )}
            placeholder="Расскажите о вашем запросе..."
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              "Отправка..."
            ) : (
              <>
                Отправить заявку
                <Send size={18} className="ml-2" />
              </>
            )}
          </Button>
        </div>

        <p className="text-sm text-[#94A3B8]">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </form>
    </Section>
  );
}
