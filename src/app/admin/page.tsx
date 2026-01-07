'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AboutManager } from './about-manager';
import { ContactManager } from './contact-manager';
import { ServicesManager } from './services-manager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const tabs = [
  { value: 'services', label: 'Soins' },
  { value: 'about', label: 'Page "À Propos"' },
  { value: 'contact', label: 'Page "Contact"' },
  { value: 'testimonials', label: 'Témoignages' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 md:py-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight font-headline text-primary">Administration</h1>
        <p className="mt-2 text-lg text-muted-foreground">Panneau de gestion du contenu du site.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Menu déroulant pour mobile */}
        <div className="md:hidden mb-4">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une section" />
            </SelectTrigger>
            <SelectContent>
              {tabs.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Onglets pour écrans larges */}
        <TabsList className="hidden md:inline-flex">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
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
