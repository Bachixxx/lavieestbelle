'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AboutManager } from './about-manager';
import { ContactManager } from './contact-manager';
import { ServicesManager } from './services-manager';
import { TestimonialsManager } from './testimonials-manager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = [
  { value: 'services', label: 'Soins' },
  { value: 'about', label: 'Page "À Propos"' },
  { value: 'contact', label: 'Page "Contact"' },
  { value: 'testimonials', label: 'Témoignages' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].value);

  return (
    <div className="min-h-screen bg-background/50">
      <div className="bg-secondary/30 py-12 md:py-20 border-b border-primary/5">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-heading text-primary">Administration</h1>
            <p className="mt-4 text-xl text-muted-foreground font-light">Gérez le contenu de votre site internet en toute simplicité.</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-8">
          {/* Menu déroulant pour mobile */}
          <div className="md:hidden">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full h-12 text-lg bg-background shadow-sm">
                <SelectValue placeholder="Sélectionner une section" />
              </SelectTrigger>
              <SelectContent>
                {tabs.map((tab) => (
                  <SelectItem key={tab.value} value={tab.value} className="text-lg">
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Onglets pour écrans larges */}
          <div className="hidden md:block">
            <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 rounded-full">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 rounded-full py-3 text-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-300"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-background rounded-3xl p-6 md:p-8 shadow-xl border border-border/40"
          >
            <TabsContent value="services" className="mt-0 focus-visible:outline-none">
              <ServicesManager />
            </TabsContent>
            <TabsContent value="about" className="mt-0 focus-visible:outline-none">
              <AboutManager />
            </TabsContent>
            <TabsContent value="contact" className="mt-0 focus-visible:outline-none">
              <ContactManager />
            </TabsContent>
            <TabsContent value="testimonials" className="mt-0 focus-visible:outline-none">
              <TestimonialsManager />
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
}
