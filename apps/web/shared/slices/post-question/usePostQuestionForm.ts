"use client";

import { useState, useCallback, type FormEvent } from "react";
import type { FormStatus } from "@/shared/constants";
import { API_ENDPOINTS } from "@/shared/constants";
import { POST_QUESTION } from "./config";
import type { PostQuestionFormData } from "./types";

const INITIAL_FORM_DATA: PostQuestionFormData = {
  question: "",
  name: "",
  email: "",
};

export function usePostQuestionForm(postTitle: string) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<PostQuestionFormData>(INITIAL_FORM_DATA);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name === "question" && value.length > POST_QUESTION.questionMaxLength) {
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setStatus("loading");
      setErrorMessage("");

      try {
        const response = await fetch(API_ENDPOINTS.QUESTION, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, postTitle }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Произошла ошибка при отправке");
        }

        setStatus("success");
        setFormData({ ...INITIAL_FORM_DATA });
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Произошла ошибка"
        );
      }
    },
    [formData, postTitle]
  );

  const expand = useCallback(() => setIsExpanded(true), []);
  const collapse = useCallback(() => setIsExpanded(false), []);

  return {
    isExpanded,
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    expand,
    collapse,
  };
}
