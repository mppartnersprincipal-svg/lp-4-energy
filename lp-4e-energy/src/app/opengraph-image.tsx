import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "4E Energy: usinas fotovoltaicas para investidores em Goiás, com gestão completa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-4e-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: "radial-gradient(70% 60% at 85% 0%, rgba(40,199,242,0.22), transparent 60%), #040f2a",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={120} height={120} alt="" style={{ borderRadius: 60 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontSize: 34, fontWeight: 700 }}>4E Energy</div>
            <div style={{ fontSize: 20, color: "#28c7f2", letterSpacing: 4 }}>USINAS FOTOVOLTAICAS PARA INVESTIDORES</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <div style={{ width: 48, height: 2, background: "#28c7f2" }} />
            <div style={{ width: 2, height: 12, background: "#28c7f2" }} />
          </div>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.08, maxWidth: 960 }}>
            Sua usina solar gerando renda recorrente. Sem você precisar operar nada.
          </div>
          <div style={{ fontSize: 26, color: "#a9b8d3" }}>Construção · Carteira de consumidores · Operação e manutenção · Goiás</div>
        </div>
      </div>
    ),
    size,
  );
}
