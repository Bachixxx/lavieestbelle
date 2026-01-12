'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navLinks } from '@/lib/data';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();

  // Hide header on admin and login pages
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/40 bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-heading text-2xl font-bold text-primary tracking-wide transition-colors hover:text-primary/80">
          La Vie est Belle
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/80 transition-all hover:text-primary hover:tracking-wide"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button asChild className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-medium font-body" variant="default">
              <a href="tel:+41793707765">
                <Phone className="mr-2 h-4 w-4" />
                Prendre RV
              </a>
            </Button>
          </motion.div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-transparent text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-border/50 bg-background/95 backdrop-blur-xl">
              <SheetHeader className="text-left border-b border-border/50 pb-6 mb-6">
                <SheetTitle>
                  <Link
                    href="/"
                    className="font-heading text-2xl font-bold text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    La Vie est Belle
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-medium text-foreground/80 transition-colors hover:text-primary hover:pl-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                  <Button asChild className="w-full rounded-full py-6 text-lg font-body">
                    <a href="tel:+41793707765">
                      <Phone className="mr-2 h-5 w-5" />
                      Nous Appeler
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
