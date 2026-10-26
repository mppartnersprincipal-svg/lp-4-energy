"use client";

import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { IconCheck, IconSeta, WhatsAppIcon } from "@/components/ui/icons";
import {
  buildLeadMessage,
  CAPITAL_RANGES,
  FORM_ID,
  INVESTOR_TYPES,
  LAND_OPTIONS,
  maskPhone,
  validateLead,
  type LeadErrors,
  type LeadInput,
} from "@/lib/lead";
import { getUtms, track } from "@/lib/tracking";
import { buildWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";

const EMPTY: LeadInput = { name: "", phone: "", city: "", capitalRange: "", investorType: "", hasLand: "" };
const OPEN_DELAY_MS = 350;

const FIELD =
  "min-h-12 w-full rounded-xl border border-ice-dark bg-white px-4 text-base text-ink placeholder:text-ink-soft/70 transition-[border-color,box-shadow] duration-200 focus:border-cyan-dark focus:shadow-[0_0_0_3px_rgb(40_199_242/0.25)] focus:outline-none aria-[invalid=true]:border-danger";
const LABEL = "text-sm font-semibold text-ink";

/**
 * Formulário "Diagnóstico de investidor". Valida, dispara form_complete (só faixas, nunca
 * dados pessoais) e abre o WhatsApp com a mensagem pronta e a origem da visita.
 */
export function DiagnosticForm() {
  const baseId = useId();
  const [values, setValues] = useState<LeadInput>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  function update(field: keyof LeadInput) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const raw = event.target.value;
      const value = field === "phone" ? maskPhone(raw) : raw;
      setValues((previous) => ({ ...previous, [field]: value }));
      if (errors[field]) setErrors((previous) => ({ ...previous, [field]: undefined }));
    };
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLead(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }
    const url = buildWhatsAppUrl(buildLeadMessage(values, getUtms()));
    track("form_complete", { form_id: FORM_ID, capital_range: values.capitalRange, investor_type: values.investorType });
    setSentUrl(url);
    window.setTimeout(() => openWhatsApp(url), OPEN_DELAY_MS);
  }

  if (sentUrl) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-2xl bg-white p-7 text-ink shadow-lift sm:p-9" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-cyan text-navy-deep"><IconCheck className="size-6" strokeWidth={2.4} /></span>
        <h3 className="text-display text-2xl font-bold">Diagnóstico enviado.</h3>
        <p className="leading-relaxed text-ink-soft">
          Estamos abrindo o WhatsApp com a sua mensagem pronta. Se a janela não abrir, use o botão abaixo.
        </p>
        <a
          href={sentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-wa px-6 font-semibold text-navy-deep"
        >
          <WhatsAppIcon className="size-5" />
          Abrir o WhatsApp
        </a>
      </div>
    );
  }

  const fieldId = (name: string) => `${baseId}-${name}`;
  const errorId = (name: string) => `${baseId}-${name}-erro`;

  return (
    <form
      id={FORM_ID}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl bg-white p-6 text-ink shadow-lift sm:p-8"
      aria-label="Diagnóstico de investidor"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("nome")} className={LABEL}>
            Nome completo
          </label>
          <input
            id={fieldId("nome")}
            name="nome"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId("nome") : undefined}
            className={FIELD}
          />
          {errors.name && <p id={errorId("nome")} className="text-sm text-danger">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("whatsapp")} className={LABEL}>
            WhatsApp
          </label>
          <input
            id={fieldId("whatsapp")}
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(62) 99999-9999"
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId("whatsapp") : undefined}
            className={FIELD}
          />
          {errors.phone && <p id={errorId("whatsapp")} className="text-sm text-danger">{errors.phone}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId("cidade")} className={LABEL}>
          Cidade
        </label>
        <input
          id={fieldId("cidade")}
          name="cidade"
          autoComplete="address-level2"
          value={values.city}
          onChange={update("city")}
          aria-invalid={Boolean(errors.city)}
          aria-describedby={errors.city ? errorId("cidade") : undefined}
          className={FIELD}
        />
        {errors.city && <p id={errorId("cidade")} className="text-sm text-danger">{errors.city}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("capital")} className={LABEL}>
            Capital disponível para investir
          </label>
          <select
            id={fieldId("capital")}
            name="capital"
            value={values.capitalRange}
            onChange={update("capitalRange")}
            aria-invalid={Boolean(errors.capitalRange)}
            aria-describedby={errors.capitalRange ? errorId("capital") : undefined}
            className={FIELD}
          >
            <option value="">Selecione</option>
            {CAPITAL_RANGES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.capitalRange && <p id={errorId("capital")} className="text-sm text-danger">{errors.capitalRange}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={fieldId("perfil")} className={LABEL}>
            Você investe como
          </label>
          <select
            id={fieldId("perfil")}
            name="perfil"
            value={values.investorType}
            onChange={update("investorType")}
            aria-invalid={Boolean(errors.investorType)}
            aria-describedby={errors.investorType ? errorId("perfil") : undefined}
            className={FIELD}
          >
            <option value="">Selecione</option>
            {INVESTOR_TYPES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.investorType && <p id={errorId("perfil")} className="text-sm text-danger">{errors.investorType}</p>}
        </div>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className={LABEL}>Já possui área ou terreno? (opcional)</legend>
        <div className="flex flex-wrap gap-2">
          {LAND_OPTIONS.map((option) => {
            const isSelected = values.hasLand === option.value;
            return (
              <label
                key={option.value}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isSelected ? "border-navy bg-navy text-white" : "border-ice-dark text-ink hover:border-navy"
                }`}
              >
                <input
                  type="radio"
                  name="terreno"
                  value={option.value}
                  checked={isSelected}
                  onChange={update("hasLand")}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <button
        type="submit"
        className="btn-liquid btn-liquid--light group relative mt-2 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-cyan px-8 text-base font-semibold text-navy-deep transition-[transform,box-shadow,background-color] duration-300 hover:scale-[1.02] hover:bg-cyan-light active:scale-[0.98] motion-reduce:hover:scale-100"
      >
        <span className="relative z-10">Continuar no WhatsApp</span>
        <IconSeta className="relative z-10 size-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <p className="text-xs leading-relaxed text-ink-soft">
        Seus dados seguem apenas na mensagem do WhatsApp para a equipe da 4E Energy. Nada fica armazenado neste site.
      </p>
    </form>
  );
}
