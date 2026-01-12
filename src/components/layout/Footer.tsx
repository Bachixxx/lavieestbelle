import Link from 'next/link';
import { Facebook, Instagram, MapPin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t border-border/40 pt-16 pb-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="font-heading text-3xl font-bold text-primary block">
              La Vie est Belle
            </Link>
            <p className="text-muted-foreground max-w-md font-body text-base leading-relaxed">
              Votre sanctuaire de beauté à Bellevue. Nous allions expertise et relaxation pour révéler votre éclat naturel à travers des soins personnalisés.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold text-foreground">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>Chemin des Vignes 12,<br />1293 Bellevue, Suisse</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5 shrink-0" />
                <a href="tel:+41227740093">+41 22 774 00 93</a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-heading text-xl font-semibold text-foreground">Horaires</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span>09:00 - 19:00</span>
              </li>
              <li className="flex justify-between">
                <span>Samedi</span>
                <span>09:00 - 17:00</span>
              </li>
              <li className="flex justify-between">
                <span>Dimanche</span>
                <span>Fermé</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {currentYear} La Vie est Belle. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions Légales
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
