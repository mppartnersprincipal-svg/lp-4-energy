"use client";

import { useId, useState } from "react";
import { IconMais } from "@/components/ui/icons";
import { track } from "@/lib/tracking";

export interface FaqItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: FaqItem[];
}

const MAX_QUESTION_LENGTH = 120;

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  function handleToggle(index: number) {
    const willOpen = openIndex !== index;
    setOpenIndex(willOpen ? index : null);
    if (willOpen) {
      track("faq_open", { faq_question: items[index].question.slice(0, MAX_QUESTION_LENGTH) });
    }
  }

  return (
    <div className="divide-y divide-ice-dark border-y border-ice-dark">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => handleToggle(index)}
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-ink sm:text-lg"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-300 ${
                    isOpen
                      ? "rotate-45 border-cyan bg-cyan text-navy-deep"
                      : "border-navy/15 text-navy group-hover:border-cyan group-hover:text-cyan-dark"
                  }`}
                >
                  <IconMais className="size-4" strokeWidth={2.25} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pr-4 pb-6 leading-relaxed text-pretty text-ink-soft sm:pr-14">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
