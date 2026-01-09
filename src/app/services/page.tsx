'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Service, ServiceCategory } from '@/lib/data';
import { getImageById } from '@/lib/data';
import { useCollection } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

// --- Components ---

function CategoryNav({
  categories,
  activeId,
  onSelect
}: {
  categories: ServiceCategory[],
  activeId: string,
  onSelect: (id: string) => void
}) {
  return (
    <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={cn(
            "px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all whitespace-nowrap md:text-left",
            activeId === category.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {category.title}
        </button>
      ))}
    </nav>
  );
}

function ServiceItem({ service }: { service: Service }) {
  return (
    <div className="group flex justify-between items-end gap-4 py-3 border-b border-border/40 last:border-0 hover:bg-secondary/10 transition-colors px-2 rounded-lg">
      <div className="flex-grow">
        <h4 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {service.name}
        </h4>
        {service.description && (
          <p className="text-sm text-muted-foreground mt-1 font-light leading-relaxed max-w-prose">
            {service.description}
          </p>
        )}
      </div>
      <div className="text-right flex-shrink-0 mb-1">
        <div className="flex items-center gap-2 justify-end">
          <span className="block h-[1px] w-12 bg-border/60 hidden sm:block" />
          {/* Dotted line filler could go here ideally, but simple line is clean */}
          {service.price && <p className="font-bold text-lg text-primary">{service.price}</p>}
        </div>
        {service.duration && <p className="text-xs text-muted-foreground uppercase tracking-wide">{service.duration}</p>}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      {[1, 2].map((i) => (
        <div key={i} className="space-y-6">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

// --- Page ---

export default function ServicesPage() {
  const { data: serviceCategories, loading: loadingCategories } = useCollection<ServiceCategory>('serviceCategories');
  const { data: services, loading: loadingServices } = useCollection<Service>('services');
  const [activeCategory, setActiveCategory] = useState<string>('');

  const isLoading = loadingCategories || loadingServices;

  // Set first category as active initially
  useEffect(() => {
    if (serviceCategories && serviceCategories.length > 0 && !activeCategory) {
      setActiveCategory(serviceCategories[0].id);
    }
  }, [serviceCategories, activeCategory]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Scroll Spy Logic
  useEffect(() => {
    if (isLoading || !serviceCategories) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveCategory(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is near the top
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    serviceCategories.forEach((category) => {
      const element = document.getElementById(category.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isLoading, serviceCategories]);

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-secondary/30 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-heading text-primary mb-6">
            Carte des Soins
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            Une invitation au voyage sensoriel. Découvrez nos protocoles exclusifs pour une beauté sublimée et un esprit apaisé.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">

          {/* Sticky Navigation (Desktop) / Top Bar (Mobile) */}
          {!isLoading && serviceCategories && (
            <aside className="md:w-64 flex-shrink-0">
              <div className="sticky top-28 z-30 bg-background/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4 md:py-0 -mx-4 px-4 md:mx-0 md:px-0 border-b md:border-0 border-border/40">
                <h3 className="font-heading text-2xl font-bold mb-6 hidden md:block px-2">Catégories</h3>
                <CategoryNav
                  categories={serviceCategories}
                  activeId={activeCategory}
                  onSelect={scrollToCategory}
                />
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-grow min-w-0">
            {isLoading && <LoadingSkeleton />}

            {!isLoading && serviceCategories && services && (
              <div className="space-y-24">
                {serviceCategories.map((category) => {
                  const categoryServices = services.filter(s => s.category === category.id);
                  const categoryImage = getImageById(category.imageId);

                  if (categoryServices.length === 0) return null;

                  return (
                    <section key={category.id} id={category.id} className="scroll-mt-28">
                      {/* Category Header */}
                      <div className="mb-10">
                        {categoryImage && (
                          <div className="relative aspect-[21/9] md:aspect-[21/8] w-full rounded-2xl overflow-hidden shadow-lg mb-8 group">
                            <Image
                              src={categoryImage.imageUrl}
                              alt={categoryImage.description}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, 800px"
                              data-ai-hint={categoryImage.imageHint}
                            />
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white drop-shadow-md text-center px-4">
                                {category.title}
                              </h2>
                            </div>
                          </div>
                        )}

                        {!categoryImage && (
                          <h2 className="text-4xl font-heading font-bold text-primary mb-6 border-b border-primary/20 pb-4 inline-block">
                            {category.title}
                          </h2>
                        )}

                        {category.description && (
                          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
                            {category.description}
                          </p>
                        )}
                      </div>

                      {/* Services List */}
                      <div className="grid gap-2">
                        {categoryServices.map((service) => (
                          <ServiceItem key={service.id} service={service} />
                        ))}
                      </div>
                    </section>
                  )
                })}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
