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
import { ImageUpload } from "@/components/admin/image-upload";

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
    imageUrl?: string;
}

const formSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    subtitle: z.string().min(1, "Le sous-titre est requis"),
    catherineTitle: z.string().min(1, "Le titre pour Catherine est requis"),
    catherineText: z.string().min(1, "Le texte pour Catherine est requis"),
    soniaTitle: z.string().min(1, "Le titre pour Sonia est requis"),
    soniaText: z.string().min(1, "Le texte pour Sonia est requis"),
    conclusion: z.string().min(1, "La conclusion est requise"),
    imageUrl: z.string().optional(),
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
            imageUrl: '',
        }
    });

    useEffect(() => {
        if (content) {
            form.reset({
                ...content,
                imageUrl: content.imageUrl || '',
            });
        }
    }, [content, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const result = await updateAboutContent({
            ...values,
            imageId: content?.imageId || 'about-hero',
        });
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
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-heading font-bold text-primary">Gestion de la page "À Propos"</h2>
                <p className="text-muted-foreground">Modifiez ici les textes qui apparaissent sur la page "À Propos".</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <Card className="border-none shadow-sm bg-secondary/5">
                        <CardHeader>
                            <CardTitle>Image Principale (Catherine)</CardTitle>
                            <CardDescription>Changez la photo principale qui apparaît sur la page.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <ImageUpload
                                                onUploadComplete={(url) => field.onChange(url)}
                                                currentImageUrl={field.value}
                                                folderName="about"
                                                label="Photo de Catherine"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-2">
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
                    </div>

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
        </div>
    );
}
