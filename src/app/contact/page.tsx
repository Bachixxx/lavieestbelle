import Image from 'next/image';
import Link from 'next/link';
import { Clock, MapPin, Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageById } from '@/lib/data';
import { ContactForm } from '@/components/ContactForm';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const mapImage = getImageById('contact-map');
  const address = 'Chemin des Vignes 12, 1293 Bellevue, Suisse';
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="bg-background py-12 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-headline text-primary">
            Nous Contacter
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Une question ? Envie de prendre rendez-vous ? Nous sommes à votre écoute.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Laissez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Nos Coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{address}</a>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <a href="tel:+41227777777" className="hover:text-primary transition-colors">+41 22 777 77 77</a>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Horaires d&apos;Ouverture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-lg">
                <div className="flex justify-between"><span>Lundi - Vendredi:</span> <span>9h00 - 18h30</span></div>
                <div className="flex justify-between"><span>Samedi:</span> <span>9h00 - 17h00</span></div>
                <div className="flex justify-between"><span>Dimanche:</span> <span>Fermé</span></div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 rounded-lg overflow-hidden shadow-xl">
            {mapImage && (
                <div className="relative h-96">
                    <Image
                        src={mapImage.imageUrl}
                        alt="Carte de localisation de l'institut"
                        fill
                        className="object-cover"
                        data-ai-hint={mapImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button asChild size="lg">
                            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                Ouvrir dans Google Maps
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
