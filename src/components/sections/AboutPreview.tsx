'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/data";
import { useDoc } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

interface AboutContent {
  catherineTitle: string;
  catherineText: string;
  imageId: string;
  imageUrl?: string;
}

export function AboutPreview() {
  const { data: content, loading } = useDoc<AboutContent>('aboutContent/content');

  if (loading) {
    return (
      <section className="w-full py-24 md:py-32 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="w-full lg:w-1/2">
              <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fallback static data if no content yet (or while loading initially)
  const defaultImageId = 'about-portrait';
  const displayImageId = content?.imageId || defaultImageId;
  const placeholderImage = getImageById(displayImageId);
  const displayImageUrl = content?.imageUrl || placeholderImage?.imageUrl;

  const title = content?.catherineTitle || "Catherine Nussbaumer";
  // If content is present but text is empty, we might want to show fallback or nothing. 
  // But generally if content is loaded, we show it.
  // The static text was split into two paragraphs. The dynamic text is one block. 
  // We'll just display the dynamic text block.
  const text = content?.catherineText || "Forte d'une double compétence avec un CFC d'esthéticienne et une solide expérience en pharmacie, Catherine vous offre une approche du soin unique.\n\nSon expertise scientifique se marie à un savoir-faire esthétique précis pour des résultats visibles et durables, dans une atmosphère de bienveillance absolue.";

  return (
    <section className="w-full py-24 md:py-32 bg-secondary/20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/30 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Image Side */}
          <div className="relative w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative aspect-[3/4] md:aspect-[4/3] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              {displayImageUrl && (
                <Image
                  src={displayImageUrl}
                  alt={placeholderImage?.description || title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  data-ai-hint={placeholderImage?.imageHint}
                />
              )}
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 md:bottom-10 md:-right-10 bg-white p-6 shadow-xl rounded-xl max-w-[200px] hidden md:block">
              <p className="font-heading text-4xl text-primary font-bold">15+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium mt-1">Années d&apos;expérience</p>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 space-y-8">
            <div className="inline-block border border-primary/30 rounded-full px-4 py-1.5 text-sm font-medium text-primary tracking-wide uppercase bg-primary/5">
              Notre Expertise
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight">
              {title}
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {text}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/about">Rencontrer Catherine</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
