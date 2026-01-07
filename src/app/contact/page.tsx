'use client';

import Image from 'next/image';
import { Clock, MapPin, Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageById } from '@/lib/data';
import { ContactForm } from '@/components/ContactForm';
import { Button } from '@/components/ui/button';
import { useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

interface ContactInfo {
    id: string;
    address: string;
    phone: string;
    openingHours: {
        weekdays: string;
        saturday: string;
        sunday: string;
    }
}

function ContactPageSkeleton() {
    return (
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
                            <Skeleton className="h-6 w-6 mt-1" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                        <div className="flex items-start gap-4">
                            <Skeleton className="h-6 w-6 mt-1" />
                            <Skeleton className="h-6 w-1/3" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Horaires d&apos;Ouverture</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-lg">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default function ContactPage() {
  const mapImage = getImageById('contact-map');
  const { data: contactInfo, loading } = useDoc<ContactInfo>('contactInfo/info');
  const googleMapsUrl = contactInfo ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}` : '';


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

        {loading ? <ContactPageSkeleton/> : contactInfo && (
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
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{contactInfo.address}</a>
                        </div>
                        <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                        <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">{contactInfo.phone}</a>
                        </div>
                    </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Horaires d&apos;Ouverture</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-lg">
                        <div className="flex justify-between"><span>Lundi - Vendredi:</span> <span>{contactInfo.openingHours.weekdays}</span></div>
                        <div className="flex justify-between"><span>Samedi:</span> <span>{contactInfo.openingHours.saturday}</span></div>
                        <div className="flex justify-between"><span>Dimanche:</span> <span>{contactInfo.openingHours.sunday}</span></div>
                    </CardContent>
                    </Card>
                </div>
            </div>
        )}

        {!loading && !contactInfo && (
            <div className="text-center py-24">Contenu non trouvé. Veuillez initialiser les données depuis la page Admin.</div>
        )}

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
                        <Button asChild size="lg" disabled={!contactInfo}>
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
