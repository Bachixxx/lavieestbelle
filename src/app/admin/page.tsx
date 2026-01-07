'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">
          Administration
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Panneau de gestion du contenu du site.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Gestion du contenu</CardTitle>
            <CardDescription>
                Bientôt ici, vous pourrez modifier les soins, les catégories, et bien plus encore.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p>En construction...</p>
        </CardContent>
      </Card>

    </div>
  );
}
