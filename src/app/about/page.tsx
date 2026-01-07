import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/data';
import Link from 'next/link';

export default function AboutPage() {
  const aboutImage = getImageById('about-portrait');

  return (
    <div className="bg-background py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-headline text-primary">
            Notre Philosophie, Votre Bien-être
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Au-delà du soin, une expertise unique au service de votre peau.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
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

            <div className="lg:col-span-3 space-y-6 text-lg text-foreground/80">
                <h2 className="text-3xl font-bold font-headline text-primary/90">Catherine Nussbaumer</h2>
                <p>
                Passionnée par la beauté et la santé de la peau, Catherine Nussbaumer a fondé l&apos;institut "La Vie est Belle" avec une vision claire : offrir une expérience où l&apos;expertise cosmétique rencontre la rigueur scientifique.
                </p>
                <p>
                Titulaire d&apos;un <strong>CFC d&apos;esthéticienne</strong>, elle maîtrise parfaitement les techniques de soin les plus avancées. Mais ce qui la distingue véritablement, c&apos;est son parcours complémentaire en <strong>pharmacie</strong>. Cette double compétence lui confère une compréhension approfondie de la biologie de la peau et des actifs cosmétiques.
                </p>
                <p>
                Cette approche holistique garantit des protocoles de soins non seulement relaxants et agréables, mais aussi hautement efficaces et sécuritaires. Chaque prestation est personnalisée après un diagnostic précis, en utilisant des produits de haute qualité, rigoureusement sélectionnés pour leur performance et leur innocuité.
                </p>
                <p className="font-semibold text-foreground">
                Confiez votre peau à une experte qui saura en révéler toute la beauté et la santé.
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
