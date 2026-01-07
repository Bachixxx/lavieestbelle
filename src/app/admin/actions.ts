
"use server";

import { initializeFirebase } from "@/firebase/index.server";
import { testimonials as initialTestimonials } from "@/lib/data";
import { initialServiceCategories, initialServices } from "@/lib/initial-data";

const { firestore } = initializeFirebase();

async function batchWrite(collectionName: string, data: any[]) {
    const batch = firestore.batch();
    data.forEach((item) => {
        const docRef = firestore.collection(collectionName).doc(item.id);
        batch.set(docRef, item);
    });
    await batch.commit();
}


export async function populateDatabase() {
  try {
    await batchWrite('serviceCategories', initialServiceCategories);
    await batchWrite('services', initialServices);
    
    return { success: true };
  } catch (error: any) {
    console.error("Error populating database: ", error);
    return { success: false, error: error.message };
  }
}

export async function populateTestimonials() {
  try {
    await batchWrite('testimonials', initialTestimonials);
    return { success: true };
  } catch (error: any) {
    console.error("Error populating testimonials: ", error);
    return { success: false, error: error.message };
  }
}
