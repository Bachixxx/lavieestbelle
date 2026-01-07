'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/data';
import Link from 'next/link';
import { useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface AboutContent {
  id: string;
  title: string;
  subtitle: string;
  catherineTitle: string;
  catherineText: string;
  soniaTitle: string;
  soniaText: string;
  conclusion: string;
  imageId: string;
}

function AboutPageSkeleton() {
  return (
    <div className="bg-background py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-5 w-1/2 mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 relative h-full min-h-[400px] lg:min-h-[600px] rounded-lg overflow-hidden shadow-xl">
              <Skeleton className="h-full w-full" />
            </div>

            <div className="lg:col-span-3 space-y-10">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
                <Skeleton className="h-6 w-full mt-4" />
                <div className="pt-4">
                  <Skeleton className="h-12 w-40" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { data: content, loading } = useDoc<AboutContent>('aboutContent/content');

  if (loading) {
    return <AboutPageSkeleton />;
  }
  
  if (!content) {
    return <div className="text-center py-24">Contenu non trouvé. Veuillez initialiser les données depuis la page Admin.</div>;
  }

  const aboutImage = getImageById(content.imageId);

  return (
    <div className="bg-background py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-headline text-primary">
            {content.title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 relative h-full min-h-[400px] lg:min-h-[600px] rounded-lg overflow-hidden shadow-xl">
            {aboutImage && (
                <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                data-ai-hint={aboutImage.imageHint}
                />
            )}
            </div>

            <div className="lg:col-span-3 space-y-10 text-lg text-foreground/80">
                <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-headline text-primary/90">{content.catherineTitle}</h2>
                    <p>
                      {content.catherineText}
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-headline text-primary/90">{content.soniaTitle}</h2>
                    <p>
                      {content.soniaText}
                    </p>
                </div>

                <p className="font-semibold text-foreground text-xl pt-4">
                  {content.conclusion}
                </p>
                <div className="pt-4">
                    <Button asChild size="lg">
                        <Link href="/contact">Prendre rendez-vous</Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
