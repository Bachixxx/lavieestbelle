'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ServiceCategory } from "@/lib/data";
import { updateServiceCategory } from "./actions";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/image-upload";

const formSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    description: z.string().min(1, "La description est requise"),
    previewDescription: z.string().min(1, "La description courte est requise"),
    imageUrl: z.string().optional(),
});

interface CategoryFormProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    category: ServiceCategory | null;
}

export function CategoryForm({ isOpen, setIsOpen, category }: CategoryFormProps) {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            previewDescription: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        if (category) {
            form.reset({
                title: category.title,
                description: category.description,
                previewDescription: category.previewDescription,
                imageUrl: category.imageUrl || "",
            });
        } else {
            form.reset({
                title: "",
                description: "",
                previewDescription: "",
                imageUrl: "",
            });
        }
    }, [category, form, isOpen]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!category) return; // Should allow add? User only asked for changing images. Categories are in data.ts? No, Firestore.

        const result = await updateServiceCategory(category.id, values);

        if (result.success) {
            toast({
                title: "Succès",
                description: "La catégorie a été mise à jour.",
            });
            setIsOpen(false);
        } else {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: result.error || "Une erreur est survenue.",
            });
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Modifier la catégorie</DialogTitle>
                    <DialogDescription>
                        Modifiez les détails de la catégorie de soins.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image de couverture</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            onUploadComplete={(url) => field.onChange(url)}
                                            currentImageUrl={field.value}
                                            folderName="categories"
                                            label="Image de la catégorie"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Titre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Titre de la catégorie" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="previewDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description courte (Aperçu)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description courte pour l'accueil..." {...field} />
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
                                    <FormLabel>Description complète</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-[150px]" placeholder="Description complète pour la page Services..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Annuler
                            </Button>
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
