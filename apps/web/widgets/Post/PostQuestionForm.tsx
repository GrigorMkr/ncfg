"use client";

import { memo } from "react";
import { ChevronDown, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/cn";
import { CONTACT_LINKS } from "@/shared/config";
import { usePostQuestionForm, POST_QUESTION } from "@/shared/slices/post-question";
import { useTranslation } from "@/shared/i18n";

interface PostQuestionFormProps {
  postTitle: string;
}

function PostQuestionFormInner({ postTitle }: PostQuestionFormProps) {
  const { t } = useTranslation();
  const {
    isExpanded,
    formData,
    status,
    errorMessage,
    handleChange,
    handleSubmit,
    expand,
  } = usePostQuestionForm(postTitle);

  if (status === "success") {
    return (
      <section className="pb-12 md:pb-16">
        <div className="mx-auto max-w-[760px] px-5 md:px-6 lg:px-8">
          <div className="bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 rounded-xl p-8 text-center">
            <CheckCircle className="w-12 h-12 text-[#10B981] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1E3A5F] dark:text-white mb-2">
              {t.postQuestion.successTitle}
            </h3>
            <p className="text-[#475569] dark:text-slate-300">{t.postQuestion.successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-12 md:pb-16">
      <div className="mx-auto max-w-[760px] px-5 md:px-6 lg:px-8">
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-8">
          {!isExpanded ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold text-[#1E3A5F] mb-2">
                {POST_QUESTION.collapseTitle}
              </h3>
              <p className="text-base text-[#475569] mb-6">
                {POST_QUESTION.collapseLead}
              </p>
              <Button
                variant="secondary"
                onClick={expand}
                className="inline-flex items-center gap-2"
              >
                {POST_QUESTION.expandButton}
                <ChevronDown size={18} />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-[#1E3A5F] dark:text-white mb-2">
                  {t.postQuestion.formTitle}
                </h3>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-lg text-red-700 dark:text-red-400">
                  <AlertCircle size={20} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-[#1E3A5F] mb-2"
                >
                  {POST_QUESTION.questionLabel}
                </label>
                <div className="relative">
                  <textarea
                    id="question"
                    name="question"
                    required
                    rows={4}
                    value={formData.question}
                    onChange={handleChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] bg-white resize-none",
                      "text-[#0F172A] placeholder:text-[#94A3B8]",
                      "focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)]",
                      "transition-all duration-150"
                    )}
                    placeholder={POST_QUESTION.questionPlaceholder}
                  />
                  <span className="absolute right-3 bottom-3 text-sm text-[#94A3B8] dark:text-slate-500">
                    {formData.question.length}/{POST_QUESTION.questionMaxLength}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#1E3A5F] mb-2"
                  >
                    {t.form.name}
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
                    placeholder={t.form.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1E3A5F] dark:text-slate-200 mb-2"
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
                      "w-full px-4 py-3 rounded-lg border border-[#E2E8F0] dark:border-slate-600 bg-white dark:bg-slate-800",
                      "text-[#0F172A] dark:text-slate-100 placeholder:text-[#94A3B8] dark:placeholder:text-slate-500",
                      "focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[rgba(59,130,246,0.15)]",
                      "transition-all duration-150"
                    )}
                    placeholder={t.form.emailPlaceholder}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full sm:w-auto"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    t.btn.sending
                  ) : (
                    <>
                      {t.btn.send}
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] dark:border-slate-700">
                <p className="text-sm text-[#94A3B8] dark:text-slate-400 mb-2">
                  {t.postQuestion.contactLabel}
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <a
                    href={CONTACT_LINKS.telegram.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B82F6] dark:text-[#7dd3fc] hover:underline"
                  >
                    {CONTACT_LINKS.telegram.label}
                  </a>
                  <a
                    href={CONTACT_LINKS.phone.href}
                    className="text-[#3B82F6] dark:text-[#7dd3fc] hover:underline"
                  >
                    {CONTACT_LINKS.phone.label}
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export const PostQuestionForm = memo(PostQuestionFormInner);
