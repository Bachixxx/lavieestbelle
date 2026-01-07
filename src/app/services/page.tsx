import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { serviceCategories, services, type Service } from "@/lib/data";

function ServiceItem({ service }: { service: Service }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <div>
        <h4 className="font-semibold">{service.name}</h4>
        {service.description && <p className="text-sm text-muted-foreground mt-1">{service.description}</p>}
      </div>
      <div className="text-right flex-shrink-0">
        {service.price && <p className="font-semibold text-primary">{service.price}</p>}
        {service.duration && <p className="text-sm text-muted-foreground">{service.duration}</p>}
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-headline text-primary">
            Carte des Soins
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explorez notre gamme complète de prestations, conçues pour répondre à chacun de vos besoins avec expertise et douceur.
          </p>
        </div>

        <div className="space-y-16">
          {serviceCategories.map((category) => {
            const categoryServices = services.filter(s => s.category === category.id);
            if (categoryServices.length === 0) return null;

            return (
              <section key={category.id} id={category.id}>
                <Card className="shadow-lg overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-3xl font-headline text-primary">{category.title}</CardTitle>
                        <CardDescription className="text-base">{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {categoryServices.map((service, index) => (
                            <div key={service.id}>
                                <ServiceItem service={service} />
                                {index < categoryServices.length - 1 && <Separator className="my-6"/>}
                            </div>
                        ))}
                    </CardContent>
                </Card>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
