'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Testimonial } from '@/lib/data';
import { useCollection } from '@/firebase';
import { Skeleton } from '../ui/skeleton';
import Autoplay from "embla-carousel-autoplay"

function TestimonialSkeleton() {
  return (
    <div className="p-1 h-full">
      <Card className="h-full flex flex-col justify-center border-none shadow-none bg-muted/30">
        <CardContent className="flex flex-col gap-4 p-8 items-center text-center">
          <div className="flex gap-1 justify-center">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-5" />
          </div>
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-5/6 mt-1" />
          <Skeleton className="h-6 w-1/3 mt-4" />
        </CardContent>
      </Card>
    </div>
  );
}

export function Testimonials() {
  const { data: testimonials, loading } = useCollection<Testimonial>('testimonials');

  return (
    <section className="w-full py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-4">
            La voix de nos clientes
          </h2>
          <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
        </div>

        <Carousel
          opts={{
            align: 'center',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {loading && (
              <>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3"><TestimonialSkeleton /></CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3"><TestimonialSkeleton /></CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-1/3"><TestimonialSkeleton /></CarouselItem>
              </>
            )}
            {testimonials?.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-4">
                <div className="h-full relative group">
                  <div className="absolute inset-0 bg-secondary/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
                  <Card className="h-full flex flex-col justify-between border-none shadow-sm relative bg-background/80 backdrop-blur-sm hover:shadow-md transition-all duration-300 rounded-2xl">
                    <CardContent className="flex flex-col gap-6 p-8 relative">
                      <Quote className="h-8 w-8 text-primary/20 rotate-180 absolute top-6 left-6" />

                      <div className="flex gap-1 justify-center mt-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-lg italic text-foreground/80 text-center leading-relaxed relative z-10">&quot;{testimonial.text}&quot;</p>

                      <div className="mt-auto pt-4 border-t border-border/40 text-center">
                        <p className="font-heading font-bold text-xl text-primary">{testimonial.author}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-8">
            <CarouselPrevious className="static transform-none border-primary/20 hover:bg-primary/5 hover:border-primary/50" />
            <CarouselNext className="static transform-none border-primary/20 hover:bg-primary/5 hover:border-primary/50" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
