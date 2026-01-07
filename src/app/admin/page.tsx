'use client';

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { populateDatabase } from "./actions";
import { useState } from "react";
import { Loader2, Terminal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  const temporaryRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`;

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
        <AlertTitle className="text-amber-800 font-bold">Action Manuelle Requise</AlertTitle>
        <AlertDescription>
          <p className="mb-2">Pour pouvoir initialiser la base de données, les règles de sécurité doivent être temporairement assouplies.</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Allez dans votre <strong>Console Firebase &gt; Firestore Database &gt; Règles</strong>.</li>
            <li>Copiez le code ci-dessous et collez-le dans l'éditeur de règles, en remplaçant tout le contenu.
              <pre className="mt-2 p-2 bg-muted/50 rounded-md text-xs whitespace-pre-wrap font-mono">{temporaryRules}</pre>
            </li>
            <li>Cliquez sur <strong>Publier</strong>.</li>
            <li>Revenez ici et cliquez sur le bouton "Initialiser la base de données" ci-dessous.</li>
            <li>Une fois l'opération réussie, <strong>confirmez-le moi</strong> pour que je puisse restaurer les règles de sécurité.</li>
          </ol>
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
