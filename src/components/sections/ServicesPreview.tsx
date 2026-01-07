import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCategories, getImageById } from "@/lib/data";
import { Button } from "../ui/button";

export function ServicesPreview() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">Nos Soins Signature</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Découvrez nos catégories de soins, conçus pour votre bien-être et votre beauté.
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category) => {
            const image = getImageById(category.imageId);
            return (
              <Card key={category.id} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
                <Link href={`/services#${category.id}`} className="block h-full flex flex-col">
                  <CardHeader className="p-0">
                    {image && (
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="text-xl font-bold font-headline">{category.title}</CardTitle>
                    <CardDescription className="mt-2 text-base line-clamp-3 flex-grow">{category.previewDescription}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>
        <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline">
                <Link href="/services">
                    Voir tous les soins <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
