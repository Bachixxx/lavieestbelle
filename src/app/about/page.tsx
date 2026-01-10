'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getImageById } from '@/lib/data';
import Link from 'next/link';
import { useDoc } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

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
  imageUrl?: string;
}

function AboutPageSkeleton() {
  return (
    <div className="bg-background min-h-screen">
      <div className="h-[40vh] bg-muted/30 w-full mb-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
      </div>
      <div className="container mx-auto max-w-7xl px-4 space-y-24 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Skeleton className="h-[500px] w-full rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
        <div className="space-y-6 max-w-3xl mx-auto text-center">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
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

  const placeholderImage = getImageById(content.imageId);
  const displayImageUrl = content.imageUrl || placeholderImage?.imageUrl;

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-secondary/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight font-heading text-primary mb-6"
          >
            {content.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed"
          >
            {content.subtitle}
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-24 space-y-24 md:space-y-32">

        {/* Catherine Section (Asymmetric) */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            >
              {displayImageUrl && (
                <Image
                  src={displayImageUrl}
                  alt={placeholderImage?.description || "Catherine Nussbaumer"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  data-ai-hint={placeholderImage?.imageHint}
                />
              )}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
            </motion.div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/30 rounded-full -z-10 hidden lg:block" />
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block border border-primary/30 rounded-full px-4 py-1.5 text-sm font-medium text-primary tracking-wide uppercase bg-primary/5 mb-6">
                Fondatrice
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-heading text-foreground mb-6">
                {content.catherineTitle}
              </h2>
              <div className="prose prose-lg text-muted-foreground leading-relaxed text-lg">
                <p>{content.catherineText}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sonia Section (Centered/Distinct) */}
        <section className="relative rounded-3xl bg-muted/30 p-8 md:p-16 lg:p-24 overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="relative max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-6">
                {content.soniaTitle}
              </h2>
              <div className="w-16 h-1 bg-primary/30 mx-auto rounded-full mb-8" />
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed italic">
                &quot;{content.soniaText}&quot;
              </p>
            </motion.div>
          </div>
        </section>

        {/* Conclusion / CTA */}
        <div className="text-center max-w-3xl mx-auto space-y-10 pb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-2xl md:text-3xl font-heading font-medium text-primary mb-8">
              {content.conclusion}
            </p>
            <Button asChild size="lg" className="rounded-full px-10 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
              <Link href="/contact">Prendre rendez-vous</Link>
            </Button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
