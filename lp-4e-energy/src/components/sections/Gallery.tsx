"use client";

import Image from "next/image";
import { useInView } from "@react-spring/web";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GALLERY, type GalleryItem } from "@/lib/content/home";
import { photo } from "@/lib/images";

interface FrameProps {
  item: GalleryItem;
  className?: string;
  sizes: string;
  delay?: number;
}

/** Revela a foto com clip-path de baixo para cima + leve zoom-out. */
function Frame({ item, className = "", sizes, delay = 0 }: FrameProps) {
  const [ref, isVisible] = useInView({ once: true, rootMargin: "0px 0px -12% 0px" });
  const picture = photo(item.photo);
  return (
    <figure
      ref={ref}
      className={`grao relative overflow-hidden rounded-[24px] bg-navy-soft ${className}`}
      style={{
        clipPath: isVisible ? "inset(0% 0% 0% 0% round 24px)" : "inset(35% 0% 0% 0% round 24px)",
        transition: `clip-path 1.3s var(--ease-4e) ${delay}ms`,
      }}
    >
      <div className="absolute inset-0" style={{ scale: isVisible ? "1" : "1.25", transition: `scale 1.6s var(--ease-4e) ${delay}ms` }}>
        <Image src={picture.src} alt={item.alt} fill sizes={sizes} placeholder="blur" blurDataURL={picture.blurDataURL} className="object-cover" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(4_15_42/0.92)_100%)]" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <span className="rounded-full border border-cyan/40 bg-navy-deep/60 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-cyan uppercase backdrop-blur-sm">
          {item.tag}
        </span>
        <span className="text-display mt-3 block text-[clamp(1.1rem,1rem+0.8vw,1.5rem)] font-bold text-white">{item.title}</span>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  const [main, second, third, fourth] = GALLERY.items;
  return (
    <section id="usinas" aria-labelledby="usinas-title" className="section-y cv-auto bg-navy-deep">
      <div className="container-site">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow onDark>{GALLERY.eyebrow}</Eyebrow>
            <h2 id="usinas-title" className="text-display mt-4 max-w-[18ch] text-[clamp(2rem,1.2rem+3.4vw,4rem)] leading-[1.02] font-bold text-balance text-white">
              {GALLERY.title} <span className="text-mist">{GALLERY.titleMuted}</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-6 md:grid-rows-[320px_320px] lg:gap-5">
          <Frame item={main} className="aspect-[4/3] md:col-span-4 md:row-span-2 md:aspect-auto" sizes="(min-width: 768px) 66vw, 100vw" />
          <Frame item={second} className="aspect-[4/3] md:col-span-2 md:aspect-auto" sizes="(min-width: 768px) 33vw, 100vw" delay={100} />
          <Frame item={third} className="aspect-[4/3] md:col-span-2 md:aspect-auto" sizes="(min-width: 768px) 33vw, 100vw" delay={180} />
          <Frame item={fourth} className="aspect-[4/3] md:col-span-6 md:h-[260px] md:aspect-auto" sizes="100vw" delay={120} />
        </div>
      </div>
    </section>
  );
}
