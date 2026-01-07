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
            Notre Histoire, Votre Bien-être
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            L&apos;institut de beauté La Vie est Belle a ouvert ses portes à Bellevue le 7 octobre 2016.
            Nous offrons des soins de beauté du visage, du corps ainsi que des cheveux tant pour les dames que pour les messieurs.
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
                    <h2 className="text-3xl font-bold font-headline text-primary/90">Catherine Nussbaumer - Directrice & Esthéticienne</h2>
                    <p>
                    Catherine a achevé un CFC d&apos;assistante en pharmacie en 2000 pour ensuite réaliser des études en esthétique. Après avoir travaillé 10 ans dans un salon privé, elle a décidé de se lancer comme indépendante et a ouvert son institut à Bellevue.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-headline text-primary/90">Sonia - Spécialiste Coiffure</h2>
                    <p>
                    Sonia, sa collaboratrice, est au bénéfice d&apos;une expérience de plus de 25 ans dans le domaine de la coiffure et est spécialisée dans les soins du cheveu.
                    </p>
                </div>

                <p className="font-semibold text-foreground text-xl pt-4">
                Vous y serez toujours bien accueillis et reçus avec bienveillance pour recevoir les meilleurs conseils en matière de bien-être et de soins esthétiques.
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
