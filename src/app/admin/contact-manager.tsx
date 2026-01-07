'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDoc } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { updateContactInfo } from "./actions";

interface ContactInfo {
    id: string;
    address: string;
    phone: string;
    openingHours: {
        weekdays: string;
        saturday: string;
        sunday: string;
    }
}

const formSchema = z.object({
    address: z.string().min(1, "L'adresse est requise"),
    phone: z.string().min(1, "Le téléphone est requis"),
    openingHours: z.object({
        weekdays: z.string().min(1, "Les horaires de la semaine sont requis"),
        saturday: z.string().min(1, "Les horaires du samedi sont requis"),
        sunday: z.string().min(1, "Les horaires du dimanche sont requis"),
    }),
});

function ContactManagerSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion de la page "Contact"</CardTitle>
                <CardDescription>Modifiez ici les informations de contact et les horaires.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-32 mt-4" />
            </CardContent>
        </Card>
    )
}

export function ContactManager() {
    const { data: content, loading } = useDoc<ContactInfo>('contactInfo/info');
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: '',
            phone: '',
            openingHours: {
                weekdays: '',
                saturday: '',
                sunday: '',
            }
        }
    });
    
    useEffect(() => {
        if (content) {
            form.reset(content);
        }
    }, [content, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await updateContactInfo(values);
        if (result.success) {
            toast({
                title: "Succès",
                description: "Les informations de contact ont été mises à jour.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Une erreur s'est produite. Veuillez réessayer.",
            });
        }
    }

    if (loading) {
        return <ContactManagerSkeleton />;
    }
    
    return (
        <Card>
            <CardHeader>
              <CardTitle>Gestion de la page "Contact"</CardTitle>
              <CardDescription>Modifiez ici les informations de contact et les horaires.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Adresse</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Téléphone</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Horaires d'ouverture</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="openingHours.weekdays"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Lundi - Vendredi</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="openingHours.saturday"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Samedi</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="openingHours.sunday"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dimanche</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
                            {form.formState.isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
