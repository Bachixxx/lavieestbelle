
"use server";

import { initializeFirebase } from "@/firebase/index.server";
import { setDoc, doc, addDoc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import * as z from "zod";
import { revalidatePath } from "next/cache";

const { firestore } = initializeFirebase();

// Schéma de validation pour le formulaire "À Propos"
const aboutContentSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    subtitle: z.string().min(1, "Le sous-titre est requis"),
    catherineTitle: z.string().min(1, "Le titre pour Catherine est requis"),
    catherineText: z.string().min(1, "Le texte pour Catherine est requis"),
    soniaTitle: z.string().min(1, "Le titre pour Sonia est requis"),
    soniaText: z.string().min(1, "Le texte pour Sonia est requis"),
    conclusion: z.string().min(1, "La conclusion est requise"),
});

export async function updateAboutContent(values: z.infer<typeof aboutContentSchema>) {
    const validatedFields = aboutContentSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, error: "Champs invalides" };
    }

    try {
        const docRef = doc(firestore, "aboutContent", "content");
        await setDoc(docRef, validatedFields.data, { merge: true });
        revalidatePath("/about");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        console.error("Erreur lors de la mise à jour du contenu 'À Propos': ", error);
        return { success: false, error: error.message };
    }
}

// Schéma de validation pour le formulaire "Contact"
const contactInfoSchema = z.object({
    address: z.string().min(1, "L'adresse est requise"),
    phone: z.string().min(1, "Le téléphone est requis"),
    openingHours: z.object({
        weekdays: z.string().min(1, "Les horaires de la semaine sont requis"),
        saturday: z.string().min(1, "Les horaires du samedi sont requis"),
        sunday: z.string().min(1, "Les horaires du dimanche sont requis"),
    }),
});

export async function updateContactInfo(values: z.infer<typeof contactInfoSchema>) {
    const validatedFields = contactInfoSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, error: "Champs invalides" };
    }

    try {
        const docRef = doc(firestore, "contactInfo", "info");
        await setDoc(docRef, validatedFields.data, { merge: true });
        revalidatePath("/contact");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        console.error("Erreur lors de la mise à jour des informations de contact: ", error);
        return { success: false, error: error.message };
    }
}

// Schéma de validation pour un soin
export const serviceSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().optional(),
    price: z.string().optional(),
    duration: z.string().optional(),
    category: z.string().min(1, "La catégorie est requise"),
});

export async function addService(values: z.infer<typeof serviceSchema>) {
    const validatedFields = serviceSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, error: "Champs invalides" };
    }
    try {
        await addDoc(collection(firestore, "services"), validatedFields.data);
        revalidatePath("/services");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateService(id: string, values: z.infer<typeof serviceSchema>) {
    const validatedFields = serviceSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, error: "Champs invalides" };
    }
    try {
        const docRef = doc(firestore, "services", id);
        await updateDoc(docRef, validatedFields.data);
        revalidatePath("/services");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteService(id: string) {
    try {
        await deleteDoc(doc(firestore, "services", id));
        revalidatePath("/services");
        revalidatePath("/admin");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
