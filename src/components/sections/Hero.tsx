import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/data';

export function Hero() {
  const heroImage = getImageById('hero-background');

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-background/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <div className="max-w-3xl mx-auto bg-background/80 backdrop-blur-sm p-8 rounded-lg shadow-lg">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
              L&apos;art de la beauté et du soin à Bellevue
            </h1>
            <p className="mt-6 text-lg leading-8 text-foreground/80">
              Une expérience premium, zen et épurée pour révéler votre beauté naturelle.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="/services">Découvrir nos soins</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
