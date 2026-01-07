'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { populateDatabase, populateTestimonials } from './actions';

export default function AdminPage() {
  const { toast } = useToast();
  const [isPopulating, setIsPopulating] = useState(false);
  const [isTestimonialPopulating, setIsTestimonialPopulating] = useState(false);

  const handlePopulate = async () => {
    setIsPopulating(true);
    try {
      const result = await populateDatabase();
      if (result.success) {
        toast({
          title: 'Succès',
          description: 'La base de données des services a été initialisée.',
        });
      } else {
        throw new Error(result.error || 'Une erreur inconnue est survenue.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: `Une erreur est survenue lors de l'initialisation : ${error.message}`,
      });
    } finally {
      setIsPopulating(false);
    }
  };
  
  const handlePopulateTestimonials = async () => {
    setIsTestimonialPopulating(true);
    try {
      const result = await populateTestimonials();
      if (result.success) {
        toast({
          title: 'Succès',
          description: 'Les témoignages ont été ajoutés à la base de données.',
        });
      } else {
        throw new Error(result.error || 'Une erreur inconnue est survenue.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: `Une erreur est survenue lors de l'ajout des témoignages : ${error.message}`,
      });
    } finally {
      setIsTestimonialPopulating(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">Administration</h1>
        <p className="mt-2 text-lg text-muted-foreground">Panneau de gestion du contenu du site.</p>
      </div>

      <div className="grid gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Initialisation des données</CardTitle>
            <CardDescription>
              Utilisez ces boutons pour remplir les collections de la base de données avec les données initiales du site.
              Cette opération n'est à faire qu'une seule fois.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handlePopulate} disabled={isPopulating}>
              {isPopulating ? 'Initialisation en cours...' : 'Initialiser les Soins & Catégories'}
            </Button>
            <Button onClick={handlePopulateTestimonials} disabled={isTestimonialPopulating}>
              {isTestimonialPopulating ? 'Initialisation en cours...' : 'Initialiser les Témoignages'}
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Gestion du contenu</CardTitle>
            <CardDescription>Bientôt ici, vous pourrez modifier les soins, les catégories, et bien plus encore.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>En construction...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
