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

export function ServicesManager() {
    const { data: serviceCategories, loading: loadingCategories } = useCollection<ServiceCategory>('serviceCategories');
    const { data: services, loading: loadingServices } = useCollection<Service>('services', {
        orderBy: ['name', 'asc']
    });

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
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

    const isLoading = loadingCategories || loadingServices;

    if (isLoading) {
        return <ServicesManagerSkeleton />;
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Gestion des Soins</CardTitle>
                    <CardDescription>
                        Gérez ici l&apos;ensemble des soins proposés. Vous pouvez les modifier, les supprimer ou en ajouter de nouveaux.
                    </CardDescription>
                    <div className="pt-4">
                        <Button onClick={handleAdd}>
                            <CirclePlus className="mr-2" />
                            Ajouter un soin
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" className="w-full">
                        {serviceCategories?.map((category) => {
                            const categoryServices = services?.filter(s => s.category === category.id) ?? [];
                            return (
                                <AccordionItem value={category.id} key={category.id}>
                                    <AccordionTrigger className="text-lg font-medium hover:no-underline">
                                        {category.title} ({categoryServices.length})
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-4 pl-4">
                                            {categoryServices.length > 0 ? (
                                                categoryServices.map((service) => (
                                                    <div key={service.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                                                        <div>
                                                            <p className="font-semibold">{service.name}</p>
                                                            <p className="text-sm text-muted-foreground">{service.price} - {service.duration}</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
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
        </>
    );
}
