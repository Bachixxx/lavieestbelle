
"use server";

import { initializeFirebase } from "@/firebase/index.server";
import { setDoc, doc } from "firebase/firestore";
import * as z from "zod";

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
        return { success: true };
    } catch (error: any) {
        console.error("Erreur lors de la mise à jour des informations de contact: ", error);
        return { success: false, error: error.message };
    }
}
