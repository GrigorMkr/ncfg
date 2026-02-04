"use client";

import { useState, useCallback, type FormEvent } from "react";
import type { FormStatus } from "@/shared/constants";
import { API_ENDPOINTS } from "@/shared/constants";
import { LEAD_FORM_FIELDS } from "./config";

function getInitialFormData(): Record<string, string> {
  return LEAD_FORM_FIELDS.reduce(
    (acc, f) => ({ ...acc, [f.name]: "" }),
    {} as Record<string, string>
  );
}

export function useLeadForm() {
  const [formData, setFormData] = useState(getInitialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(API_ENDPOINTS.LEAD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Произошла ошибка при отправке");
      }

      setStatus("success");
      setFormData(getInitialFormData());
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Произошла ошибка"
      );
    }
  }, [formData]);

  const reset = useCallback(() => {
    setFormData(getInitialFormData());
    setStatus("idle");
    setErrorMessage("");
  }, []);

  return {
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    reset,
  };
}
