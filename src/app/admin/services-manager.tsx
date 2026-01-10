'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCollection } from "@/firebase";
import { Service, ServiceCategory } from "@/lib/data";
import { CirclePlus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { ServiceForm } from "./service-form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteService } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { orderBy } from "firebase/firestore";

function ServicesManagerSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion des Soins</CardTitle>
                <CardDescription>Ajoutez, modifiez ou supprimez des soins et des catégories.</CardDescription>
                <div className="pt-4">
                    <Skeleton className="h-10 w-40" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}

import { CategoryForm } from "./category-form";

// ... existing imports

export function ServicesManager() {
    const { data: serviceCategories, loading: loadingCategories } = useCollection<ServiceCategory>('serviceCategories');
    const { data: services, loading: loadingServices } = useCollection<Service>('services', orderBy('name', 'asc'));

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);
    const { toast } = useToast();

    const handleAdd = () => {
        setSelectedService(null);
        setIsFormOpen(true);
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        const result = await deleteService(id);
        if (result.success) {
            toast({ title: "Soin supprimé", description: "Le soin a été supprimé avec succès." });
        } else {
            toast({ variant: "destructive", title: "Erreur", description: "La suppression du soin a échoué." });
        }
    };

    const handleEditCategory = (category: ServiceCategory) => {
        setSelectedCategory(category);
        setIsCategoryFormOpen(true);
    };

    const isLoading = loadingCategories || loadingServices;

    if (isLoading) {
        return <ServicesManagerSkeleton />;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-primary">Gestion des Soins</h2>
                    <p className="text-muted-foreground">Managez l&apos;ensemble de votre carte des soins.</p>
                </div>
                <Button onClick={handleAdd}>
                    <CirclePlus className="mr-2" />
                    Ajouter un soin
                </Button>
            </div>

            <Card className="border-none shadow-sm bg-secondary/5">
                <CardContent className="p-0">
                    <Accordion type="multiple" className="w-full">
                        {serviceCategories?.map((category) => {
                            const categoryServices = services?.filter(s => s.category === category.id) ?? [];
                            return (
                                <AccordionItem value={category.id} key={category.id} className="relative group">
                                    <div className="absolute right-12 top-4 z-20">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditCategory(category);
                                            }}
                                        >
                                            <Edit className="h-4 w-4 mr-2" />
                                            Modifier la catégorie
                                        </Button>
                                    </div>
                                    <AccordionTrigger className="text-lg font-medium hover:no-underline px-6 py-4">
                                        <span>{category.title} ({categoryServices.length})</span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 px-6 pb-6">
                                            {/* ... services map ... */}
                                            {categoryServices.length > 0 ? (
                                                categoryServices.map((service) => (
                                                    <div key={service.id} className="flex items-center justify-between p-4 rounded-xl bg-background border border-border/50 shadow-sm transition-all hover:shadow-md">
                                                        <div>
                                                            <p className="font-semibold text-lg">{service.name}</p>
                                                            <p className="text-sm text-muted-foreground mt-1">{service.price} - {service.duration}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(service)} className="hover:bg-primary/5 hover:text-primary">
                                                                <Edit className="h-4 w-4" />
                                                            </Button>

                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            Cette action est irréversible. Le soin "{service.name}" sera définitivement supprimé.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                                        <AlertDialogAction onClick={() => handleDelete(service.id)}>Supprimer</AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>

                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-muted-foreground p-3">Aucun soin dans cette catégorie.</p>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </CardContent>
            </Card>
            <ServiceForm
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                service={selectedService}
                categories={serviceCategories ?? []}
            />
            <CategoryForm
                isOpen={isCategoryFormOpen}
                setIsOpen={setIsCategoryFormOpen}
                category={selectedCategory}
            />
        </div>
    );
}
