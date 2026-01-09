'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/data';
import { motion } from 'framer-motion';

export function Hero() {
  const heroImage = getImageById('hero-background');

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {heroImage && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        >
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-black/20 z-10" />
      {/* Dark overlay for contrast */}

      <div className="container relative z-20 mx-auto max-w-7xl px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg mb-6 leading-tight">
              L&apos;art de la beauté <br />  <span className="italic font-light">et du soin</span>
            </h1>
          </motion.div>

          <motion.p
            className="mt-6 text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto drop-shadow-md leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Une expérience premium et apaisante à Bellevue pour révéler votre éclat naturel.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium shadow-none hover:shadow-lg transition-all">
              <Link href="/services">Découvrir nos soins</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 rounded-full px-8 py-6 text-lg font-medium backdrop-blur-sm">
              <Link href="/contact">Prendre Rendez-vous</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
