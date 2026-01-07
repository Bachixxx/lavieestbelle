'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDoc } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { updateAboutContent } from "./actions";

interface AboutContent {
    id: string;
    title: string;
    subtitle: string;
    catherineTitle: string;
    catherineText: string;
    soniaTitle: string;
    soniaText: string;
    conclusion: string;
    imageId: string;
}

const formSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    subtitle: z.string().min(1, "Le sous-titre est requis"),
    catherineTitle: z.string().min(1, "Le titre pour Catherine est requis"),
    catherineText: z.string().min(1, "Le texte pour Catherine est requis"),
    soniaTitle: z.string().min(1, "Le titre pour Sonia est requis"),
    soniaText: z.string().min(1, "Le texte pour Sonia est requis"),
    conclusion: z.string().min(1, "La conclusion est requise"),
});

function AboutManagerSkeleton() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion de la page "À Propos"</CardTitle>
                <CardDescription>Modifiez ici les textes qui apparaissent sur la page "À Propos".</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-32" />
            </CardContent>
        </Card>
    )
}

export function AboutManager() {
    const { data: content, loading } = useDoc<AboutContent>('aboutContent/content');
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            subtitle: '',
            catherineTitle: '',
            catherineText: '',
            soniaTitle: '',
            soniaText: '',
            conclusion: '',
        }
    });
    
    useEffect(() => {
        if (content) {
            form.reset(content);
        }
    }, [content, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await updateAboutContent(values);
        if (result.success) {
            toast({
                title: "Succès",
                description: "Le contenu de la page 'À Propos' a été mis à jour.",
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
        return <AboutManagerSkeleton />;
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gestion de la page "À Propos"</CardTitle>
                <CardDescription>Modifiez ici les textes qui apparaissent sur la page "À Propos". L'image n'est pas modifiable depuis cette interface.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre principal</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subtitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sous-titre</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="catherineTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre (Catherine)</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="catherineText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Texte (Catherine)</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="soniaTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre (Sonia)</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="soniaText"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Texte (Sonia)</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="conclusion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Conclusion</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
                            {form.formState.isSubmitting ? "Enregistrement..." : "Enregistrer les modifications"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
