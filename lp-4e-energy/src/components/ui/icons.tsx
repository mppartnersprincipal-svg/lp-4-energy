import type { ReactNode, SVGProps } from "react";

/**
 * Ícones próprios da 4E Energy, no estilo "telemetria": traço 1.6, cantos arredondados e,
 * em cada ícone, uma pequena marca de escala (eco dos traços do símbolo da marca).
 * Todos são decorativos (aria-hidden) salvo quando recebem `title`.
 */
export type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function Svg({ title, children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** Usina de solo: três fileiras de módulos inclinados sobre estacas. */
export function IconUsina(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 13.5 5.2 7h13.6L21 13.5z" />
      <path d="M4.6 10.3h14.8M9.6 7l-1 6.5M14.4 7l1 6.5" />
      <path d="M8 13.5V19M16 13.5V19M6 19h4M14 19h4" />
      <path d="M12 2.5v1.6" />
    </Svg>
  );
}

/** Inversor com a onda senoidal de saída. */
export function IconInversor(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="4" y="3.5" width="16" height="17" rx="3" />
      <path d="M7.5 10c1-2 2-2 3 0s2 2 3 0 2-2 3 0" />
      <path d="M8 15h8M8 17.5h5" />
      <path d="M2 12h2M20 12h2" />
    </Svg>
  );
}

/** Bateria (BESS) com célula carregada. */
export function IconBateria(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="7" width="16" height="10" rx="2.5" />
      <path d="M19 10h1.5a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H19" />
      <path d="M8.5 9.5l-2 3h3l-2 3" />
      <path d="M12.5 10.5v3M15 10.5v3" />
    </Svg>
  );
}

/** Carteira de consumidores: três pessoas ligadas por uma linha. */
export function IconCarteira(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="7" r="2.6" />
      <circle cx="5.5" cy="10" r="2" />
      <circle cx="18.5" cy="10" r="2" />
      <path d="M8 18a4 4 0 0 1 8 0" />
      <path d="M2.5 17a3 3 0 0 1 4.2-2.7M21.5 17a3 3 0 0 0-4.2-2.7" />
      <path d="M12 2v1.2" />
    </Svg>
  );
}

/** Monitoramento: tela com linha de geração e ponto ativo. */
export function IconMonitor(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="4" width="18" height="12" rx="2.5" />
      <path d="M6.5 12.5 9 9.5l2.5 2 3-4 3 3.5" />
      <circle cx="17.5" cy="11" r="1" fill="currentColor" stroke="none" />
      <path d="M9 20h6M12 16v4" />
    </Svg>
  );
}

/** Relatório: folha com barras crescentes. */
export function IconRelatorio(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 3h7l4 4v12.5A1.5 1.5 0 0 1 16.5 21h-9A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7.5 3z" />
      <path d="M14 3v4h4" />
      <path d="M9 17v-3M12 17v-5.5M15 17v-2" />
    </Svg>
  );
}

/** Manutenção: chave inglesa sobre marca de escala. */
export function IconManutencao(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8V20h3.2l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
      <path d="M17 20h4M19 18v4" />
    </Svg>
  );
}

/** Distribuidora: torre de transmissão. */
export function IconDistribuidora(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9.5 21 11 3h2l1.5 18" />
      <path d="M6 21h12M7 9h10M5.5 14.5h13" />
      <path d="M11 9l-5.5 5.5M13 9l5.5 5.5M10.3 14.5l-4.3 6.5M13.7 14.5l4.3 6.5" />
    </Svg>
  );
}

/** Estudo de viabilidade: prancheta com gráfico. */
export function IconEstudo(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2.8A.8.8 0 0 1 9.8 2h4.4a.8.8 0 0 1 .8.8V4" />
      <path d="M8.5 15.5 11 12.5l2 1.5 2.5-3.5" />
      <path d="M8.5 18.5h7" />
    </Svg>
  );
}

/** Construção: guindaste erguendo um módulo. */
export function IconObra(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 21V6l3-2 3 2v15" />
      <path d="M10 7h10M18 7v5" />
      <path d="M15 12h6l-1 3h-4z" />
      <path d="M2.5 21h19" />
    </Svg>
  );
}

/** Raio: energia gerada. */
export function IconRaio(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M13 2.5 5.5 13.5H11l-1 8 7.5-11H12z" />
    </Svg>
  );
}

/** Escudo com marca de escala: segurança do investimento. */
export function IconEscudo(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 2.5 4.5 5.5v6c0 5 3.3 8.3 7.5 10 4.2-1.7 7.5-5 7.5-10v-6z" />
      <path d="M12 7.5v2M9 12h6M12 14.5v2" />
    </Svg>
  );
}

/** Gráfico de linha: renda recorrente. */
export function IconRenda(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 20h18" />
      <path d="M4 15.5 9 10l3.5 3L19 6" />
      <path d="M15.5 6H19v3.5" />
      <path d="M3 4v1.5M3 8v1.5M3 12v1.5" />
    </Svg>
  );
}

/** Medidor: eco do símbolo da marca. */
export function IconMedidor(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2" />
      <path d="M12 12l3.5-3.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Cidade e residências: para quem é a assinatura. */
export function IconCidade(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 21V11l4-3 4 3v10" />
      <path d="M11 21V6l5-3 5 3v15" />
      <path d="M3 21h18" />
      <path d="M14.5 9h3M14.5 13h3M14.5 17h3M6 15h2" />
    </Svg>
  );
}

export function IconSeta(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function IconSetaBaixo(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 5v14M6 13l6 6 6-6" />
    </Svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function IconX(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function IconMais(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function IconMenu(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function IconPergunta(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7" />
      <circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </Svg>
  );
}

export function IconRelogio(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function IconPino(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </Svg>
  );
}

/** Ícones de marca (preenchidos). */
export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true" {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.25" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
