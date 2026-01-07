import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/data";

export function AboutPreview() {
  const aboutImage = getImageById('about-portrait');

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto grid items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-full min-h-[400px] lg:min-h-[500px] rounded-lg overflow-hidden shadow-lg">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
            Notre Expertise
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Catherine Nussbaumer
          </h2>
          <p className="max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Forte d&apos;une double compétence avec un CFC d&apos;esthéticienne et une solide expérience en pharmacie, Catherine vous offre une approche du soin unique, alliant expertise scientifique et savoir-faire esthétique.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild size="lg">
              <Link href="/about">En savoir plus</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
