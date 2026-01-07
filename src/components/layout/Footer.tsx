import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold">La vie est belle</p>
          <p className="text-sm text-muted-foreground">Chemin des Vignes 12, 1293 Bellevue, Suisse</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </a>
        </div>
        <div className="text-center text-sm text-muted-foreground sm:text-right">
          <p>&copy; {new Date().getFullYear()} La Vie est Belle. Tous droits réservés.</p>
          <Link href="/mentions-legales" className="hover:text-primary">
            Mentions Légales (LPD)
          </Link>
        </div>
      </div>
    </footer>
  );
}
