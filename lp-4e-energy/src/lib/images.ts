import manifest from "@/lib/images.json";

/**
 * Fotos em public/images (geradas a partir de ../fotos pelo script em docs/PENDENCIAS.md).
 * IMPORTANTE: são imagens ilustrativas de banco (Unsplash) até o cliente enviar fotos reais.
 * Nunca legendar como "nossa usina" ou "obra da 4E".
 */
export type PhotoName = keyof typeof manifest;

export interface Photo {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

export function photo(name: PhotoName): Photo {
  const entry = manifest[name];
  return {
    src: `/images/${name}-1600.webp`,
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blur,
  };
}
