'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getImageById, type ServiceCategory } from "@/lib/data";
import { Button } from "../ui/button";
import { useCollection } from "@/firebase";
import { Skeleton } from "../ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ServicePreviewSkeleton() {
  return (
    <Card className="overflow-hidden border-none shadow-none bg-transparent">
      <div className="relative aspect-[3/4] bg-muted rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="pt-6 px-0">
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-1" />
      </CardContent>
    </Card>
  )
}

export function ServicesPreview() {
  const { data: serviceCategories, loading } = useCollection<ServiceCategory>('serviceCategories');

  return (
    <section className="w-full py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">Nos Soins Signature</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Une sélection de soins conçus pour votre bien-être absolu, alliant techniques innovantes et relaxation profonde.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex rounded-full border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="/services">
              Explorer la carte <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {loading && (
              <>
                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3"><ServicePreviewSkeleton /></CarouselItem>
                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3"><ServicePreviewSkeleton /></CarouselItem>
                <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3"><ServicePreviewSkeleton /></CarouselItem>
              </>
            )}

            {!loading && serviceCategories?.map((category) => {
              const image = getImageById(category.imageId);
              return (
                <CarouselItem key={category.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link href={`/services#${category.id}`} className="group block h-full">
                    <Card className="h-full border-none shadow-none bg-transparent overflow-visible">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                      </div>
                      <CardContent className="pt-6 px-0">
                        <h3 className="text-2xl font-bold font-heading mb-2 text-foreground group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 text-base leading-relaxed">
                          {category.previewDescription || "Une expérience de soin unique adaptée à vos besoins spécifiques."}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8 md:hidden">
            <CarouselPrevious className="static transform-none" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline" className="w-full rounded-full">
            <Link href="/services">
              Explorer la carte <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
