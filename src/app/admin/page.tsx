'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { populateDatabase } from "./actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";


export default function AdminPage() {
  const { toast } = useToast();
  const [isPopulating, setIsPopulating] = useState(false);

  const handlePopulate = async () => {
    setIsPopulating(true);
    try {
      const result = await populateDatabase();
      if (result.success) {
        toast({
          title: "Base de données initialisée",
          description: `${result.counts.categories} catégories et ${result.counts.services} services ont été ajoutés.`,
        });
      } else {
        throw new Error(result.error || "Une erreur inconnue est survenue.");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Erreur lors de l'initialisation",
        description: error.message,
      });
    } finally {
        setIsPopulating(false);
    }
  };

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

      <Alert className="mb-8 border-amber-500 text-amber-700">
        <Terminal className="h-4 w-4 !text-amber-700" />
        <AlertTitle className="text-amber-800">Action Manuelle Requise</AlertTitle>
        <AlertDescription>
          Après avoir cliqué sur le bouton ci-dessous, veuillez me confirmer que l'opération a réussi afin que je puisse restaurer les règles de sécurité de la base de données.
        </AlertDescription>
      </Alert>


      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle>Initialisation des données</CardTitle>
            <CardDescription>
                Cette action va lire les données de soins et catégories directement depuis le code de l'application et les insérer dans la base de données Firestore.
                C'est une opération à n'effectuer qu'une seule fois.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={handlePopulate} disabled={isPopulating}>
                {isPopulating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Initialisation en cours...
                    </>
                ) : (
                    "Initialiser la base de données"
                )}
            </Button>
        </CardContent>
      </Card>

    </div>
  );
}
