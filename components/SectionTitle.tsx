"use client";

import { useLanguage } from "@/context/LanguageContext";

interface SectionTitleProps {
  title: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
}

export default function SectionTitle({
  title,
  description,
  linkText,
  linkHref = "#",
}: SectionTitleProps) {
  const { language } = useLanguage();
  const isFa = language === "fa";

  const finalLinkText = linkText ?? (isFa ? "مشاهده همه" : "View all");

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="h-7 w-1 rounded-full bg-[#39f77b]" />

          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            {title}
          </h2>
        </div>

        {description && (
          <p className="max-w-2xl text-sm leading-7 text-gray-500">
            {description}
          </p>
        )}
      </div>

      <a
        href={linkHref}
        className="w-fit text-sm font-semibold text-[#39f77b] transition hover:text-white"
      >
        {finalLinkText} {isFa ? "←" : "→"}
      </a>
    </div>
  );
}
