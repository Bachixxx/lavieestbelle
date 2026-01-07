'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AboutManager } from './about-manager';
import { ContactManager } from './contact-manager';
import { ServicesManager } from './services-manager';

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">Administration</h1>
        <p className="mt-2 text-lg text-muted-foreground">Panneau de gestion du contenu du site.</p>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="h-auto w-full flex-col md:h-10 md:w-auto md:inline-flex md:flex-row">
          <TabsTrigger value="services">Soins</TabsTrigger>
          <TabsTrigger value="about">Page "À Propos"</TabsTrigger>
          <TabsTrigger value="contact">Page "Contact"</TabsTrigger>
          <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
        </TabsList>
        <TabsContent value="about">
          <AboutManager />
        </TabsContent>
        <TabsContent value="contact">
          <ContactManager />
        </TabsContent>
        <TabsContent value="services">
          <ServicesManager />
        </TabsContent>
        <TabsContent value="testimonials">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Témoignages</CardTitle>
              <CardDescription>Gérez les témoignages de vos clients.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>En construction...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
