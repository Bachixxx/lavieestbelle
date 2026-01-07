'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addService, updateService } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Service, ServiceCategory } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Schéma de validation pour un soin
export const serviceSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().optional(),
    price: z.string().optional(),
    duration: z.string().optional(),
    category: z.string().min(1, "La catégorie est requise"),
});

interface ServiceFormProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    service: Service | null;
    categories: ServiceCategory[];
}

export function ServiceForm({ isOpen, setIsOpen, service, categories }: ServiceFormProps) {
    const { toast } = useToast();
    const isEditing = !!service;

    const form = useForm<z.infer<typeof serviceSchema>>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            name: '',
            description: '',
            price: '',
            duration: '',
            category: '',
        },
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditing && service) {
                form.reset(service);
            } else {
                form.reset({
                    name: '',
                    description: '',
                    price: '',
                    duration: '',
                    category: '',
                });
            }
        }
    }, [isOpen, service, isEditing, form]);

    async function onSubmit(values: z.infer<typeof serviceSchema>) {
        const result = isEditing && service
            ? await updateService(service.id, values)
            : await addService(values);

        if (result.success) {
            toast({
                title: isEditing ? "Soin modifié" : "Soin ajouté",
                description: `Le soin "${values.name}" a été sauvegardé avec succès.`,
            });
            setIsOpen(false);
        } else {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: result.error || "Une erreur s'est produite.",
            });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Modifier le soin" : "Ajouter un soin"}</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations ci-dessous.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Catégorie</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionnez une catégorie" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>
                                                    {cat.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom du soin</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (optionnel)</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                           <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prix (optionnel)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex: 120 CHF" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Durée (optionnel)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="ex: 60 min" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Annuler</Button>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Enregistrement..." : "Enregistrer"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
